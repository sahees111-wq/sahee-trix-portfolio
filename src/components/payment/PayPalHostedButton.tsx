"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    paypal?: {
      HostedButtons?: (options: { hostedButtonId: string }) => {
        render: (selector: string) => void;
      };
    };
  }
}

const PAYPAL_SDK_URL =
  "https://www.paypal.com/sdk/js?client-id=BAAF6WKwbsZ-48lcDP9Vyww7GAvVuXJR_mo2NPGUpNmiL6dQBLf-2SuErjWJvZnBcS3pW2SMT92jDMoaUo&components=hosted-buttons&disable-funding=venmo&currency=USD";

type PayPalHostedButtonProps = {
  hostedButtonId: string;
  paymentUrl: string;
};

export function PayPalHostedButton({
  hostedButtonId,
  paymentUrl,
}: PayPalHostedButtonProps) {
  const containerId = `paypal-container-${hostedButtonId}`;
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "fallback">("loading");

  useEffect(() => {
    let cancelled = false;

    const renderButtons = () => {
      if (cancelled || !containerRef.current) return;

      const hostedButtons = window.paypal?.HostedButtons;
      if (!hostedButtons) {
        setStatus("fallback");
        return;
      }

      containerRef.current.innerHTML = "";

      try {
        hostedButtons({ hostedButtonId }).render(`#${containerId}`);
        setStatus("ready");
      } catch {
        setStatus("fallback");
      }
    };

    const handleError = () => {
      if (!cancelled) setStatus("fallback");
    };

    const existingScript = document.querySelector<HTMLScriptElement>(
      "script[data-saheetrix-paypal-sdk]",
    );

    if (window.paypal?.HostedButtons) {
      renderButtons();
    } else if (existingScript) {
      existingScript.addEventListener("load", renderButtons);
      existingScript.addEventListener("error", handleError);
    } else {
      const script = document.createElement("script");
      script.src = PAYPAL_SDK_URL;
      script.async = true;
      script.dataset.saheetrixPaypalSdk = "true";
      script.addEventListener("load", renderButtons);
      script.addEventListener("error", handleError);
      document.head.appendChild(script);
    }

    return () => {
      cancelled = true;
      existingScript?.removeEventListener("load", renderButtons);
      existingScript?.removeEventListener("error", handleError);
    };
  }, [containerId, hostedButtonId]);

  return (
    <div className="space-y-3">
      <div
        id={containerId}
        ref={containerRef}
        className="min-h-12 w-full"
        aria-live="polite"
      />

      {status === "loading" && (
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
          Loading secure PayPal checkout…
        </p>
      )}

      {status === "fallback" && (
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-amber-300/80">
          Add 10% for the transaction fee, then use the secure PayPal checkout link below.
        </p>
      )}

      <a
        href={paymentUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center rounded-full border border-[#FFD140]/40 bg-[#FFD140]/10 px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#FFD140] transition-all hover:border-[#FFD140] hover:bg-[#FFD140] hover:text-black"
      >
        Open PayPal Checkout
      </a>
    </div>
  );
}
