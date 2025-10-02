import { revalidateTag, revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { getPagesToRevalidate } from "@/lib/cache-tags";

export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<{
      _type: string;
      slug?: string | { current: string };
    }>(req);

    if (!isValidSignature) {
      return new Response("Invalid signature", { status: 401 });
    }
    if (!body?._type) {
      return new Response("Missing document type", { status: 400 });
    }

    // Get specific pages that need revalidation based on document type
    const pagesToRevalidate = getPagesToRevalidate(body._type);
    
    // Revalidate specific pages instead of all pages
    const revalidationPromises = pagesToRevalidate.map((path) => 
      revalidatePath(path)
    );

    // Also revalidate the document type tag for any components that might use it
    revalidationPromises.push(revalidateTag(body._type));

    // Add slug-specific tag if available
    const slug = typeof body.slug === "string" ? body.slug : body.slug?.current;
    if (slug) {
      revalidationPromises.push(revalidateTag(`${body._type}:${slug}`));
    }

    await Promise.all(revalidationPromises);

    return NextResponse.json({ 
      revalidated: true, 
      pages: pagesToRevalidate,
      tags: [body._type, ...(slug ? [`${body._type}:${slug}`] : [])]
    });
  } catch (error: unknown) {
    let message = "Unknown error";
    if (error instanceof Error) message = error.message;
    return new Response(message, { status: 500 });
  }
}
