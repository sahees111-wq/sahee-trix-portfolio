export interface ProcessStep {
  title: string;
  description: string;
}

export interface ProductionBreakdown {
  digitalArtwork: string;
  prepress: string;
  printTechnology: string;
  physicalResult: string;
}

export interface Project {
  slug: string;
  title: string;
  category: "BRANDING" | "SOCIAL MEDIA" | "JERSEY DESIGN" | "PRINTING" | "PACKAGING" | "MARKETING" | "AI CREATIVE";
  client: string;
  year: string;
  tagline: string;
  description: string;
  thumbnail: string;
  heroImage: string;
  gallery: { url: string; caption: string }[];
  services: string[];
  software: string[];
  challenge: string;
  creativeDirection: string;
  process: ProcessStep[];
  finalResult: string;
  productionBreakdown?: ProductionBreakdown;
  featured: boolean;
  colorAccent?: string;
}

export const portfolioProjects: Project[] = [
  {
    slug: "valkyrie-esports-championship-kit",
    title: "Valkyrie Championship Pro Jersey",
    category: "JERSEY DESIGN",
    client: "Valkyrie Gaming Global",
    year: "2024",
    tagline: "Dynamic cyber-armor sublimation jersey for world championship league",
    description: "End-to-end concept design, 3D parametric apparel mockup, vector separation, and industrial all-over sublimation printing for an international esports team.",
    thumbnail: "/images/Valkyrie Championship Pro Jersey Showcase.png",
    heroImage: "/images/Valkyrie Championship Pro Jersey Showcase.png",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1200&auto=format&fit=crop",
        caption: "Front & Back Sublimation Layout with Micro-mesh Perforation Zones",
      },
      {
        url: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1200&auto=format&fit=crop",
        caption: "High-density Silicon Crest & CMYK+Fluorescent Ink Separation",
      },
      {
        url: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=1200&auto=format&fit=crop",
        caption: "Final Tailored Poly-Spandex Jersey Worn in Arena Finals",
      },
    ],
    services: ["Apparel Design", "Sublimation Prepress", "3D Cloth Mockups", "Factory Tech Pack"],
    software: ["Adobe Illustrator", "Photoshop", "CLO 3D", "CorelDRAW"],
    challenge: "The client needed a high-impact aerodynamic jersey design that maintained vibrant neon cyan and magenta hues across multiple sizes without stretching distortion during the heat-press sublimation transfer.",
    creativeDirection: "Fused aggressive angular mech geometry with stealth carbon textures, utilizing fluorescent spot channels alongside CMYK for electric vibrancy under arena lighting.",
    process: [
      { title: "01. Concept & Vector Patterning", description: "Created vector contours optimized for seamless seam-matching across torso and sleeve panels." },
      { title: "02. 3D Drape & Stress Testing", description: "Simulated fabric tension in 3D to ensure typography and sponsor logos retain alignment on active athletes." },
      { title: "03. Prepress RIP & Color Profiling", description: "Configured custom ICC color profiles on high-speed industrial sublimation printers to achieve 100% color accuracy." },
      { title: "04. Precision Heat Calendering & Sewing", description: "Monitored 210°C transfer onto 180 GSM moisture-wicking interlock fabric with reinforced flatlock stitching." },
    ],
    finalResult: "Supplied 250+ custom kits delivered on time for the Singapore Grand Finals, praised by fans for exceptional stitch durability and breathability.",
    productionBreakdown: {
      digitalArtwork: "300 DPI 1:1 Vector Master + Spot Fluorescent Separation Layers",
      prepress: "Wasatch RIP software calibration with custom polyester ICC profiles",
      printTechnology: "Industrial High-Speed Dye-Sublimation (Epson F-Series / 215°C Rotary Heat Press)",
      physicalResult: "180 GSM Interlock Poly-Spandex, Anti-pilling, Sub-surface dye infusion",
    },
    featured: true,
    colorAccent: "#00e5ff",
  },
  {
    slug: "aurum-luxe-botanicals-packaging",
    title: "Aurum Botanicals Luxury Packaging & Foil Prepress",
    category: "PACKAGING",
    client: "Aurum Apothecary London",
    year: "2024",
    tagline: "Ultra-premium matte black packaging with multi-level brass foil stamping and tactile emboss",
    description: "Complete identity, structural carton dieline engineering, and prepress mastery for a premium botanical skincare collection featuring spot UV and hot stamping.",
    thumbnail: "https://images.unsplash.com/photo-1610245169254-1cfd8bd165bf?q=80&w=1200&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1800&auto=format&fit=crop",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?q=80&w=1200&auto=format&fit=crop",
        caption: "Packaging Unboxing Experience & Foil Calibration",
      },
      {
        url: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1200&auto=format&fit=crop",
        caption: "Prepress Dielines, Creasing Matrix & Registration Target Marks",
      },
    ],
    services: ["Packaging Design", "Dieline Engineering", "Hot Foil Stamping Prepress", "Brand Identity"],
    software: ["Adobe Illustrator", "InDesign", "Photoshop", "Esko Studio"],
    challenge: "Executing extreme micro-typography and fine linework inside metallic gold hot foil stamps on textured soft-touch stock without foil bleeding or fill-in.",
    creativeDirection: "Minimalist dark aesthetic using 100% rich black (C60 M50 Y50 K100), paired with warm gold foil and bespoke blind debossing for tactile luxury.",
    process: [
      { title: "01. Dieline Architecture", description: "Engineered double-wall crash-lock cartons engineered for high-speed automated packaging." },
      { title: "02. Foil Plate Separation", description: "Separated magnesium foil stamp dies with 0.15pt minimum stroke tolerance." },
      { title: "03. Press Check & Registration", description: "Supervised on-press offset printing with soft-touch lamination and precision die-cutting." },
    ],
    finalResult: "Featured on Packaging of the World with a 38% increase in retail shelf conversion across UK boutiques.",
    productionBreakdown: {
      digitalArtwork: "Vector dielines with 3mm bleed, separate 100% K foil stamp & spot UV plates",
      prepress: "Heidelberg Prinect workflow with 2400 DPI plate output",
      printTechnology: "6-Color Heidelberg Speedmaster Offset + Hydraulic Hot Foil Stamping",
      physicalResult: "350 GSM FSC Velvet Board + Velvet Soft-Touch Matte + 22K Metallic Gold Foil",
    },
    featured: true,
    colorAccent: "#f59e0b",
  },
  {
    slug: "nexus-cybernetics-brand-system",
    title: "Nexus Cybernetics Comprehensive Brand System",
    category: "BRANDING",
    client: "Nexus AI Robotics",
    year: "2024",
    tagline: "Dynamic visual identity and generative design system for an advanced robotics lab",
    description: "Modular brand identity system, custom grid typography, dynamic iconography, design guidelines, and cohesive corporate stationery.",
    thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1800&auto=format&fit=crop",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop",
        caption: "Geometric Glyph Construction & Responsive Logo Scaling",
      },
      {
        url: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
        caption: "Stationery Suite & Industrial Signage Manual",
      },
    ],
    services: ["Brand Identity", "Design Systems", "Typography", "Stationery & Prepress"],
    software: ["Adobe Illustrator", "Photoshop", "InDesign", "Figma"],
    challenge: "Creating an identity that scales from a 16px app icon to a 10-meter CNC engraved building facade while communicating precision robotics.",
    creativeDirection: "Architectural isometric grid system, hyper-legible geometric sans typography, and high-contrast electric violet on obsidian graphite.",
    process: [
      { title: "01. Brand Strategy & Matrix", description: "Synthesized core brand pillars into abstract modular symbols." },
      { title: "02. Generative Grid", description: "Created an 8pt dynamic grid for infinite consistent brand assets." },
      { title: "03. 120-page Brand Guideline", description: "Authored comprehensive usage rules, color specs (Pantone, CMYK, RGB, HEX), and signage prepress." },
    ],
    finalResult: "Unified global branding across 6 international offices and secured prominent coverage in major tech publications.",
    featured: true,
    colorAccent: "#8b5cf6",
  },
  {
    slug: "hyperdrive-energy-campaign",
    title: "HyperDrive Velocity 360° Marketing Campaign",
    category: "MARKETING",
    client: "HyperDrive Nutrition",
    year: "2023",
    tagline: "Omnichannel launch campaign spanning digital ads, billboard prints, and influencer kits",
    description: "End-to-end creative direction for a national energy beverage launch, merging 3D can renders, high-energy social media assets, and large-format outdoor billboards.",
    thumbnail: "https://images.unsplash.com/photo-1622543925917-763c34d1a86e?q=80&w=1200&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=1800&auto=format&fit=crop",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1622543925917-763c34d1a86e?q=80&w=1200&auto=format&fit=crop",
        caption: "3D Kinetic Can Visuals & Liquid Simulation Compositing",
      },
      {
        url: "https://images.unsplash.com/photo-1738278708862-9da0af92f617?q=80&w=1200&auto=format&fit=crop",
        caption: "Large Format 40ft Highway Billboard Prepress & Color Match",
      },
    ],
    services: ["Campaign Strategy", "Large Format Print", "Social Media Graphics", "3D Motion"],
    software: ["Adobe Photoshop", "Illustrator", "After Effects", "Midjourney AI"],
    challenge: "Ensuring visual color parity between vibrant RGB social ads and CMYK solvent-printed outdoor super-structure billboards.",
    creativeDirection: "Electric particle storms, ice condensation shaders, and bold kinetic typography shouting speed and endurance.",
    process: [
      { title: "01. Visual Concepting", description: "Designed explosive splash composites in Photoshop with AI-assisted background textures." },
      { title: "02. Billboard Prepress", description: "Generated 150 DPI 1:10 scaled billboard files with dedicated solvent ink color maps." },
      { title: "03. Social Ad Engine", description: "Produced 45+ aspect-ratio variants for Instagram Reels, TikTok, and Meta Ads." },
    ],
    finalResult: "Over 2.4M organic impressions in launch week and sold out initial retail stock run within 14 days.",
    productionBreakdown: {
      digitalArtwork: "High-res 6000x4000 composite PSDs with non-destructive smart layers",
      prepress: "Billboard scaled layout with reinforced vinyl welding & brass eyelet margins",
      printTechnology: "Roland TrueVIS Grand Format Eco-Solvent Printing (1440 DPI)",
      physicalResult: "510 GSM Frontlit Heavy-Duty Flex Banner with UV protective top-coat",
    },
    featured: true,
    colorAccent: "#10b981",
  },
  {
    slug: "synth-visions-ai-fashion-campaign",
    title: "SynthVisions AI Creative Direction & Lookbook",
    category: "AI CREATIVE",
    client: "Metamodern Atelier",
    year: "2024",
    tagline: "Futuristic editorial lookbook blending prompt engineering, digital painting, and composite retouching",
    description: "Cutting-edge AI-assisted visual campaign creating impossible haute-couture apparel landscapes and photorealistic textile renders for a seasonal lookbook.",
    thumbnail: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1200&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1800&auto=format&fit=crop",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1200&auto=format&fit=crop",
        caption: "Bespoke AI Prompt Architecture & Controlled Seed Composition",
      },
      {
        url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
        caption: "Photoshop Micro-Retouching, Frequency Separation & Grain Grading",
      },
    ],
    services: ["AI Art Direction", "Prompt Engineering", "High-End Retouching", "Editorial Layout"],
    software: ["Midjourney v6", "Adobe Photoshop", "Topaz Gigapixel", "InDesign"],
    challenge: "Eliminating AI hallucinations and artifacts to produce print-ready 300 DPI editorial images indistinguishable from million-dollar physical photoshoots.",
    creativeDirection: "Cyber-baroque aesthetics, iridescent metallic fabrics, and dramatic studio chiaroscuro lighting.",
    process: [
      { title: "01. AI Iteration & Seed Curation", description: "Engineered 400+ targeted multi-weight prompts to capture exact garment draping." },
      { title: "02. AI Upscaling & Texture Enhancement", description: "Upscaled raw outputs to 8K resolution with realistic micro-pore fabric textures." },
      { title: "03. Manual Retouching & Color Grading", description: "Refined facial features, hands, seams, and color balance in Photoshop." },
    ],
    finalResult: "Printed in a limited-edition 120-page hardcover lookbook distributed to fashion buyers in Milan and Paris.",
    featured: true,
    colorAccent: "#ec4899",
  },
  {
    slug: "luminous-night-festival-social",
    title: "Neon Horizon Music Festival Social Campaign",
    category: "SOCIAL MEDIA",
    client: "Horizon Live Asia",
    year: "2023",
    tagline: "Viral animated social grid, artist lineup reveals, and stage visuals",
    description: "Complete social media design package with 60+ kinetic story templates, feed carousels, VIP badge print files, and animated stage loop screens.",
    thumbnail: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1800&auto=format&fit=crop",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&auto=format&fit=crop",
        caption: "Lineup Reveal Carousels & Dynamic Typography Motion",
      },
      {
        url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop",
        caption: "VIP Holographic Passes & Lanyard Sublimation Artwork",
      },
    ],
    services: ["Social Media Kit", "Motion Graphics", "Lineup Art Direction", "Event Print Collateral"],
    software: ["Adobe Photoshop", "After Effects", "Illustrator", "Premiere Pro"],
    challenge: "Rapid turnaround of 30+ headliner artist announcement posters while keeping brand uniformity across all social channels.",
    creativeDirection: "Dark techno rave aesthetic, chromatic aberration effects, bold industrial typography, and glowing electric accents.",
    process: [
      { title: "01. Design System & Master Template", description: "Created smart Photoshop templates enabling 10-minute artist asset generation." },
      { title: "02. Motion Graphics & Reels", description: "Rendered energetic 9:16 animations with audio-reactive typography in After Effects." },
      { title: "03. Prepress for Passes & Merch", description: "Prepared foil-stamped holographic event passes and wristbands for print." },
    ],
    finalResult: "Festival sold out 15,000 passes in under 3 hours, with social posts reaching over 1.8M unique accounts.",
    featured: false,
    colorAccent: "#06b6d4",
  },
  {
    slug: "colombo-strikers-cricket-kit",
    title: "Colombo Strikers Franchise Match Kit",
    category: "JERSEY DESIGN",
    client: "Colombo Cricket League",
    year: "2024",
    tagline: "Professional cricket match jersey, training kit & supporter apparel",
    description: "Comprehensive apparel design from initial sketch through to factory dye-sublimation manufacturing and DTF silicone badge transfers for a premier cricket franchise.",
    thumbnail: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=1200&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=1800&auto=format&fit=crop",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=1200&auto=format&fit=crop",
        caption: "Matchday Full Kit & Gradient Halftone Transition",
      },
      {
        url: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1200&auto=format&fit=crop",
        caption: "DTF 3D Silicone Team Crest Transfer & Gold Trim",
      },
    ],
    services: ["Sportswear Design", "Sublimation Prepress", "DTF Application", "Apparel Production"],
    software: ["Adobe Illustrator", "Photoshop", "CorelDRAW"],
    challenge: "Integrating 8 sponsor logos on high-performance athletic mesh without disrupting the fierce lion emblem gradient artwork.",
    creativeDirection: "Sri Lankan heritage motifs modernised into aggressive angular velocity stripes with royal navy and metallic gold accents.",
    process: [
      { title: "01. Vector Layouts", description: "Drafted size-graded vector templates for player sizes Small to 3XL." },
      { title: "02. Color Chemistry Calibration", description: "Calibrated sublimation inks for deep navy richness under bright daytime sun." },
      { title: "03. High Precision DTF Badging", description: "Engineered heat-press transfer sheets for 3D metallic silicone sponsor badges." },
    ],
    finalResult: "Worn by professional athletes during nationwide televised tournament and 5,000+ replica jerseys sold to fans.",
    productionBreakdown: {
      digitalArtwork: "Full vector 1:1 scale grading (S to 3XL) with seam bleed allowances",
      prepress: "Mimaki RasterLink RIP with high-saturation sport profile",
      printTechnology: "Mimaki Sublimation + Pneumatic Double-Bed Heat Press",
      physicalResult: "160 GSM Micro-Eyelet Honeycomb Fabric, DTF Silicone Embellishments",
    },
    featured: false,
    colorAccent: "#3b82f6",
  },
  {
    slug: "chroma-press-corporate-brochure",
    title: "Chroma Elite Architectural Print Portfolio",
    category: "PRINTING",
    client: "Chroma Architecture Group",
    year: "2023",
    tagline: "Swiss-bound editorial portfolio with spot varnishes, Japanese paper and CMYK+Silver metallic inks",
    description: "High-end hardcover corporate architectural monograph featuring multi-fold pull-outs, layflat binding, and rigorous prepress color management.",
    thumbnail: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1800&auto=format&fit=crop",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200&auto=format&fit=crop",
        caption: "Layflat Swiss Binding & Spot UV Architectural Highlights",
      },
      {
        url: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=1200&auto=format&fit=crop",
        caption: "Pantone 877C Metallic Silver Ink on Uncoated Cotton Stock",
      },
    ],
    services: ["Editorial Design", "Prepress Color Proofing", "Print Production Oversight", "Binding Engineering"],
    software: ["Adobe InDesign", "Illustrator", "Photoshop", "Acrobat Pro DC"],
    challenge: "Preserving shadow detail in moody architectural photographs across textured uncoated cotton paper without dot gain muddiness.",
    creativeDirection: "Swiss modernist typographic grid, disciplined white space, and subtle metallic spot inks.",
    process: [
      { title: "01. 200-page Grid Layout", description: "Designed modular baseline grid in InDesign for text and panoramic photo spreads." },
      { title: "02. Prepress CMYK Separation", description: "Adjusted tone curves with GCR (Gray Component Replacement) for crisp shadow depth." },
      { title: "03. On-Press Supervision", description: "Conducted live press checks on Komori Lithrone 5-color offset press." },
    ],
    finalResult: "Won Silver at the National Print & Publishing Excellence Awards 2023.",
    productionBreakdown: {
      digitalArtwork: "PDF/X-1a:2001 certified print files with 5mm bleed and embedded ICC profiles",
      prepress: "Screen Truepress CTP thermal plate imaging at 200 LPI AM screening",
      printTechnology: "Komori Lithrone G40 Offset (CMYK + Pantone 877C Metallic Silver)",
      physicalResult: "Fedrigoni Arena Natural Rough 170 GSM + Hardcover Cloth Binding",
    },
    featured: false,
    colorAccent: "#94a3b8",
  },
];
