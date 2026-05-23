import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

export async function POST(req: NextRequest) {
  try {
    if (!process.env.SANITY_REVALIDATE_SECRET) {
      return new Response("Missing SANITY_REVALIDATE_SECRET", { status: 500 });
    }

    const { body, isValidSignature } = await parseBody<{
      _type: string;
      slug?: string | { current: string };
    }>(req, process.env.SANITY_REVALIDATE_SECRET, true);

    if (!isValidSignature) {
      return new Response("Invalid signature", { status: 401 });
    }
    if (!body?._type) {
      return new Response("Missing document type", { status: 400 });
    }

    const slug =
      typeof body.slug === "string" ? body.slug : body.slug?.current;

    if (body._type === "home") {
      revalidatePath("/");
    } else if (body._type === "pageType" && slug) {
      revalidatePath(`/${slug}`);
    } else {
      // settings, contentType, reviewType, or unknown — bust all pages
      revalidatePath("/", "layout");
    }

    // Tag-based bust as a secondary mechanism
    revalidateTag(body._type);
    if (slug) revalidateTag(`${body._type}:${slug}`);

    return NextResponse.json({ revalidated: true, type: body._type, slug });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(message, { status: 500 });
  }
}
