export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  tools: string[];
  accentColor: string;
  badge: string;
}

export const servicesData: ServiceItem[] = [
  {
    id: "graphic-design",
    number: "01",
    title: "GRAPHIC DESIGN",
    tagline: "High-concept visual communication with precision layout and editorial mastery",
    description: "Creating iconic visual identities, marketing collateral, vector illustrations, promotional assets, and corporate design materials that captivate attention and communicate brand value effortlessly.",
    deliverables: ["Editorial Layouts", "Vector Illustrations", "Posters & Flyers", "Corporate Stationery", "Infographics"],
    tools: ["Adobe Illustrator", "Photoshop", "InDesign", "CorelDRAW"],
    accentColor: "#00e5ff",
    badge: "Core Expertise",
  },
  {
    id: "brand-identity",
    number: "02",
    title: "BRAND IDENTITY",
    tagline: "Comprehensive brand ecosystems built to stand the test of time and scale",
    description: "Developing memorable logos, brand architecture, responsive design systems, bespoke typography palettes, and exhaustive brand guidelines ready for multi-channel deployment.",
    deliverables: ["Primary & Sub-marks", "Brand Guidelines (PDF)", "Color Systems & Typography", "Iconography Sets", "Social Kits"],
    tools: ["Adobe Illustrator", "InDesign", "Figma"],
    accentColor: "#8b5cf6",
    badge: "Strategic",
  },
  {
    id: "social-media",
    number: "03",
    title: "SOCIAL MEDIA",
    tagline: "Scroll-stopping feed systems, carousels, and dynamic motion assets",
    description: "Designing high-engagement social media campaigns, kinetic reels templates, story packs, and cohesive grid aesthetics that drive conversion and grow organic audiences.",
    deliverables: ["Instagram Carousels", "Reels/TikTok Motion Covers", "Banner Ad Sets", "Highlight & Story Kits", "Grid Systems"],
    tools: ["Photoshop", "After Effects", "Canva Pro", "Adobe Express"],
    accentColor: "#ec4899",
    badge: "High Engagement",
  },
  {
    id: "jersey-apparel",
    number: "04",
    title: "JERSEY & APPAREL",
    tagline: "From screen to fabric — esports jerseys, teamwear, and streetwear tech packs",
    description: "Specialized in 360° athletic apparel design, full sublimation pattern drafting, 3D garment simulation, DTF transfer artwork, and manufacturing-ready tech packs.",
    deliverables: ["All-Over Sublimation Art", "Front/Back/Sleeve Patterns", "3D Photorealistic Mockups", "Factory Size Grading", "DTF Silicone Badges"],
    tools: ["Adobe Illustrator", "Photoshop", "CLO 3D", "CorelDRAW"],
    accentColor: "#3b82f6",
    badge: "Signature Specialty",
  },
  {
    id: "print-production",
    number: "05",
    title: "PRINT PRODUCTION",
    tagline: "RGB + CMYK color management, prepress RIP control, and physical craftsmanship",
    description: "Bridging the gap between digital design and press. Comprehensive expertise in sublimation printing, DTF, large format eco-solvent, offset prepress, die-cuts, and quality inspection.",
    deliverables: ["PDF/X-1a Prepress Files", "Spot Color & White Layer RIP", "Color Calibration Profiles", "Die-cut & Dieline Engineering", "Press Oversight"],
    tools: ["Wasatch RIP", "Mimaki RasterLink", "Acrobat DC", "CorelDRAW"],
    accentColor: "#00a4e4",
    badge: "Industrial Mastery",
  },
  {
    id: "packaging",
    number: "06",
    title: "PACKAGING",
    tagline: "Tactile unboxing experiences, structural dielines, and retail shelf presence",
    description: "Engineering custom packaging dielines, luxury folding cartons, pouches, labels, and specialized foil/spot UV finish plates for cosmetics, food, and tech hardware.",
    deliverables: ["Custom Dielines", "Foil & Emboss Plates", "Barcode & Nutrition Panels", "3D Shelf Visualizations", "Box Mockups"],
    tools: ["Adobe Illustrator", "Esko Tools", "Photoshop", "InDesign"],
    accentColor: "#f59e0b",
    badge: "Premium Retail",
  },
  {
    id: "marketing",
    number: "07",
    title: "MARKETING",
    tagline: "Omnichannel creative direction connecting digital touchpoints and real-world ads",
    description: "Crafting cohesive advertising campaigns across digital display ads, billboards, event signage, email newsletters, and point-of-sale retail displays.",
    deliverables: ["Campaign Key Visuals", "Large Format Billboards", "Display Ad Suites", "Event Signage & Booths", "Merchandising"],
    tools: ["Photoshop", "Illustrator", "Premiere Pro", "Canva"],
    accentColor: "#10b981",
    badge: "Full Funnel",
  },
  {
    id: "ai-creative-solutions",
    number: "08",
    title: "AI CREATIVE SOLUTIONS",
    tagline: "Next-gen generative AI workflows delivering impossible visuals in record time",
    description: "Supercharging creative production with advanced prompt engineering, custom image model workflows, AI upscaling, concept ideation, and digital composite retouching.",
    deliverables: ["Concept Prototyping", "Photorealistic AI Renders", "Prompt Architecture", "AI Image Expansion/Retouch", "Generative Textures"],
    tools: ["Midjourney", "Stable Diffusion", "Magnific/Topaz AI", "Photoshop Generative"],
    accentColor: "#a855f7",
    badge: "Futuristic & Fast",
  },
];
