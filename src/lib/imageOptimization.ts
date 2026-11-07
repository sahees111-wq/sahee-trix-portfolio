export function optimizeImageUrl(source: string, width: number): string {
  if (!source.startsWith("http")) return source;

  try {
    const url = new URL(source);

    if (url.hostname.includes("images.unsplash.com")) {
      url.searchParams.set("fm", "webp");
      url.searchParams.set("q", "76");
      url.searchParams.set("fit", "max");
      url.searchParams.set("w", String(width));
    }

    return url.toString();
  } catch {
    return source;
  }
}
