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

export interface ClientLogo {
  name: string;
  category: string;
  accent: string;
}

export const clientsData: ClientLogo[] = [
  { name: "VALKYRIE ESPORTS", category: "Apparel & Gaming", accent: "#00e5ff" },
  { name: "COLOMBO STRIKERS", category: "Sports Franchise", accent: "#3b82f6" },
  { name: "NEXUS ROBOTICS", category: "Technology", accent: "#8b5cf6" },
  { name: "AURUM LONDON", category: "Luxury Botanicals", accent: "#f59e0b" },
  { name: "HYPERDRIVE BEV", category: "Consumer Beverage", accent: "#10b981" },
  { name: "METAMODERN FASHION", category: "Haute Couture", accent: "#ec4899" },
  { name: "HORIZON ASIA", category: "Live Events", accent: "#06b6d4" },
  { name: "CHROMA ARCHITECTURE", category: "Real Estate & Design", accent: "#e2e8f0" },
];

export interface Testimonial {
  id: string;
  quote: string;
  clientName: string;
  role: string;
  company: string;
  project: string;
  rating: number;
}

export const testimonialsData: Testimonial[] = [
  {
    id: "1",
    quote: "Sahee is rare in the creative world — he doesn't just design stunning visuals on a screen, he understands how ink, heat, and fabric behave in the real world. Our team's championship jerseys looked even sharper in person than in the 3D renders. Flawless work!",
    clientName: "Marcus Vance",
    role: "General Manager",
    company: "Valkyrie Esports Global",
    project: "Championship Jersey & Brand Kit",
    rating: 5,
  },
  {
    id: "2",
    quote: "We brought Sahee on for our luxury packaging overhaul. His prepress precision and understanding of foil stamping dielines saved us weeks of press delays and produced our most awarded retail packaging yet. Highly recommended.",
    clientName: "Elena Rostova",
    role: "Founder & Creative Director",
    company: "Aurum Apothecary London",
    project: "Luxury Packaging & Brand System",
    rating: 5,
  },
  {
    id: "3",
    quote: "Working with Sahee Trix was seamless. His AI-assisted creative workflows accelerated our campaign rollout by weeks, and the resulting visual fidelity exceeded our expectations across billboards, social ads, and retail displays.",
    clientName: "David Kariyawasam",
    role: "Head of Marketing",
    company: "HyperDrive Brands",
    project: "360° Omnichannel Launch Campaign",
    rating: 5,
  },
];
