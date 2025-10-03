"use client";

import { useState } from "react";
import { spacing, forms, buttons, typography } from "@/styles/design-tokens";
import { urlFor } from "@/sanity/lib/image";
import { BlockContent } from "./inputs/PortableTextComponents";
import Image from "next/image";
import type { MomenceForm as FormProps } from "@types";

export default function MomenceForm({ textBlock, photo, source }: FormProps) {
  const [submitted, setSubmitted] = useState(false);

  if (!source) return null;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const values = {
      sourceId: source,
      token: process.env.NEXT_PUBLIC_MOMENCE_TOKEN || "fallback_token",
      ...Object.fromEntries(new FormData(form)),
    };

    try {
      const res = await fetch(
        "https://api.momence.com/integrations/customer-leads/107640/collect",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to submit form");
      }

      setSubmitted(true);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <section className={spacing.section}>
      <div className={`${spacing.container} !items-start md:grid lg:grid-cols-2`}>
        {photo && (
          <Image
            src={urlFor(photo).url()}
            alt={photo.alt || "form image"}
            width={1000}
            height={1000}
            className="rounded-4xl lg:rounded-[48px]"
          />
        )}
        <div className="space-y-10 lg:py-10">
          {textBlock && <BlockContent value={textBlock} />}
          {!submitted ? (
            <form
              id="momence_leads_form"
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <div className={forms.fieldset}>
                <label htmlFor="firstName" className={forms.label}>
                  First name*
                </label>
                <input type="text" name="firstName" id="firstName" required className={forms.input} />
              </div>

              <div className={forms.fieldset}>
                <label htmlFor="lastName" className={forms.label}>
                  Last name
                </label>
                <input type="text" name="lastName" id="lastName" className={forms.input} />
              </div>

              <div className={forms.fieldset}>
                <label htmlFor="email" className={forms.label}>
                  E-mail*
                </label>
                <input type="email" name="email" id="email" required className={forms.input} />
              </div>

              <div className={forms.fieldset}>
                <label htmlFor="phoneNumber" className={forms.label}>
                  Phone number
                </label>
                <input type="text" name="phoneNumber" id="phoneNumber" className={forms.input} />
              </div>

              <div className={forms.fieldset}>
                <label htmlFor="discoveryAnswer" className={forms.label}>
                  How did you find out about us?
                </label>
                <input type="text" name="discoveryAnswer" id="discoveryAnswer" className={forms.input} />
              </div>

              <button
                type="submit"
                className={`${buttons.primary} !w-full !mt-10`}
              >
                Submit
              </button>
            </form>
          ) : (
            <div
              id="momence_leads_form_submit_success"
              
            >
              <p className={typography.body}>Thank you!</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
