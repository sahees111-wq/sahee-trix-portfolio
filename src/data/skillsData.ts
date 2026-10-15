export interface SkillTool {
  id: string;
  name: string;
  category: "Adobe Creative Cloud" | "Vector & Layout" | "Motion & Video" | "Next-Gen AI & Quick Media";
  iconName: string;
  tagline: string;
  productionUse: string;
  capabilities: string[];
  accentColor: string;
  proficiencyLevel: "Master" | "Expert" | "Advanced";
}

export const skillsData: SkillTool[] = [
  {
    id: "illustrator",
    name: "Adobe Illustrator",
    category: "Adobe Creative Cloud",
    iconName: "PenTool",
    tagline: "Precision vector illustration, logo architecture & complex pattern design",
    productionUse: "Used for crafting 100% vector brand assets, typography lockups, detailed apparel pattern drafting, dielines, and spot-color prepress separations.",
    capabilities: ["Vector Patterning", "Apparel Dielines", "Complex Gradient Meshes", "Typography Crafting", "SVG Optimization"],
    accentColor: "#ff9a00",
    proficiencyLevel: "Master",
  },
  {
    id: "photoshop",
    name: "Adobe Photoshop",
    category: "Adobe Creative Cloud",
    iconName: "Image",
    tagline: "High-end compositing, frequency separation retouching & color grading",
    productionUse: "Utilized for complex 32-bit compositing, photorealistic jersey mockups, matte painting, print-ready CMYK conversion, and precision texture blending.",
    capabilities: ["Non-Destructive Compositing", "CMYK Tone Curves", "Frequency Separation Retouch", "Mockup Automation", "Raw Processing"],
    accentColor: "#31a8ff",
    proficiencyLevel: "Master",
  },
  {
    id: "indesign",
    name: "Adobe InDesign",
    category: "Adobe Creative Cloud",
    iconName: "BookOpen",
    tagline: "Multi-page editorial architecture, master pages & PDF/X print export",
    productionUse: "Used for multi-page corporate reports, brand guidelines books, lookbooks, and high-volume catalogs with strict baseline grid alignment.",
    capabilities: ["Master Page Layouts", "Automated Folios & Tables", "PDF/X-1a Certified Prepress", "Grep Styling", "Packaging Booklets"],
    accentColor: "#ff3366",
    proficiencyLevel: "Expert",
  },
  {
    id: "after-effects",
    name: "Adobe After Effects",
    category: "Motion & Video",
    iconName: "Film",
    tagline: "Kinetic typography, logo reveals & social motion graphics",
    productionUse: "Transforms static branding into animated visual identities, reels motion graphics, dynamic HUD elements, and digital out-of-home video loops.",
    capabilities: ["Kinetic Typography", "Logo Stings & Intros", "Particle Systems", "Lottie Vector Animations", "VFX Compositing"],
    accentColor: "#9999ff",
    proficiencyLevel: "Expert",
  },
  {
    id: "premiere-pro",
    name: "Adobe Premiere Pro",
    category: "Motion & Video",
    iconName: "Video",
    tagline: "Fast-paced video editing, dynamic cuts & commercial audio syncing",
    productionUse: "Used for cutting high-energy promotional teasers, social media campaign videos, customer story reels, and behind-the-scenes print production films.",
    capabilities: ["Multi-Cam Assembly", "Lumetri Color Grading", "Sound Design & Sync", "Aspect Ratio Reframing", "High-Bitrate Export"],
    accentColor: "#ea77ff",
    proficiencyLevel: "Advanced",
  },
  {
    id: "coreldraw",
    name: "CorelDRAW",
    category: "Vector & Layout",
    iconName: "Layers",
    tagline: "Industrial printing prepress, cutter plotting & sign making",
    productionUse: "Essential for direct-to-machine RIP integration, vinyl cutting plots, sublimation nesting, large-format sign layouts, and legacy factory vector files.",
    capabilities: ["Large Format Signage Layout", "Vinyl Plotter Paths", "Nesting for Sheet Printing", "RIP Interfacing", "Technical Line Art"],
    accentColor: "#22c55e",
    proficiencyLevel: "Master",
  },
  {
    id: "ai-tools",
    name: "AI Creative Suite (Midjourney / Topaz / SD)",
    category: "Next-Gen AI & Quick Media",
    iconName: "Sparkles",
    tagline: "Prompt engineering, generative concepting & 8K AI texture upscaling",
    productionUse: "Supercharging concept ideation, synthesizing photorealistic campaign backgrounds, generative fashion textiles, and upscaling low-res client assets into 300 DPI print-ready quality.",
    capabilities: ["Multi-Prompt Weighting", "Seed Control & Inpainting", "Topaz 8K Upscaling", "Texture Synthesis", "Rapid Moodboarding"],
    accentColor: "#00e5ff",
    proficiencyLevel: "Master",
  },
  {
    id: "canva-express",
    name: "Adobe Express & Canva Pro",
    category: "Next-Gen AI & Quick Media",
    iconName: "Zap",
    tagline: "Rapid social deployment, brand kit delegation & client templates",
    productionUse: "Building turn-key editable client brand kits, rapid social story prototypes, team collaboration templates, and lightning-fast social assets.",
    capabilities: ["Client Editable Kits", "Batch Social Creation", "Instant Aspect Resizing", "Cloud Collaboration", "Asset Library Setup"],
    accentColor: "#00c4cc",
    proficiencyLevel: "Master",
  },
];
