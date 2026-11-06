"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MousePointer2, Play, RotateCcw, Sparkles, X, Zap } from "lucide-react";

type Phase = "idle" | "building" | "done";
type TaskKind = "rect" | "text" | "media" | "line";

type BlueprintTask = {
  id: string;
  kind: TaskKind;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

type Viewport = { width: number; height: number };
type Point = { x: number; y: number };

const SWARM_COLORS = ["#ff334d", "#00e5ff", "#a78bfa", "#fbbf24", "#34d399", "#fb7185"];

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function readBlueprint(viewport: Viewport): BlueprintTask[] {
  const selector = "header, nav, main > section, h1, h2, h3, img, button, a[href^='#']";
  const elements = Array.from(document.querySelectorAll(selector)).filter(
    (element) => !element.closest("[data-swarm-ui]")
  );
  const seen = new Set<string>();
  const tasks: BlueprintTask[] = [];

  elements.forEach((element, index) => {
    if (tasks.length >= 30) return;
    const rect = element.getBoundingClientRect();
    const visible = rect.width > 6 && rect.height > 6 && rect.bottom > 0 && rect.top < viewport.height;
    if (!visible) return;

    const key = `${Math.round(rect.left / 10)}:${Math.round(rect.top / 10)}:${Math.round(rect.width / 10)}:${Math.round(rect.height / 10)}`;
    if (seen.has(key)) return;
    seen.add(key);

    const tag = element.tagName.toLowerCase();
    const text = (element.textContent || "").replace(/\s+/g, " ").trim();
    const kind: TaskKind = tag === "img" ? "media" : tag === "h1" || tag === "h2" || tag === "h3" || tag === "a" || tag === "button" ? "text" : tag === "nav" || tag === "header" ? "line" : "rect";
    const x = clamp(Math.round(rect.left), 12, Math.max(12, viewport.width - 48));
    const y = clamp(Math.round(rect.top), 70, Math.max(70, viewport.height - 36));

    tasks.push({
      id: `${tag}-${index}`,
      kind,
      label: text.slice(0, 34) || `${tag.toUpperCase()} / ${String(index + 1).padStart(2, "0")}`,
      x,
      y,
      width: Math.max(42, Math.round(Math.min(rect.width, viewport.width - x - 12))),
      height: Math.max(18, Math.round(Math.min(rect.height, viewport.height - y - 18))),
    });
  });

  if (tasks.length > 0) return tasks;

  return [
    { id: "fallback-nav", kind: "line", label: "SAHEETRIX / NAVIGATION", x: 28, y: 84, width: viewport.width - 56, height: 44 },
    { id: "fallback-hero", kind: "rect", label: "HERO / CREATIVE SYSTEMS", x: 28, y: 168, width: viewport.width * 0.58, height: 240 },
    { id: "fallback-media", kind: "media", label: "PORTRAIT / VISUAL", x: viewport.width * 0.68, y: 168, width: viewport.width * 0.24, height: 240 },
    { id: "fallback-copy", kind: "text", label: "GRAPHIC DESIGN / WEB / MARKETING", x: 28, y: 438, width: viewport.width * 0.62, height: 42 },
  ];
}

export function SwarmRebuild() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [speed, setSpeed] = useState(2);
  const [completedCount, setCompletedCount] = useState(0);
  const [blueprint, setBlueprint] = useState<BlueprintTask[]>([]);
  const [mouse, setMouse] = useState<Point>({ x: 480, y: 320 });
  const [viewport, setViewport] = useState<Viewport>({ width: 960, height: 720 });

  const swarm = useMemo(
    () =>
      Array.from({ length: 13 }, (_, index) => ({
        id: index,
        color: SWARM_COLORS[index % SWARM_COLORS.length],
        angle: (index / 13) * Math.PI * 2,
        radius: 42 + (index % 4) * 14,
      })),
    []
  );

  const startRebuild = useCallback(() => {
    const nextViewport = { width: window.innerWidth, height: window.innerHeight };
    window.scrollTo({ top: 0, behavior: "auto" });
    setViewport(nextViewport);
    setMouse({ x: nextViewport.width / 2, y: nextViewport.height / 2 });
    setBlueprint(readBlueprint(nextViewport));
    setCompletedCount(0);
    setSpeed(2);
    setPhase("building");
  }, []);

  const replay = useCallback(() => {
    setCompletedCount(0);
    setSpeed(2);
    setPhase("building");
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.altKey && event.shiftKey && event.key.toLowerCase() === "s") {
        event.preventDefault();
        if (phase === "idle") startRebuild();
      }
      if (event.key === "Escape" && phase !== "idle") setPhase("idle");
    };

    const onResize = () => setViewport({ width: window.innerWidth, height: window.innerHeight });
    const onPointerMove = (event: PointerEvent) => {
      if (phase === "done") setMouse({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointerMove);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [phase, startRebuild]);

  useEffect(() => {
    if (phase === "idle") return;
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "building" || blueprint.length === 0 || completedCount >= blueprint.length) return;
    const timer = window.setInterval(() => {
      setCompletedCount((current) => Math.min(current + 1, blueprint.length));
    }, 260 / speed);
    return () => window.clearInterval(timer);
  }, [blueprint.length, completedCount, phase, speed]);

  useEffect(() => {
    if (phase !== "building" || blueprint.length === 0 || completedCount < blueprint.length) return;
    const timer = window.setTimeout(() => setPhase("done"), 420 / speed);
    return () => window.clearTimeout(timer);
  }, [blueprint.length, completedCount, phase, speed]);

  const activeTask = blueprint[Math.min(completedCount, Math.max(blueprint.length - 1, 0))];
  const target = phase === "done"
    ? mouse
    : activeTask
      ? { x: activeTask.x + activeTask.width / 2, y: activeTask.y + activeTask.height / 2 }
      : { x: viewport.width / 2, y: viewport.height / 2 };
  const progress = blueprint.length ? Math.round((completedCount / blueprint.length) * 100) : 0;

  return (
    <>
      <AnimatePresence>
        {phase === "idle" && (
          <motion.button
            data-swarm-ui
            type="button"
            onClick={startRebuild}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="fixed bottom-6 left-5 z-[10000] inline-flex items-center gap-2 rounded-full border border-red-500/50 bg-[#0a0a0e]/90 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white shadow-[0_0_24px_rgba(229,9,20,0.35)] backdrop-blur-xl"
            aria-label="Start Swarm Rebuild animation"
          >
            <span className="relative flex h-5 w-5 items-center justify-center rounded-full border border-red-400/80 text-red-400">
              <Sparkles className="h-3 w-3" />
              <span className="absolute -inset-1 animate-ping rounded-full border border-red-500/30" />
            </span>
            <span>Swarm / Rebuild</span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase !== "idle" && (
          <motion.div
            data-swarm-ui
            className="fixed inset-0 z-[10000] overflow-hidden bg-[#08080a] text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            onWheel={() => setSpeed((current) => Math.min(3, current + 0.05))}
          >
            <div className="pointer-events-none absolute inset-0 opacity-40" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.055) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.055) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(229,9,20,.16),transparent_38%)]" />

            <div className="absolute left-5 right-5 top-5 z-20 flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-400 sm:left-8 sm:right-8">
              <div className="flex items-center gap-3"><span className="h-2 w-2 animate-pulse rounded-full bg-red-500" /> SAHEETRIX / SWARM REBUILD</div>
              <div className="hidden items-center gap-4 sm:flex"><span>{phase === "done" ? "BUILD COMPLETE" : `BUILDING ${progress}%`}</span><span className="text-red-400">ESC TO EXIT</span></div>
              <button type="button" onClick={() => setPhase("idle")} className="pointer-events-auto rounded-full border border-white/10 p-2 text-zinc-400 transition hover:border-red-400/60 hover:text-white" aria-label="Close swarm rebuild"><X className="h-4 w-4" /></button>
            </div>

            <div className="absolute left-5 right-5 top-16 z-20 h-px bg-white/10 sm:left-8 sm:right-8"><motion.div className="h-full origin-left bg-gradient-to-r from-red-500 via-rose-400 to-cyan-300" animate={{ scaleX: progress / 100 }} /></div>

            {blueprint.map((task, index) => {
              const visible = index < completedCount;
              return (
                <motion.div
                  key={task.id}
                  className="absolute overflow-hidden rounded-[3px] border border-red-300/50 bg-red-500/[0.045]"
                  style={{ left: task.x, top: task.y, width: task.width, height: task.height }}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.36 / speed, ease: "easeOut" }}
                >
                  <span className="absolute left-1 top-0.5 font-mono text-[8px] tracking-widest text-red-300/70">{String(index + 1).padStart(2, "0")}</span>
                  {task.kind === "media" ? (
                    <div className="flex h-full w-full items-center justify-center bg-[repeating-linear-gradient(135deg,rgba(255,255,255,.07)_0_8px,transparent_8px_16px)]"><span className="font-mono text-[9px] uppercase tracking-widest text-cyan-200/80">{task.label}</span></div>
                  ) : task.kind === "line" ? (
                    <div className="h-full w-full border-y border-dashed border-cyan-300/60"><span className="absolute left-2 top-1/2 -translate-y-1/2 font-mono text-[9px] uppercase tracking-widest text-cyan-100/80">{task.label}</span></div>
                  ) : task.kind === "text" ? (
                    <div className="flex h-full items-center px-2"><motion.span className="block overflow-hidden whitespace-nowrap font-mono text-[10px] uppercase tracking-widest text-white/90" initial={{ width: 0 }} animate={visible ? { width: "100%" } : { width: 0 }} transition={{ duration: 0.52 / speed, delay: 0.05 }}>{task.label}</motion.span><span className="ml-1 h-3 w-px animate-pulse bg-red-400" /></div>
                  ) : (
                    <div className="h-full w-full border border-dashed border-white/20"><span className="absolute bottom-1 right-1 font-mono text-[8px] text-zinc-400">{Math.round(task.width)} × {Math.round(task.height)}</span></div>
                  )}
                </motion.div>
              );
            })}

            {swarm.map((agent) => {
              const x = target.x + Math.cos(agent.angle + completedCount * 0.14) * agent.radius;
              const y = target.y + Math.sin(agent.angle + completedCount * 0.14) * agent.radius;
              return (
                <motion.div
                  key={agent.id}
                  className="pointer-events-none absolute left-0 top-0 h-7 w-7 -translate-x-1/2 -translate-y-1/2"
                  animate={{ x, y, rotate: [0, 8, -8, 0] }}
                  transition={{ x: { duration: 0.85 / speed, ease: "easeOut" }, y: { duration: 0.85 / speed, ease: "easeOut" }, rotate: { duration: 1.6 / speed, repeat: Infinity, ease: "easeInOut", delay: agent.id * 0.04 } }}
                >
                  <MousePointer2 className="h-5 w-5 drop-shadow-[0_0_8px_currentColor]" style={{ color: agent.color, fill: agent.color }} />
                  <span className="absolute left-4 top-4 rounded-sm bg-black/80 px-1 font-mono text-[7px] text-white/80">{String(agent.id + 1).padStart(2, "0")}</span>
                </motion.div>
              );
            })}

            <motion.div className="pointer-events-none absolute left-0 top-0 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/80" animate={{ x: target.x, y: target.y, scale: [1, 1.18, 1] }} transition={{ x: { duration: 0.5 / speed }, y: { duration: 0.5 / speed }, scale: { duration: 1.2, repeat: Infinity } }}><span className="absolute left-1/2 top-1/2 h-px w-16 -translate-x-1/2 bg-white/50" /><span className="absolute left-1/2 top-1/2 h-16 w-px -translate-y-1/2 bg-white/50" /></motion.div>

            <div className="absolute bottom-5 left-5 right-5 z-20 flex flex-col gap-3 sm:bottom-8 sm:left-8 sm:right-8 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-sm"><p className="font-mono text-[10px] uppercase tracking-[0.16em] text-red-300">{phase === "done" ? "THE SWARM HAS A FINISHED PAGE" : "LIVE BLUEPRINT / CURSORS ARE BUILDING"}</p><p className="mt-1 text-sm text-zinc-400">{phase === "done" ? "Move your mouse — the cursors flock to it." : "Scroll or change speed to call more agents."}</p></div>
              {phase === "building" ? (
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/50 p-1 backdrop-blur-xl">
                  {[1, 2, 3].map((value) => <button key={value} type="button" onClick={() => setSpeed(value)} className={`rounded-full px-3 py-1.5 font-mono text-[10px] transition ${Math.round(speed) === value ? "bg-red-500 text-white" : "text-zinc-500 hover:text-white"}`}>{value}×</button>)}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  <button type="button" onClick={replay} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/50 px-4 py-2.5 font-mono text-[10px] uppercase tracking-widest text-white transition hover:border-red-400"><RotateCcw className="h-3.5 w-3.5" /> Replay</button>
                  <button type="button" onClick={() => setPhase("idle")} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-red-500 to-rose-600 px-4 py-2.5 font-mono text-[10px] uppercase tracking-widest text-white shadow-[0_0_22px_rgba(229,9,20,.35)] transition hover:scale-[1.03]"><Play className="h-3.5 w-3.5 fill-current" /> Go live</button>
                </div>
              )}
            </div>

            <div className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-zinc-500 sm:flex"><Zap className="h-3 w-3 text-amber-300" /> {speed.toFixed(1)}× / {completedCount} layers / {swarm.length} agents</div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

