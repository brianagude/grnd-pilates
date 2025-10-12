"use client";
import { useEffect } from "react";

type LeadFormMomenceProps = {
  containerId?: string;
  hostId?: string;
  fields: string;
  token?: string;
  countryCode?: string;
  dataCollectConsent?: boolean;
  sourceId?: string;
  fieldDefJson: string;
  dataRedirectAfterSubmitTo?: string;
  dataOnSuccessMsg?: string;
  src?: string;
};

export const LeadFormMomence = ({
  containerId = "momence-plugin-lead-form",
  hostId = "107640",
  token = "3mX0LbY9Xk",
  countryCode = "us",
  src = "https://momence.com/plugin/lead-form/lead-form.js",
  fields,
  dataCollectConsent,
  sourceId,
  fieldDefJson,
  dataRedirectAfterSubmitTo,
  dataOnSuccessMsg,
}: LeadFormMomenceProps) => {
  useEffect(() => {
    const existingScript = document.getElementById("momence-plugin-lead-form-src");
    if (existingScript) {
      existingScript.remove();
    }
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = "";
    }

    // Create script element
    const script = document.createElement("script");
    script.async = true;
    script.type = "module";
    script.id = "momence-plugin-lead-form-src";

    script.setAttribute("host_id", hostId);
    script.setAttribute("token", token);
    script.setAttribute("country_code", countryCode);
    script.setAttribute("fields", fields);
    script.setAttribute("data-field-def", fieldDefJson);

    if (sourceId) {
      script.setAttribute("source_id", sourceId);
    }
    if (dataCollectConsent) {
      script.setAttribute("data_collect_consent", "required");
    }
    if (dataRedirectAfterSubmitTo) {
      script.setAttribute("data-redirect-after-submit-to", dataRedirectAfterSubmitTo);
    }
    if (dataOnSuccessMsg) {
      script.setAttribute("data-on-success-msg", dataOnSuccessMsg);
    }

    script.src = src;

    document.body.appendChild(script);

    return () => {
      script.remove();
      if (container) {
        container.innerHTML = "";
      }
    };
  }, [
    hostId,
    token,
    countryCode,
    fields,
    fieldDefJson,
    sourceId,
    dataCollectConsent,
    dataRedirectAfterSubmitTo,
    dataOnSuccessMsg,
    containerId,
    src,
  ]);

  if (!fields || !fieldDefJson) return null;
  return <div id={containerId} className="momence-form" />;
};
