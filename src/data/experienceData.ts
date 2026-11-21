export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: "Full-Time" | "Freelance / Contract" | "Production Management";
  description: string;
  highlights: string[];
  skills: string[];
}

export const experienceData: ExperienceItem[] = [
  {
    id: "lead-creative-freelance",
    role: "Senior Graphic Designer & Creative Director",
    company: "SAHEE TRIX Studio",
    location: "Sri Lanka / Remote Global",
    period: "2023 — PRESENT",
    type: "Freelance / Contract",
    description: "Leading independent creative direction, bespoke brand development, and international apparel design contracts for global esports teams, apparel brands, and commercial businesses.",
    highlights: [
      "Delivered 120+ successful client design systems spanning 8 countries.",
      "Integrated generative AI pipelines to reduce concept turnaround time by 60%.",
      "Managed client print manufacturing contracts from initial sketch to worldwide shipping.",
    ],
    skills: ["Creative Direction", "AI Workflow Integration", "Brand Systems", "International Client Delivery"],
  },
  {
    id: "printing-production-manager",
    role: "Printing & Prepress Production Manager",
    company: "Apex Print & Apparel Tech",
    location: "Sri Lanka",
    period: "2022 — 2024",
    type: "Production Management",
    description: "Spearheaded end-to-end industrial printing operations, sublimation departments, DTF lines, and prepress quality assurance for high-volume commercial garment production.",
    highlights: [
      "Managed daily output of 800+ sublimation and DTF printed sportswear units.",
      "Calibrated RIP profiles and ICC color management across Epson and Mimaki printer fleets.",
      "Reduced print reject and reprint rates by 35% through standardized prepress checks.",
    ],
    skills: ["Sublimation Printing", "DTF Heat Press", "ICC Profile Calibration", "Quality Assurance"],
  },
  {
    id: "graphic-designer-marketing",
    role: "Graphic Designer & Brand Specialist",
    company: "Visionary Media Lab",
    location: "Sri Lanka",
    period: "2021 — 2022",
    type: "Full-Time",
    description: "Designed multi-channel digital marketing campaigns, packaging prototypes, social media feed systems, and event collateral for consumer retail brands.",
    highlights: [
      "Designed visual identity packages for 25+ local and regional startup brands.",
      "Created viral social media templates generating over 1M combined reach.",
      "Engineered structural dielines and spot-color packaging plates for FMCG products.",
    ],
    skills: ["Social Media Campaigns", "Packaging Dielines", "Vector Illustration", "Adobe Suite"],
  },
];

export interface ClientLogo { name: string; category: string; accent: string; }
// Add only clients who have explicitly approved public attribution.
export const clientsData: ClientLogo[] = [];

export interface Testimonial { id: string; quote: string; clientName: string; role: string; company: string; project: string; rating: number; }
// Add only client-approved, attributable testimonials.
export const testimonialsData: Testimonial[] = [];
