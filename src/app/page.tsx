"use client";

import React, { useEffect, useState } from "react";
import { IntroLoader } from "@/components/intro/IntroLoader";
import { FloatingWhatsApp } from "@/components/floating/FloatingWhatsApp";
import { MouseGradientMesh } from "@/components/effects/MouseGradientMesh";
import { Navbar } from "@/components/navigation/Navbar";
import { HeroSection } from "@/components/hero/HeroSection";
import { AboutSection } from "@/components/about/AboutSection";
import { ServicesSection } from "@/components/services/ServicesSection";
import { PortfolioSection } from "@/components/portfolio/PortfolioSection";
import { JerseyShowcase } from "@/components/jersey/JerseyShowcase";
import { PrintProductionSection } from "@/components/print/PrintProductionSection";
import { BeforeAfterSlider } from "@/components/transformation/BeforeAfterSlider";
import { SkillsGrid } from "@/components/skills/SkillsGrid";
import { ExperienceTimeline } from "@/components/experience/ExperienceTimeline";
import { ClientMarquee } from "@/components/clients/ClientMarquee";
import { TestimonialSection } from "@/components/testimonials/TestimonialSection";
import { ContactSection } from "@/components/contact/ContactSection";
import { Footer } from "@/components/footer/Footer";

export default function Home() {
  const [introCompleted, setIntroCompleted] = useState(false);

  useEffect(() => {
    const cleanUrl = () => {
      if (window.location.search || window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname);
      }
    };

    const handleAnchorClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>(
        'a[href^="#"]',
      );
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      event.preventDefault();

      if (href === "#") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        document.querySelector(href)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      window.history.replaceState(null, "", window.location.pathname);
    };

    cleanUrl();
    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-[#08080a] text-zinc-100 selection:bg-[#e50914] selection:text-white">
      {/* Intro Loader */}
      {!introCompleted && (
        <IntroLoader onComplete={() => setIntroCompleted(true)} />
      )}

      {/* Interactive Mouse-Reactive Colorful Gradient Mesh Background */}
      <MouseGradientMesh />

      {/* Floating WhatsApp Quick Chat */}
      <FloatingWhatsApp />

      {/* Sticky Morphing Navigation */}
      <Navbar />

      {/* 01. 3D Cinematic Hero */}
      <HeroSection />

      {/* 02. About & Creative Philosophy */}
      <AboutSection />

      {/* 03. Specialized Capabilities (What I Do) */}
      <ServicesSection />

      {/* 04. Featured Projects & Case Studies */}
      <PortfolioSection />

      {/* 05. "From Screen to Fabric" Jersey & Apparel Stage */}
      <JerseyShowcase />

      {/* 06. Industrial Print & Prepress Engine */}
      <PrintProductionSection />

      {/* 08. Before & After Transformation Slider */}
      <BeforeAfterSlider />

      {/* 09. Creative Tools Matrix */}
      <SkillsGrid />

      {/* 10. Experience Timeline */}
      <ExperienceTimeline />

      {/* 11. Client & Partner Marquee */}
      <ClientMarquee />

      {/* 12. Oversized Editorial Testimonials */}
      <TestimonialSection />

      {/* 13. Contact & Project Inquiry Form */}
      <ContactSection />

      {/* 14. Oversized Footer */}
      <Footer />
    </main>
  );
}
