"use client";

import { useEffect } from "react";

const IFRAME_ID = "iframe_gift_cards_107640";

export default function GiftCardsCard() {
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
      title="Gift cards"
      id={IFRAME_ID}
      src="https://momence.com/gcc/107640"
      style={{ width: "100%", border: 0 }}
      allowFullScreen
      scrolling="no"
    />
  );
}
