"use client";

import { useEffect } from "react";

const IFRAME_ID = "iframe_appointments_107640";

export default function AppointmentCard() {
  useEffect(() => {
    function handleMessage(e: MessageEvent) {
      const height = +e.data?.height;
      const type = e.data?.type;
      const iframe = document.querySelector<HTMLIFrameElement>(`#${IFRAME_ID}`);

      if (!type || !type.match(`${IFRAME_ID}_resize`) || isNaN(height) || !iframe) {
        return;
      }

      iframe.height = `${height}px`;
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <iframe
      title="Book an appointment"
      id={IFRAME_ID}
      src="https://momence.com/appointments/107640"
      style={{ width: "100%", border: 0, borderRadius: "40px" }}
      allowFullScreen
      scrolling="no"
    />
  );
}
