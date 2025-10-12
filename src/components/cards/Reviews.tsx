"use client";
import { useEffect, useRef } from "react";

export default function Reviews() {
  const pluginRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prevent duplicate script injection
    if (document.getElementById("momence-reviews-script")) return;

    const script = document.createElement("script");
    script.id = "momence-reviews-script";
    script.async = true;
    script.type = "module";
    script.src = "https://momence.com/plugin/reviews/reviews.js";
    // Set attributes per API documentation
    script.setAttribute("host_id", "107640");
    script.setAttribute("is_profile_picture_enabled", "true");
    script.setAttribute("is_text_only_enabled", "true");
    script.setAttribute("is_session_and_teacher_info_enabled", "true");
    script.setAttribute("layout", "horizontal");
    script.setAttribute(
      "signature",
      "76d8aca8ddb080f46b6291697b4e5ec14f33fbf78892065df8cd0b602f8ba6ef"
    );
    // Attach script to DOM
    pluginRef.current?.appendChild(script);

    // Cleanup script on unmount
    return () => {
      if (pluginRef.current) {
        const elm = document.getElementById("momence-reviews-script");
        if (elm) pluginRef.current.removeChild(elm);
      }
    };
  }, []);

  return <div id="momence-plugin-reviews" ref={pluginRef} />;
}
