export interface AITool {
  name: string;
  category: string;
  logo: string;
}

// A curated snapshot of major AI model providers and creative platforms.
// Logos are bundled locally in public/images/ai-logos for reliable loading.
export const aiTools: AITool[] = [
  { name: "ChatGPT", category: "LLM • CREATIVE", logo: "/images/ai-logos/openai.svg" },
  { name: "Claude", category: "LLM • REASONING", logo: "/images/ai-logos/claude-color.svg" },
  { name: "Gemini", category: "MULTIMODAL AI", logo: "/images/ai-logos/gemini-color.svg" },
  { name: "Microsoft Copilot", category: "AI ASSISTANT", logo: "/images/ai-logos/copilot-color.svg" },
  { name: "Grok", category: "LLM • RESEARCH", logo: "/images/ai-logos/grok.svg" },
  { name: "DeepSeek", category: "REASONING MODEL", logo: "/images/ai-logos/deepseek-color.svg" },
  { name: "Qwen", category: "MULTIMODAL LLM", logo: "/images/ai-logos/qwen-color.svg" },
  { name: "Meta AI", category: "AI ASSISTANT", logo: "/images/ai-logos/metaai-color.svg" },
  { name: "Mistral AI", category: "OPEN MODEL FAMILY", logo: "/images/ai-logos/mistral-color.svg" },
  { name: "Perplexity", category: "AI SEARCH", logo: "/images/ai-logos/perplexity-color.svg" },
  { name: "Kimi", category: "LONG-CONTEXT AI", logo: "/images/ai-logos/kimi-color.svg" },
  { name: "MiniMax", category: "MULTIMODAL AI", logo: "/images/ai-logos/minimax-color.svg" },
  { name: "Z.ai • GLM", category: "REASONING MODELS", logo: "/images/ai-logos/zai.svg" },
  { name: "Hugging Face", category: "MODEL ECOSYSTEM", logo: "/images/ai-logos/huggingface-color.svg" },
  { name: "NotebookLM", category: "AI RESEARCH", logo: "/images/ai-logos/notebooklm.svg" },
  { name: "Midjourney", category: "IMAGE GENERATION", logo: "/images/ai-logos/midjourney.svg" },
  { name: "Adobe Firefly", category: "CREATIVE AI", logo: "/images/ai-logos/adobefirefly-color.svg" },
  { name: "FLUX", category: "IMAGE MODELS", logo: "/images/ai-logos/flux.svg" },
  { name: "Ideogram", category: "IMAGE GENERATION", logo: "/images/ai-logos/ideogram.svg" },
  { name: "Sora", category: "VIDEO GENERATION", logo: "/images/ai-logos/sora-color.svg" },
  { name: "Runway", category: "AI VIDEO CREATION", logo: "/images/ai-logos/runway.svg" },
  { name: "Kling AI", category: "VIDEO GENERATION", logo: "/images/ai-logos/kling-color.svg" },
  { name: "Luma AI", category: "VIDEO GENERATION", logo: "/images/ai-logos/luma-color.svg" },
  { name: "Pika", category: "AI VIDEO", logo: "/images/ai-logos/pika.svg" },
  { name: "Hailuo AI", category: "AI VIDEO", logo: "/images/ai-logos/hailuo-color.svg" },
  { name: "ElevenLabs", category: "VOICE GENERATION", logo: "/images/ai-logos/elevenlabs.svg" },
  { name: "Suno", category: "MUSIC GENERATION", logo: "/images/ai-logos/suno.svg" },
  { name: "Cursor", category: "AI CODING", logo: "/images/ai-logos/cursor.svg" },
  { name: "GitHub Copilot", category: "AI CODING", logo: "/images/ai-logos/githubcopilot.svg" },
  { name: "Ollama", category: "LOCAL AI MODELS", logo: "/images/ai-logos/ollama.svg" },
];
