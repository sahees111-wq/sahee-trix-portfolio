import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CheckCircle2, ExternalLink } from "lucide-react";
import { portfolioProjects } from "@/data/portfolioData";
import { optimizeImageUrl } from "@/lib/imageOptimization";

const siteUrl = "https://saheetrix.com";

type CaseStudyPageProps = {
  params: {
    slug: string;
  };
};

export const dynamicParams = false;

export function generateStaticParams() {
  return portfolioProjects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: CaseStudyPageProps): Metadata {
  const project = portfolioProjects.find((item) => item.slug === params.slug);

  if (!project) return {};

  return {
    title: `${project.title} | ${project.services[0]} Case Study`,
    description: project.description,
    alternates: {
      canonical: `/work/${project.slug}`,
    },
    openGraph: {
      type: "article",
      url: `${siteUrl}/work/${project.slug}`,
      title: `${project.title} | SAHEETRIX`,
      description: project.description,
      images: [
        {
          url: project.heroImage.startsWith("http")
            ? optimizeImageUrl(project.heroImage, 1600)
            : `${siteUrl}${project.heroImage}`,
          alt: `${project.title} — ${project.services.join(", ")}`,
        },
      ],
    },
  };
}

export default function CaseStudyPage({ params }: CaseStudyPageProps) {
  const project = portfolioProjects.find((item) => item.slug === params.slug);

  if (!project) notFound();

  const heroImage = project.heroImage.startsWith("http")
    ? optimizeImageUrl(project.heroImage, 1800)
    : project.heroImage;
  const projectUrl = `${siteUrl}/work/${project.slug}`;
  const output = project.productionBreakdown?.digitalArtwork || project.services.join(" • ");
  const technicalExecution =
    project.productionBreakdown?.prepress ||
    "Production-ready vector artwork, preflight checks, color-managed output, and factory handoff documentation.";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${projectUrl}/#case-study`,
    url: projectUrl,
    name: project.title,
    headline: `${project.title} — ${project.services[0]}`,
    description: project.description,
    creator: {
      "@type": "Person",
      name: "Tharmaraja Saheevan",
      alternateName: "SAHEETRIX",
      url: siteUrl,
    },
    about: project.services,
    keywords: [
      ...project.services,
      ...project.software,
      "sportswear design",
      "sublimation prepress",
      "print-ready production",
    ],
    image: heroImage.startsWith("http") ? heroImage : `${siteUrl}${heroImage}`,
  };

  return (
    <main className="min-h-screen bg-[#08080a] text-zinc-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-zinc-300 transition-colors hover:text-[#00e5ff]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to selected work
          </Link>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#00e5ff]">
            SAHEETRIX / CASE STUDY
          </span>
        </div>

        <header className="grid gap-10 pb-16 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#00e5ff]">
              {project.category} • {project.year}
            </span>
            <h1 className="mt-5 max-w-4xl font-display text-4xl font-extrabold leading-[0.98] tracking-tight text-white sm:text-6xl">
              {project.title}
              <span className="mt-3 block bg-gradient-to-r from-[#00e5ff] via-[#8b5cf6] to-[#ec4899] bg-clip-text text-2xl text-transparent sm:text-4xl">
                {project.services[0]}
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg">
              {project.description}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-md">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-400">
                Project specifications
              </span>
              <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            </div>
            <dl className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Client</dt>
                <dd className="mt-1 font-semibold text-white">{project.client}</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Tools used</dt>
                <dd className="mt-1 font-semibold text-white">{project.software.join(", ")}</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Services</dt>
                <dd className="mt-1 font-semibold text-white">{project.services.join(", ")}</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Output</dt>
                <dd className="mt-1 font-semibold text-white">{output}</dd>
              </div>
            </dl>
          </div>
        </header>

        <figure className="overflow-hidden rounded-3xl border border-white/10 bg-black/40 shadow-2xl">
          <Image
            src={heroImage}
            alt={`${project.title} — ${project.services.join(", ")} production visual`}
            width={1800}
            height={1100}
            priority
            className="h-auto max-h-[720px] w-full object-cover"
          />
          <figcaption className="border-t border-white/10 px-5 py-4 font-mono text-xs uppercase tracking-wider text-zinc-400">
            {project.tagline}
          </figcaption>
        </figure>

        <section className="grid gap-10 py-20 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#8b5cf6]">
              The brief &amp; technical execution
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              From brief to factory-ready output.
            </h2>
          </div>
          <div className="space-y-5 text-base leading-relaxed text-zinc-300">
            <p>{project.challenge}</p>
            <p>{project.creativeDirection}</p>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#00e5ff]">
                Prepress &amp; handoff
              </span>
              <p className="mt-2 text-sm text-zinc-200">{technicalExecution}</p>
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 py-16">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#ec4899]">
                Execution &amp; process
              </span>
              <h2 className="mt-3 font-display text-3xl font-extrabold text-white sm:text-4xl">
                A production workflow built for precision.
              </h2>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {project.process.map((step) => (
              <article key={step.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <h3 className="font-display text-lg font-bold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-t border-white/10 py-16">
          <div className="mb-8">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#00e5ff]">
              Visual artifacts
            </span>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-white sm:text-4xl">
              Artwork, mockup, and final output.
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {project.gallery.map((image, index) => {
              const imageUrl = image.url.startsWith("http")
                ? optimizeImageUrl(image.url, 1200)
                : image.url;

              return (
                <figure key={image.url} className="overflow-hidden rounded-2xl border border-white/10 bg-black/40">
                  <Image
                    src={imageUrl}
                    alt={`${image.caption} — ${project.title}`}
                    width={1200}
                    height={900}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <figcaption className="p-4 font-mono text-[11px] leading-relaxed text-zinc-300">
                    {image.caption}
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </section>

        <section className="mb-20 rounded-3xl border border-[#00e5ff]/20 bg-gradient-to-br from-[#00e5ff]/10 via-[#8b5cf6]/5 to-transparent p-8 sm:p-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.22em] text-[#00e5ff]">
                Final result
              </span>
              <p className="mt-4 max-w-3xl text-xl leading-relaxed text-white">
                {project.finalResult}
              </p>
            </div>
            <Link
              href="/#contact"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#00e5ff] px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-black transition-transform hover:scale-105"
            >
              Start a project
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 py-8">
          <Link href="/" className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-400 hover:text-white">
            SAHEETRIX
          </Link>
          <a
            href={projectUrl}
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-zinc-500 hover:text-[#00e5ff]"
          >
            Canonical case study URL
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </footer>
      </div>
    </main>
  );
}
