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
    id: "d-fashion-design-print-production",
    role: "Senior Graphic Designer & Printing Manager",
    company: "D_Fashion Shop",
    location: "Sri Lanka",
    period: "Current / Recent Role",
    type: "Production Management",
    description: "Working across graphic design and print production for apparel, connecting creative artwork with the practical requirements of digital printing and garment production.",
    highlights: [
      "Designing visual artwork for apparel and print applications.",
      "Coordinating digital print and production workflows, including sublimation-related work.",
      "Preparing production artwork and supporting the handoff from design to print.",
    ],
    skills: ["Graphic Design", "Digital Printing", "Sublimation", "Print Production", "Prepress"],
  },
  {
    id: "saheetrix-independent-creative",
    role: "Independent Graphic Designer & Web Developer",
    company: "SAHEETRIX",
    location: "Sri Lanka / Remote",
    period: "Independent Projects",
    type: "Freelance / Contract",
    description: "Building an independent creative service focused on graphic design, web development, social media content and marketing support for businesses and brands.",
    highlights: [
      "Developing brand visuals, campaign artwork and digital design assets.",
      "Designing and building responsive web experiences and portfolio websites.",
      "Combining design, social content and practical marketing support in project-based work.",
    ],
    skills: ["Brand Design", "Graphic Design", "Web Development", "Social Media", "Marketing"],
  },
];

export interface ClientLogo { name: string; category: string; accent: string; }
// Populate only with clients who have approved public attribution.
export const clientsData: ClientLogo[] = [];

export interface Testimonial { id: string; quote: string; clientName: string; role: string; company: string; project: string; rating: number; }
// Populate only with client-approved, attributable testimonials.
export const testimonialsData: Testimonial[] = [];
