"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { siteConfig } from "@/data/siteConfig";
import {
  Send,
  MessageCircle,
  Mail,
  Instagram,
  Linkedin,
  Facebook,
  Palette,
  CheckCircle2,
  Copy,
  Sparkles,
  ArrowRight,
  CreditCard,
} from "lucide-react";
import { PayPalHostedButton } from "@/components/payment/PayPalHostedButton";

const normalizeUserText = (value: string, maxLength = 800) =>
  value
    .replace(/[\\u0000-\\u001F\\u007F]/g, " ")
    .replace(/\\s+/g, " ")
    .trim()
    .slice(0, maxLength);

const isValidEmail = (value: string) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value);

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "Graphic & Brand Design",
    budget: "$500 - $1,500",
    details: "",
    website: "",
  });

  const [copied, setCopied] = useState(false);
  const [formNotice, setFormNotice] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const buildInquiryText = () => [
    "New Project Inquiry for SAHEETRIX",
    "",
    `Name: ${normalizeUserText(formData.name, 80) || "N/A"}`,
    `Email: ${normalizeUserText(formData.email, 160) || "N/A"}`,
    `Phone: ${normalizeUserText(formData.phone, 40) || "N/A"}`,
    `Company: ${normalizeUserText(formData.company, 120) || "N/A"}`,
    `Service Required: ${normalizeUserText(formData.service, 120)}`,
    `Budget Range: ${normalizeUserText(formData.budget, 80)}`,
    `Project Details: ${normalizeUserText(formData.details, 1200) || "Let's discuss details over chat."}`,
  ].join("\n");

  const generateWhatsAppUrl = () => {
    const phoneNumber = siteConfig.contact.whatsapp.replace(/\D/g, "");
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(buildInquiryText())}`;
  };

  const generateEmailUrl = () => {
    const subject = "New Project Inquiry for SAHEETRIX";
    return `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildInquiryText())}`;
  };

  const handleCopyInquiry = () => {
    navigator.clipboard.writeText(buildInquiryText());
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot: real users never see or fill this field; bots are silently ignored.
    if (formData.website.trim()) return;

    const name = normalizeUserText(formData.name, 80);
    const email = normalizeUserText(formData.email, 160);
    const details = normalizeUserText(formData.details, 1200);

    if (name.length < 2 || !isValidEmail(email) || details.length < 10) {
      setFormNotice("Please add a valid name, email, and at least 10 characters of project details.");
      return;
    }

    const now = Date.now();
    const lastSubmit = Number(window.localStorage.getItem("saheetrix-inquiry-last-submit") || "0");
    if (now - lastSubmit < 15000) {
      setFormNotice("Please wait a few seconds before sending another inquiry.");
      return;
    }

    window.localStorage.setItem("saheetrix-inquiry-last-submit", String(now));
    setFormNotice("Opening WhatsApp with your project brief…");
    window.open(generateWhatsAppUrl(), "_blank", "noopener,noreferrer");
  };

  const handleEmailInquiry = () => {
    window.location.href = generateEmailUrl();
  };

  return (
    <section id="contact" className="fx-animated-section fx-contact-radiance fx-streak relative w-full py-28 px-4 sm:px-6 lg:px-12 bg-[#08080a] border-t border-white/5 overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-[#00e5ff]/10 via-[#8b5cf6]/10 to-[#ec4899]/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#00e5ff] animate-ping" />
            <span className="font-mono text-xs tracking-widest uppercase text-zinc-300">
              // START A COLLABORATION
            </span>
          </div>

          <h2 className="font-display font-extrabold text-4xl sm:text-6xl text-white tracking-tight leading-tight">
            HAVE AN IDEA? <br />
            <span className="bg-gradient-to-r from-[#00e5ff] via-[#8b5cf6] to-[#ec4899] bg-clip-text text-transparent">
              LET&apos;S TURN IT INTO SOMETHING POWERFUL.
            </span>
          </h2>

          <p className="font-sans text-base text-zinc-400">
            Whether you need a complete corporate brand system, custom championship jerseys, packaging prepress, or next-gen AI visuals — let&apos;s build something exceptional.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Coordinates & Social Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div className="contact-panel p-8 rounded-3xl glass-panel border border-white/10 space-y-6">
              <h3 className="font-display font-bold text-xl text-white">
                DIRECT CHANNELS
              </h3>

              <div className="space-y-4 font-mono text-xs">
                <a
                  href={siteConfig.socialLinks[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-whatsapp-cta flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-[#25D366]/10 border border-white/5 hover:border-[#25D366]/40 text-zinc-300 hover:text-white transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-5 h-5 text-[#25D366]" />
                    <div>
                      <span className="text-white font-bold block">WhatsApp Direct</span>
                      <span className="text-zinc-300">{siteConfig.contact.whatsappFormatted}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-300 group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-[#00e5ff]/10 border border-white/5 hover:border-[#00e5ff]/40 text-zinc-300 hover:text-white transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-[#00e5ff]" />
                    <div>
                      <span className="text-white font-bold block">Official Email</span>
                      <span className="text-zinc-300">{siteConfig.contact.email}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-300 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <span className="font-mono text-xs text-zinc-300 uppercase tracking-wider block">
                  SOCIAL ECOSYSTEM
                </span>
                <div className="flex flex-wrap gap-2">
                  {siteConfig.socialLinks.map((s) => (
                    <a
                      key={s.name}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/5 font-mono text-xs transition-colors flex items-center gap-1.5"
                    >
                      <span>{s.name}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Location badge */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 font-mono text-xs text-zinc-400 flex items-center justify-between">
                <span>BASED IN: {siteConfig.contact.location}</span>
                <span className="text-emerald-400 font-bold">WORLDWIDE REMOTE</span>
              </div>
            </div>

            <div className="contact-panel p-6 sm:p-8 rounded-3xl glass-panel border border-[#FFD140]/20 bg-gradient-to-br from-[#FFD140]/10 via-white/[0.03] to-transparent space-y-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FFD140]">
                    // SECURE PAYMENT
                  </span>
                  <h3 className="font-display font-bold text-2xl text-white mt-2">PAY WITH PAYPAL</h3>
                  <p className="font-sans text-sm text-zinc-300 mt-2 leading-relaxed">
                    Pay a project deposit or approved service invoice through PayPal&apos;s secure checkout.
                  </p>
                </div>
                <div className="shrink-0 rounded-2xl border border-[#FFD140]/25 bg-[#FFD140]/10 p-3 text-[#FFD140]">
                  <CreditCard className="h-5 w-5" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] items-center gap-5">
                <div className="min-w-0">
                  <PayPalHostedButton
                    paymentUrl={siteConfig.payment.paypalUrl}
                  />
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-500 mt-3">
                    Add 10% for the transaction fee • Currency: {siteConfig.payment.currency} • Protected by PayPal
                  </p>
                </div>

                <div className="justify-self-center rounded-2xl border border-white/10 bg-white p-3 text-center shadow-[0_0_24px_rgba(255,209,64,0.12)]">
                  <Image
                    src={siteConfig.payment.qrImage}
                    alt="Scan the SAHEETRIX PayPal payment QR code"
                    width={148}
                    height={148}
                    className="h-32 w-32 sm:h-36 sm:w-36 object-contain"
                  />
                  <span className="mt-2 block font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-black">
                    Scan to Pay
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Project Inquiry Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="contact-panel relative p-8 sm:p-10 rounded-3xl glass-panel border border-white/10 space-y-6"
            >
              <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                <label htmlFor="website">Leave this field empty</label>
                <input
                  id="website"
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-xl text-white">
                  START A PROJECT INQUIRY
                </h3>
                <span className="font-mono text-xs text-zinc-300">
                  WHATSAPP OR EMAIL INQUIRY
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-zinc-400 uppercase">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Alex Henderson"
                    className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white font-sans text-sm focus:outline-none focus:border-[#00e5ff] transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-zinc-400 uppercase">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="alex@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white font-sans text-sm focus:outline-none focus:border-[#00e5ff] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-zinc-400 uppercase">WhatsApp / Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 555 019 2834"
                    className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white font-sans text-sm focus:outline-none focus:border-[#00e5ff] transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-zinc-400 uppercase">Company / Brand</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Brand or Studio Name"
                    className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white font-sans text-sm focus:outline-none focus:border-[#00e5ff] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-zinc-400 uppercase">Service Needed</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white font-sans text-sm focus:outline-none focus:border-[#00e5ff] transition-colors"
                  >
                    <option value="Graphic & Brand Design">Graphic & Brand Design</option>
                    <option value="Jersey & Apparel Production">Jersey & Apparel Production</option>
                    <option value="Social Media Campaign">Social Media Campaign</option>
                    <option value="Print Prepress & Dielines">Print Prepress & Dielines</option>
                    <option value="Packaging & Foil Stamping">Packaging & Foil Stamping</option>
                    <option value="AI Creative Solutions">AI Creative Solutions</option>
                    <option value="Full Retainer / 360 Campaign">Full Retainer / 360 Campaign</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-zinc-400 uppercase">Estimated Budget</label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white font-sans text-sm focus:outline-none focus:border-[#00e5ff] transition-colors"
                  >
                    <option value="Under $500">Under $500</option>
                    <option value="$500 - $1,500">$500 - $1,500</option>
                    <option value="$1,500 - $3,500">$1,500 - $3,500</option>
                    <option value="$3,500 - $10,000+">$3,500 - $10,000+</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-xs text-zinc-400 uppercase">Project Brief / Details *</label>
                <textarea
                  name="details"
                  rows={4}
                  required
                  value={formData.details}
                  onChange={handleChange}
                  placeholder="Tell me about your brand, deadlines, physical materials, or creative vision..."
                  className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white font-sans text-sm focus:outline-none focus:border-[#00e5ff] transition-colors resize-none"
                />
              </div>

              {/* Action buttons */}
              {formNotice && (
                <p
                  role="status"
                  aria-live="polite"
                  className="font-mono text-xs uppercase tracking-wider text-amber-300/90"
                >
                  {formNotice}
                </p>
              )}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <button
                  type="submit"
                  className="contact-submit-button w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#00e5ff] to-[#8b5cf6] text-[#08080a] font-mono font-bold text-xs uppercase tracking-wider shadow-[0_0_30px_rgba(0,229,255,0.4)] hover:shadow-[0_0_40px_rgba(0,229,255,0.6)] hover:scale-[1.02] active:scale-98 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>START A PROJECT → SUBMIT ON WHATSAPP</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyInquiry}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-4 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-zinc-300 font-mono text-xs uppercase tracking-wider transition-colors"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400">COPIED!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>COPY BRIEF</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleEmailInquiry}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-4 rounded-full border border-[#00e5ff]/30 bg-[#00e5ff]/5 hover:bg-[#00e5ff]/10 text-[#00e5ff] font-mono text-xs uppercase tracking-wider transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email Brief</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
