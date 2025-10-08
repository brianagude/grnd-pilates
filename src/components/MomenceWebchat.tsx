"use client";
import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

export default function MomenceWebchat() {
  const containerRef = useRef(null);

  useEffect(() => {
    window.React = React;
    window.ReactDOM = ReactDOM;

    if (containerRef.current) {
      // Remove any prior scripts if re-rendering
      const existingScript = containerRef.current.querySelector("script");
      if (existingScript) containerRef.current.removeChild(existingScript);

      // Create script tag with exact attributes
      const script = document.createElement("script");
      script.src = "https://momence.com/plugin/webchat/webchat.js";
      script.async = true;
      script.type = "module";
      script.setAttribute("host-id", "107640");
      script.setAttribute("token", "3mX0LbY9Xk");
      script.setAttribute("position", "bottom-right");
      script.crossOrigin = "anonymous";

      containerRef.current.appendChild(script);
    }
  }, []);

  return <div ref={containerRef}></div>;
}
