"use client";

type PayPalHostedButtonProps = {
  paymentUrl: string;
};

export function PayPalHostedButton({ paymentUrl }: PayPalHostedButtonProps) {
  return (
    <div className="space-y-3">
      <a
        href={paymentUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex w-full items-center justify-center rounded-full border border-[#FFD140]/50 bg-[#FFD140] px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-black shadow-[0_0_24px_rgba(255,209,64,0.22)] transition-all hover:-translate-y-0.5 hover:bg-[#ffe17a] hover:shadow-[0_0_32px_rgba(255,209,64,0.38)]"
      >
        Add 10% for the transaction fee
      </a>
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-500">
        Continue to secure PayPal checkout
      </p>
    </div>
  );
}
