"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Search, PenTool, RefreshCw, PackageCheck, ChevronDown, Layers, Globe, Repeat2 } from "lucide-react";

const steps = [
  { number: "01", title: "DISCOVER", detail: "We start with your goals, audience, references, deliverables and practical constraints.", Icon: Search },
  { number: "02", title: "DESIGN", detail: "I shape a clear creative direction and build the first visual direction around the brief.", Icon: PenTool },
  { number: "03", title: "REFINE", detail: "We review the work against the agreed scope, then refine the details that matter.", Icon: RefreshCw },
  { number: "04", title: "DELIVER", detail: "You receive the approved files and handoff notes in the formats agreed for your project.", Icon: PackageCheck },
];

const offers = [
  { name: "BRAND ESSENTIALS", detail: "For new businesses and teams that need a consistent visual foundation.", points: ["Logo and visual direction", "Core colour and typography system", "Essential brand application assets"], Icon: Layers },
  { name: "DIGITAL PRESENCE", detail: "For brands ready to present their offer clearly online.", points: ["Website design and development", "Responsive page layouts", "Foundational on-page SEO"], Icon: Globe, featured: true },
  { name: "ONGOING CREATIVE", detail: "For businesses that need reliable creative support over time.", points: ["Recurring design deliverables", "Social content and campaign assets", "A planned monthly workflow"], Icon: Repeat2 },
];

const faqs = [
  { q: "How do we get started?", a: "Send a short brief through the enquiry form or WhatsApp. Include your goal, the service you need, any references and your preferred timeline. I will reply with the next steps." },
  { q: "How long will my project take?", a: "Timing depends on the scope, complexity and feedback cycle. A realistic schedule and milestones are confirmed before work begins." },
  { q: "Are revisions included?", a: "The number and type of revisions are agreed in the project proposal before the project starts. Additional requests can be scoped separately." },
  { q: "Which files will I receive?", a: "Deliverables are agreed upfront. Depending on the service, these may include print-ready exports, web assets and editable source files." },
  { q: "Can you work with clients outside Sri Lanka?", a: "Yes. Projects can be handled remotely with written briefs, scheduled updates and digital delivery across time zones." },
  { q: "How does payment work?", a: "Payment milestones and accepted methods are confirmed in the proposal before work begins. No work is scheduled until the agreed starting payment is received." },
];

export function ProcessFaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  return (
    <section id="process" className="relative overflow-hidden border-t border-white/5 bg-[#08080a] px-4 py-24 sm:px-6 lg:px-12">
      <div className="pointer-events-none absolute -right-40 top-24 h-96 w-96 rounded-full bg-red-600/10 blur-[130px]" />
      <div className="relative mx-auto max-w-7xl space-y-20">
        <div className="max-w-3xl">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-red-400">// THE WORKFLOW</p>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl">A CLEAR PROCESS. <span className="text-red-500">BETTER WORK.</span></h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">Good creative work needs more than a good first idea. Every engagement moves through a clear, collaborative process.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({number,title,detail,Icon},index)=>(
            <motion.article key={number} initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:0.2}} transition={{duration:0.45,delay:index*0.06}} className="group relative rounded-2xl border border-white/10 bg-white/[0.025] p-6 transition-colors hover:border-red-500/35 hover:bg-red-950/10">
              <div className="flex items-center justify-between"><span className="font-mono text-xs tracking-widest text-red-400">{number} / 04</span><Icon className="h-5 w-5 text-zinc-500 transition-colors group-hover:text-red-400" aria-hidden="true"/></div>
              <h3 className="mt-8 font-display text-lg font-extrabold tracking-wide text-white">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-400">{detail}</p>
              {index<3&&<span aria-hidden="true" className="absolute -right-2 top-1/2 z-10 hidden h-4 w-4 rotate-45 border-r border-t border-red-500/40 bg-[#0c0c10] lg:block"/>}
            </motion.article>
          ))}
        </div>

        <div id="packages" className="scroll-mt-28 space-y-8">
          <div className="max-w-3xl"><p className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-red-400">// WAYS TO WORK TOGETHER</p><h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl">THE RIGHT SUPPORT <span className="text-red-500">FOR YOUR NEXT STEP.</span></h2><p className="mt-4 text-sm leading-7 text-zinc-400 sm:text-base">Engagements are tailored to the brief. Share what you need and receive a clear scope before committing.</p></div>
          <div className="grid gap-4 lg:grid-cols-3">
            {offers.map(({name,detail,points,Icon,featured})=>(
              <article key={name} className={`relative flex flex-col rounded-3xl border p-7 ${featured?"border-red-500/50 bg-gradient-to-b from-red-950/30 to-[#0b0b0e] shadow-[0_20px_70px_-35px_rgba(229,9,20,0.45)]":"border-white/10 bg-white/[0.025]"}`}>
                {featured&&<span className="absolute right-5 top-5 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 font-mono text-[9px] font-bold tracking-widest text-red-300">POPULAR SCOPE</span>}
                <Icon className="h-6 w-6 text-red-400" aria-hidden="true"/><h3 className="mt-6 font-display text-xl font-extrabold text-white">{name}</h3><p className="mt-3 min-h-12 text-sm leading-6 text-zinc-400">{detail}</p>
                <ul className="my-7 flex-1 space-y-3">{points.map(point=><li key={point} className="flex gap-3 text-sm text-zinc-300"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500"/>{point}</li>)}</ul>
                <p className="mb-4 font-mono text-[10px] uppercase tracking-wider text-zinc-500">Custom scope • Quote on request</p><a href="#contact" className="inline-flex items-center justify-between rounded-full border border-red-500/30 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-red-600 hover:border-red-500">DISCUSS THIS SCOPE <ArrowUpRight className="h-4 w-4 text-red-400"/></a>
              </article>
            ))}
          </div>
        </div>

        <div id="faq" className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] scroll-mt-28">
          <div><p className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-red-400">// GOOD TO KNOW</p><h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl">QUESTIONS, <span className="text-red-500">ANSWERED.</span></h2><p className="mt-4 max-w-sm text-sm leading-7 text-zinc-400">A few practical details to make the first conversation easier.</p><a href="#contact" className="mt-7 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-300 hover:text-white">Still have a question? Contact me <ArrowUpRight className="h-4 w-4"/></a></div>
          <div className="divide-y divide-white/10 border-y border-white/10">{faqs.map((faq,index)=>{const isOpen=openFaq===index;return <div key={faq.q} className="py-1"><button type="button" aria-expanded={isOpen} aria-controls={`faq-answer-${index}`} onClick={()=>setOpenFaq(isOpen?null:index)} className="flex w-full items-center justify-between gap-5 py-5 text-left"><span className="font-display text-base font-bold text-white sm:text-lg">{faq.q}</span><ChevronDown className={`h-5 w-5 shrink-0 text-red-400 transition-transform ${isOpen?"rotate-180":""}`} aria-hidden="true"/></button><AnimatePresence initial={false}>{isOpen&&<motion.div id={`faq-answer-${index}`} initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}} transition={{duration:0.22}} className="overflow-hidden"><p className="max-w-2xl pb-5 pr-8 text-sm leading-7 text-zinc-400">{faq.a}</p></motion.div>}</AnimatePresence></div>})}</div>
        </div>
      </div>
    </section>
  );
}
