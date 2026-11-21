"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, ArrowRight, ArrowUp, ArrowDown, Gamepad2, Trophy, RotateCcw,
  Play, Pause, Sparkles, Brain, Zap, Grid3X3, Palette, Apple, Crown,
  MousePointer2, ChevronLeft, Home, WandSparkles,
} from "lucide-react";
import { ChessGame } from "./ChessGame";

type GameId = "snake" | "chess" | "memory" | "2048" | "reaction" | "pixel";
type GameInfo = { id: GameId; title: string; genre: string; description: string; icon: typeof Gamepad2; accent: string; };
const GAMES: GameInfo[] = [
  { id:"snake",title:"Neon Snake",genre:"ARCADE CLASSIC",description:"Eat the glowing cores, grow longer and don't crash into yourself.",icon:Gamepad2,accent:"red" },
  { id:"chess",title:"Chess Arena",genre:"STRATEGY • 2 PLAYER",description:"A proper local chess match. Outsmart your opponent and protect your king.",icon:Crown,accent:"rose" },
  { id:"memory",title:"Memory Flip",genre:"BRAIN TRAINER",description:"Flip the cards, find matching pairs and beat your move count.",icon:Brain,accent:"red" },
  { id:"2048",title:"2048 Rush",genre:"NUMBER PUZZLE",description:"Combine matching tiles, build bigger numbers and reach 2048.",icon:Grid3X3,accent:"orange" },
  { id:"reaction",title:"Reaction Lab",genre:"SPEED CHALLENGE",description:"Wait for the signal. Tap at the perfect moment. How fast are you?",icon:Zap,accent:"rose" },
  { id:"pixel",title:"Pixel Studio",genre:"CREATIVE PLAYGROUND",description:"Make tiny pixel-art creations with a neon palette. Your canvas, your rules.",icon:Palette,accent:"red" },
];

function ActionButton({children,onClick,variant="primary",disabled=false}:{children:React.ReactNode;onClick:()=>void;variant?:"primary"|"ghost";disabled?:boolean}) {
  return <button type="button" disabled={disabled} onClick={onClick} className={`inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 font-mono text-[10px] font-bold uppercase tracking-wider transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 ${variant==="primary"?"bg-red-600 text-white shadow-[0_0_20px_rgba(229,9,20,0.22)] hover:bg-red-500":"border border-white/10 bg-white/[0.03] text-zinc-300 hover:border-red-500/40 hover:text-white"}`}>{children}</button>;
}

function SnakeGame(){
  type Point={x:number;y:number}; type Direction="up"|"down"|"left"|"right";
  const size=16,initial:Point[]=[{x:7,y:8},{x:6,y:8},{x:5,y:8}];
  const [snake,setSnake]=useState<Point[]>(initial),snakeRef=useRef<Point[]>(initial);
  const [food,setFood]=useState<Point>({x:11,y:8}),foodRef=useRef<Point>({x:11,y:8});
  const [direction,setDirection]=useState<Direction>("right"),directionRef=useRef<Direction>("right");
  const [score,setScore]=useState(0),[playing,setPlaying]=useState(false),[over,setOver]=useState(false);
  const spawn=(body:Point[])=>{let p:Point;do{p={x:Math.floor(Math.random()*size),y:Math.floor(Math.random()*size)}}while(body.some(s=>s.x===p.x&&s.y===p.y));return p;};
  const turn=(next:Direction)=>{const current=directionRef.current;const opposite:Record<Direction,Direction>={up:"down",down:"up",left:"right",right:"left"};if(opposite[current]===next)return;directionRef.current=next;setDirection(next);};
  const restart=()=>{const body=[...initial.map(p=>({...p}))];snakeRef.current=body;setSnake(body);const f=spawn(body);foodRef.current=f;setFood(f);directionRef.current="right";setDirection("right");setScore(0);setOver(false);setPlaying(true);};
  useEffect(()=>{if(!playing||over)return;const timer=window.setInterval(()=>{
    const dir=directionRef.current,body=snakeRef.current,head=body[0];
    const next={x:head.x+(dir==="right"?1:dir==="left"?-1:0),y:head.y+(dir==="down"?1:dir==="up"?-1:0)};
    const eating=next.x===foodRef.current.x&&next.y===foodRef.current.y;
    const collisionBody=eating?body:body.slice(0,-1);
    if(next.x<0||next.x>=size||next.y<0||next.y>=size||collisionBody.some(p=>p.x===next.x&&p.y===next.y)){setPlaying(false);setOver(true);return;}
    const updated=[next,...body.slice(0,eating?body.length:body.length-1)];snakeRef.current=updated;setSnake(updated);
    if(eating){setScore(s=>s+10);const f=spawn(updated);foodRef.current=f;setFood(f);}
  },125);return()=>window.clearInterval(timer);},[playing,over]);
  useEffect(()=>{const key=(e:KeyboardEvent)=>{const map:Record<string,Direction>={ArrowUp:"up",w:"up",ArrowDown:"down",s:"down",ArrowLeft:"left",a:"left",ArrowRight:"right",d:"right"};const next=map[e.key];if(next){e.preventDefault();turn(next);}if(e.code==="Space"&&over){e.preventDefault();restart();}};window.addEventListener("keydown",key);return()=>window.removeEventListener("keydown",key);});
  return <div className="grid gap-5 lg:grid-cols-[minmax(280px,440px)_1fr]">
    <div className="mx-auto w-full max-w-[440px]">
      <div className="mb-3 flex items-center justify-between"><div><span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">SCORE</span><div className="font-display text-2xl font-extrabold text-white">{score.toString().padStart(4,"0")}</div></div><div className="rounded-xl border border-red-500/20 bg-red-950/25 px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-red-200">{over?"GAME OVER":playing?"RUNNING":"READY"}</div></div>
      <div className="grid aspect-square grid-cols-16 gap-[2px] rounded-2xl border border-red-500/25 bg-[#09090c] p-2 shadow-[0_20px_60px_-30px_rgba(229,9,20,0.5)]" style={{gridTemplateColumns:"repeat(16,minmax(0,1fr))"}}>
        {Array.from({length:size*size},(_,i)=>{const x=i%size,y=Math.floor(i/size),isHead=snake[0]?.x===x&&snake[0]?.y===y,isBody=snake.some((p,j)=>j>0&&p.x===x&&p.y===y),isFood=food.x===x&&food.y===y;return <div key={i} className={`aspect-square rounded-[3px] ${isHead?"bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]":isBody?"bg-red-500 shadow-[0_0_9px_rgba(239,68,68,0.45)]":isFood?"bg-amber-300 shadow-[0_0_12px_rgba(252,211,77,0.8)]":"bg-white/[0.035]"}`}/>;})}
      </div>
      <div className="mt-4 flex flex-wrap justify-center gap-2"><ActionButton onClick={restart}><RotateCcw className="h-3.5 w-3.5"/> {over?"Play again":playing?"Restart":"Start game"}</ActionButton><ActionButton variant="ghost" onClick={()=>setPlaying(p=>!p)} disabled={over||snake.length===0}>{playing?<><Pause className="h-3.5 w-3.5"/> Pause</>:<><Play className="h-3.5 w-3.5"/> Resume</>}</ActionButton></div>
    </div>
    <aside className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-red-400">// HOW TO PLAY</p><h3 className="mt-2 font-display text-xl font-extrabold text-white">Chase the glow.</h3><p className="mt-2 text-sm leading-6 text-zinc-400">Collect the amber energy dot to grow your snake and earn 10 points. Avoid the walls and your own tail.</p>
      <div className="mt-5 grid grid-cols-3 gap-2 sm:max-w-[190px]">
        <span/><button onClick={()=>turn("up")} className="arcade-dpad"><ArrowUp className="h-4 w-4"/></button><span/>
        <button onClick={()=>turn("left")} className="arcade-dpad"><ArrowLeft className="h-4 w-4"/></button><button onClick={()=>turn("down")} className="arcade-dpad"><ArrowDown className="h-4 w-4"/></button><button onClick={()=>turn("right")} className="arcade-dpad"><ArrowRight className="h-4 w-4"/></button>
      </div>
      <div className="mt-5 flex flex-wrap gap-2"><span className="arcade-key">↑</span><span className="arcade-key">↓</span><span className="arcade-key">←</span><span className="arcade-key">→</span><span className="text-xs text-zinc-500">or WASD</span></div>
      <p className="mt-4 text-xs text-zinc-500">Mobile players: use the direction pad. Space restarts after a crash.</p>
    </aside>
  </div>;
}

const memoryFaces=["🐝","🚀","🎨","🧠","⚡","🎮","🌙","🦊"];
function shuffledMemory(){const values=[...memoryFaces,...memoryFaces].map((emoji,i)=>({id:i,emoji}));for(let i=values.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[values[i],values[j]]=[values[j],values[i]];}return values;}
function MemoryGame(){
  const [cards,setCards]=useState(shuffledMemory),[flipped,setFlipped]=useState<number[]>([]),[matched,setMatched]=useState<number[]>([]),[moves,setMoves]=useState(0),[locked,setLocked]=useState(false);
  const timeout=useRef<ReturnType<typeof setTimeout>|null>(null);
  useEffect(()=>()=>{if(timeout.current)clearTimeout(timeout.current);},[]);
  const reset=()=>{if(timeout.current)clearTimeout(timeout.current);setCards(shuffledMemory());setFlipped([]);setMatched([]);setMoves(0);setLocked(false);};
  const flip=(id:number)=>{if(locked||flipped.includes(id)||matched.includes(id))return;const next=[...flipped,id];setFlipped(next);if(next.length===2){setMoves(m=>m+1);setLocked(true);const [a,b]=next.map(index=>cards.find(c=>c.id===index)!);if(a.emoji===b.emoji){setMatched(m=>[...m,...next]);setFlipped([]);setLocked(false);}else timeout.current=setTimeout(()=>{setFlipped([]);setLocked(false);},780);}};
  return <div className="mx-auto w-full max-w-[650px]">
    <div className="mb-4 flex items-center justify-between gap-3"><div className="flex gap-5"><div><span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500">MOVES</span><p className="font-display text-2xl font-extrabold text-white">{moves}</p></div><div><span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500">PAIRS</span><p className="font-display text-2xl font-extrabold text-red-400">{matched.length/2}/8</p></div></div><ActionButton onClick={reset}><RotateCcw className="h-3.5 w-3.5"/> New shuffle</ActionButton></div>
    <div className="grid grid-cols-4 gap-2.5 sm:gap-3">{cards.map(card=>{const visible=flipped.includes(card.id)||matched.includes(card.id);return <button key={card.id} type="button" onClick={()=>flip(card.id)} aria-label={visible?card.emoji:"Reveal card"} className={`memory-card flex aspect-[0.9] items-center justify-center rounded-2xl border text-3xl sm:text-4xl transition-all duration-200 ${visible?"border-red-400/60 bg-red-950/55 shadow-[0_0_24px_rgba(229,9,20,0.16)]":"border-white/10 bg-white/[0.035] hover:-translate-y-1 hover:border-red-500/40 hover:bg-red-950/20"} ${matched.includes(card.id)?"opacity-55":""}`}>{visible?card.emoji:<span className="font-display text-2xl font-black text-red-500/70">S</span>}</button>;})}</div>
    {matched.length===16&&<div className="mt-5 rounded-xl border border-red-500/30 bg-red-950/25 p-4 text-center"><Trophy className="mx-auto h-6 w-6 text-amber-300"/><p className="mt-2 font-display text-xl font-extrabold text-white">Perfect match!</p><p className="text-xs text-zinc-400">You cleared all pairs in {moves} moves.</p><button onClick={reset} className="mt-3 text-xs font-bold uppercase tracking-widest text-red-300">Play again</button></div>}
    <p className="mt-4 text-center text-xs text-zinc-500">Flip two cards at a time. Find all 8 pairs with as few moves as possible.</p>
  </div>;
}

type Grid2048=number[][];
function emptyGrid():Grid2048{return Array.from({length:4},()=>[0,0,0,0]);}
function addTile(grid:Grid2048):Grid2048{const next=grid.map(r=>[...r]),empty:number[]=[];next.forEach((row,r)=>row.forEach((v,c)=>{if(!v)empty.push(r*4+c);}));if(empty.length){const at=empty[Math.floor(Math.random()*empty.length)],r=Math.floor(at/4),c=at%4;next[r][c]=Math.random()<0.9?2:4;}return next;}
function slideLine(line:number[]):{line:number[];score:number}{const values=line.filter(Boolean),out:number[]=[];let score=0;for(let i=0;i<values.length;i++){if(values[i]===values[i+1]){const merged=values[i]*2;out.push(merged);score+=merged;i++;}else out.push(values[i]);}while(out.length<4)out.push(0);return {line:out,score};}
function shifted(grid:Grid2048,direction:"left"|"right"|"up"|"down"):{grid:Grid2048;score:number}{const next=emptyGrid();let points=0;for(let i=0;i<4;i++){const coords=Array.from({length:4},(_,j)=>direction==="left"?[i,j]:direction==="right"?[i,3-j]:direction==="up"?[j,i]:[3-j,i]);const values=coords.map(([r,c])=>grid[r][c]);const result=slideLine(values);points+=result.score;coords.forEach(([r,c],j)=>next[r][c]=result.line[j]);}return {grid:next,score:points};}
function has2048Moves(grid:Grid2048){for(let r=0;r<4;r++)for(let c=0;c<4;c++){if(!grid[r][c])return true;if(c<3&&grid[r][c]===grid[r][c+1])return true;if(r<3&&grid[r][c]===grid[r+1][c])return true;}return false;}
function Game2048(){
  const initial=()=>addTile(addTile(emptyGrid()));
  const [grid,setGrid]=useState<Grid2048>(initial),[score,setScore]=useState(0),[best,setBest]=useState(0),[won,setWon]=useState(false),[over,setOver]=useState(false);
  const reset=()=>{setGrid(initial());setScore(0);setWon(false);setOver(false);};
  const move=useCallback((direction:"left"|"right"|"up"|"down")=>{if(over)return;setGrid(current=>{const result=shifted(current,direction);const changed=result.grid.some((row,r)=>row.some((v,c)=>v!==current[r][c]));if(!changed)return current;const next=addTile(result.grid);setScore(s=>{const value=s+result.score;setBest(b=>Math.max(b,value));return value;});if(!won&&next.some(row=>row.includes(2048)))setWon(true);if(!has2048Moves(next))setOver(true);return next;});},[over,won]);
  useEffect(()=>{const key=(e:KeyboardEvent)=>{const keys:Record<string,"left"|"right"|"up"|"down">={ArrowLeft:"left",a:"left",ArrowRight:"right",d:"right",ArrowUp:"up",w:"up",ArrowDown:"down",s:"down"};if(keys[e.key]){e.preventDefault();move(keys[e.key]);}};window.addEventListener("keydown",key);return()=>window.removeEventListener("keydown",key);},[move]);
  return <div className="mx-auto w-full max-w-[470px]">
    <div className="mb-4 flex items-center justify-between"><div className="flex gap-3"><div className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2"><span className="block font-mono text-[9px] text-zinc-500">SCORE</span><b className="font-display text-xl text-white">{score}</b></div><div className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2"><span className="block font-mono text-[9px] text-zinc-500">BEST</span><b className="font-display text-xl text-red-300">{best}</b></div></div><ActionButton onClick={reset}><RotateCcw className="h-3.5 w-3.5"/> Restart</ActionButton></div>
    <div className="grid grid-cols-4 gap-2 rounded-2xl border border-red-500/25 bg-[#111014] p-2.5 sm:gap-3 sm:p-3">{grid.flatMap((row,r)=>row.map((value,c)=><div key={r+"-"+c} className={`flex aspect-square items-center justify-center rounded-xl font-display text-2xl font-black sm:text-3xl ${value===0?"bg-white/[0.035]":value===2?"bg-zinc-700 text-white":value===4?"bg-zinc-600 text-white":value===8?"bg-red-950 text-red-100":value===16?"bg-red-900 text-white":value===32?"bg-red-700 text-white":value===64?"bg-red-600 text-white":value>=128?"bg-amber-300 text-[#171014]":"bg-amber-400 text-[#171014]"}`}>{value||""}</div>))}</div>
    {(won||over)&&<div className="mt-3 rounded-xl border border-red-500/25 bg-red-950/20 p-3 text-center text-sm font-bold text-white">{won?"2048 REACHED — NICE WORK!": "NO MORE MOVES — GAME OVER"} <button onClick={reset} className="ml-2 text-red-300 underline">Play again</button></div>}
    <div className="mt-4 flex justify-center gap-2"><ActionButton variant="ghost" onClick={()=>move("left")}><ArrowLeft className="h-4 w-4"/></ActionButton><div className="flex flex-col gap-2"><ActionButton variant="ghost" onClick={()=>move("up")}><ArrowUp className="h-4 w-4"/></ActionButton><ActionButton variant="ghost" onClick={()=>move("down")}><ArrowDown className="h-4 w-4"/></ActionButton></div><ActionButton variant="ghost" onClick={()=>move("right")}><ArrowRight className="h-4 w-4"/></ActionButton></div>
    <p className="mt-3 text-center text-xs text-zinc-500">Use arrow keys or buttons. Matching tiles merge into one.</p>
  </div>;
}

function ReactionGame(){
  type Phase="ready"|"wait"|"go"|"result"|"false";
  const [phase,setPhase]=useState<Phase>("ready"),[time,setTime]=useState<number|null>(null),[best,setBest]=useState<number|null>(null);
  const startAt=useRef(0),timer=useRef<ReturnType<typeof setTimeout>|null>(null);
  useEffect(()=>()=>{if(timer.current)clearTimeout(timer.current);},[]);
  const begin=()=>{if(timer.current)clearTimeout(timer.current);setTime(null);setPhase("wait");timer.current=setTimeout(()=>{startAt.current=performance.now();setPhase("go");},1200+Math.random()*2600);};
  const click=()=>{if(phase==="ready"||phase==="result"||phase==="false"){begin();return;}if(phase==="wait"){if(timer.current)clearTimeout(timer.current);setPhase("false");return;}if(phase==="go"){const ms=Math.round(performance.now()-startAt.current);setTime(ms);setBest(b=>b===null?ms:Math.min(b,ms));setPhase("result");}};
  const title=phase==="ready"?"READY TO TEST?":phase==="wait"?"WAIT FOR RED TO TURN GREEN":phase==="go"?"TAP NOW!":phase==="false"?"TOO EARLY!":"YOUR REACTION";
  return <div className="mx-auto w-full max-w-[620px]">
    <div className={`reaction-zone flex min-h-[280px] cursor-pointer flex-col items-center justify-center rounded-3xl border p-8 text-center transition-colors ${phase==="go"?"border-emerald-400/50 bg-emerald-950/55":phase==="wait"?"border-red-500/40 bg-red-950/30":phase==="false"?"border-amber-400/40 bg-amber-950/20":"border-white/10 bg-white/[0.025]"}`} onClick={click} role="button" tabIndex={0} onKeyDown={e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();click();}}}>
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-400">// REACTION LAB</span><h3 className="mt-5 font-display text-2xl font-black text-white sm:text-4xl">{title}</h3>
      {phase==="go"?<span className="mt-4 text-sm font-bold text-emerald-300">CLICK THE GREEN AREA!</span>:phase==="wait"?<span className="mt-4 text-sm text-red-200">Don't click yet…</span>:phase==="result"?<span className="mt-4 font-display text-5xl font-black text-red-300">{time} <small className="text-lg">ms</small></span>:phase==="false"?<span className="mt-4 text-sm text-amber-200">Wait until the green signal appears.</span>:<span className="mt-4 text-sm text-zinc-400">Tap anywhere here to start.</span>}
    </div>
    <div className="mt-4 flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.025] p-4"><div><span className="block font-mono text-[9px] uppercase tracking-widest text-zinc-500">PERSONAL BEST</span><b className="font-display text-2xl text-white">{best===null?"—":best+" ms"}</b></div><ActionButton onClick={begin}><Zap className="h-3.5 w-3.5"/> {phase==="ready"?"Start test":"Try again"}</ActionButton></div>
    <p className="mt-3 text-center text-xs text-zinc-500">A random delay keeps the test fair. Lower milliseconds mean faster reactions.</p>
  </div>;
}

function PixelStudio(){
  const [paint,setPaint]=useState<Record<number,string>>({}),[color,setColor]=useState("#ff2633");
  const [tool,setTool]=useState<"paint"|"erase">("paint");
  const palette=["#ff2633","#ff6470","#ff9f43","#ffd166","#f7f7f8","#a78bfa","#38bdf8","#34d399","#26242b","#111014"];
  const exportArt=()=>{const canvas=document.createElement("canvas");canvas.width=canvas.height=320;const ctx=canvas.getContext("2d");if(!ctx)return;ctx.fillStyle="#09090c";ctx.fillRect(0,0,320,320);Object.entries(paint).forEach(([key,value])=>{const i=Number(key),x=i%16,y=Math.floor(i/16);ctx.fillStyle=value;ctx.fillRect(x*20,y*20,20,20);});const a=document.createElement("a");a.href=canvas.toDataURL("image/png");a.download="saheetrix-pixel-art.png";a.click();};
  return <div className="grid gap-5 lg:grid-cols-[minmax(250px,420px)_1fr]">
    <div className="mx-auto w-full max-w-[420px]"><div className="mb-3 flex items-center justify-between"><span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">16 × 16 CANVAS</span><span className="font-mono text-[10px] text-zinc-500">{Object.keys(paint).length} PIXELS</span></div>
      <div className="grid aspect-square grid-cols-16 gap-[2px] rounded-xl border border-red-500/25 bg-[#09090c] p-2" style={{gridTemplateColumns:"repeat(16,minmax(0,1fr))"}}>{Array.from({length:256},(_,i)=><button key={i} type="button" onClick={()=>setPaint(p=>{const n={...p};if(tool==="erase")delete n[i];else n[i]=color;return n;})} aria-label={`Paint pixel ${i+1}`} className="aspect-square rounded-[2px] border border-white/[0.025] transition hover:scale-110" style={{backgroundColor:paint[i]||"rgba(255,255,255,0.025)"}}/>)}</div>
    </div>
    <aside className="rounded-2xl border border-white/10 bg-white/[0.025] p-5"><p className="font-mono text-[10px] uppercase tracking-[0.22em] text-red-400">// PIXEL PLAYGROUND</p><h3 className="mt-2 font-display text-xl font-extrabold text-white">Make something tiny.</h3><p className="mt-2 text-sm leading-6 text-zinc-400">Choose a colour and tap the grid to make your own pixel-art icon, pattern or tiny masterpiece.</p>
      <div className="mt-5 flex flex-wrap gap-2">{palette.map(c=><button key={c} type="button" onClick={()=>{setColor(c);setTool("paint");}} aria-label={`Choose ${c}`} aria-pressed={color===c&&tool==="paint"} className={`h-9 w-9 rounded-lg border-2 transition ${color===c&&tool==="paint"?"border-white scale-110":"border-white/10"}`} style={{backgroundColor:c}}/>)}</div>
      <div className="mt-5 flex flex-wrap gap-2"><ActionButton onClick={()=>setTool("paint")} variant={tool==="paint"?"primary":"ghost"}><Palette className="h-3.5 w-3.5"/> Brush</ActionButton><ActionButton onClick={()=>setTool("erase")} variant={tool==="erase"?"primary":"ghost"}>Eraser</ActionButton></div>
      <div className="mt-6 flex flex-wrap gap-2"><ActionButton onClick={()=>setPaint({})} variant="ghost"><RotateCcw className="h-3.5 w-3.5"/> Clear</ActionButton><ActionButton onClick={exportArt}><Sparkles className="h-3.5 w-3.5"/> Export PNG</ActionButton></div>
      <p className="mt-4 text-xs text-zinc-500">Your design is created locally in this browser. Export it as a PNG to keep it.</p>
    </aside>
  </div>;
}

function Game2048Card(){return null;}

export function GamesArcade(){
  const [activeGame,setActiveGame]=useState<GameId|null>(null);
  const active=GAMES.find(g=>g.id===activeGame);
  const renderGame=()=>{
    switch(activeGame){
      case "snake":return <SnakeGame/>;
      case "chess":return <ChessGame/>;
      case "memory":return <MemoryGame/>;
      case "2048":return <Game2048/>;
      case "reaction":return <ReactionGame/>;
      case "pixel":return <PixelStudio/>;
      default:return null;
    }
  };
  return <main className="min-h-screen overflow-hidden bg-[#08080a] pt-28 text-zinc-100">
    <section className="relative mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-12">
      <div className="pointer-events-none absolute -left-48 top-10 h-96 w-96 rounded-full bg-red-600/10 blur-[140px]"/>
      <div className="pointer-events-none absolute -right-40 top-64 h-80 w-80 rounded-full bg-rose-600/[0.07] blur-[130px]"/>
      <div className="relative">
        <Link href="/" className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 transition hover:text-red-300"><ArrowLeft className="h-3.5 w-3.5"/> Back to SAHEETRIX</Link>
        <div className="mt-8 flex flex-col gap-5 border-b border-white/10 pb-9 sm:flex-row sm:items-end sm:justify-between">
          <div><div className="mb-3 flex items-center gap-2"><span className="h-2 w-2 animate-pulse rounded-full bg-red-500 shadow-[0_0_12px_#ef4444]"/><span className="font-mono text-[10px] font-bold uppercase tracking-[0.32em] text-red-400">SAHEETRIX // PLAY ZONE</span></div>
            <h1 className="font-display text-4xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-6xl">{active?<><span className="text-red-500">PLAY</span> {active.title}</>:<>PLAY WITH <span className="text-red-500">ME.</span></>}</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">{active?active.description:"Take a break. Choose a game. Challenge your reflexes, train your brain or build something creative — all inside the SAHEETRIX playground."}</p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2"><span className="rounded-full border border-red-500/20 bg-red-950/20 px-3 py-2 font-mono text-[9px] uppercase tracking-widest text-red-200">6 MINI GAMES</span><span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 font-mono text-[9px] uppercase tracking-widest text-zinc-400">NO SIGN-UP • FREE PLAY</span></div>
        </div>
        {active? <div className="mt-7">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3"><button type="button" onClick={()=>setActiveGame(null)} className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2.5 font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-300 transition hover:border-red-500/40 hover:text-white"><ChevronLeft className="h-3.5 w-3.5"/> All games</button><span className="font-mono text-[9px] uppercase tracking-widest text-zinc-600">{active.genre}</span></div>
          <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.035] to-transparent p-3 shadow-[0_24px_70px_-45px_rgba(229,9,20,0.45)] sm:p-6 lg:p-8">{renderGame()}</div>
        </div>:<>
          <div className="mt-8 flex items-center justify-between"><div><p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-red-400">// CHOOSE YOUR CHALLENGE</p><h2 className="mt-2 font-display text-2xl font-extrabold text-white sm:text-3xl">THE ARCADE</h2></div><span className="hidden items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-zinc-500 sm:flex"><MousePointer2 className="h-3.5 w-3.5"/> Pick a card to play</span></div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{GAMES.map((game,index)=>{const Icon=game.icon;return <button key={game.id} type="button" onClick={()=>setActiveGame(game.id)} className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#101014] p-5 text-left transition duration-300 hover:-translate-y-1 hover:border-red-500/45 hover:shadow-[0_20px_60px_-30px_rgba(229,9,20,0.5)] sm:p-6">
            <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-red-600/[0.06] blur-3xl transition group-hover:bg-red-600/[0.15]"/>
            <div className="relative flex items-start justify-between"><span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-red-500/25 bg-red-950/35 text-red-300 transition group-hover:scale-105 group-hover:bg-red-600 group-hover:text-white"><Icon className="h-6 w-6"/></span><span className="font-mono text-[10px] text-zinc-600">0{index+1}</span></div>
            <div className="relative mt-7"><span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-red-400">{game.genre}</span><h3 className="mt-2 font-display text-xl font-extrabold text-white">{game.title}</h3><p className="mt-2 min-h-[48px] text-sm leading-6 text-zinc-400">{game.description}</p></div>
            <div className="relative mt-6 flex items-center justify-between border-t border-white/5 pt-4"><span className="font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-300 transition group-hover:text-red-300">Play now</span><span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-red-300 transition group-hover:translate-x-1 group-hover:border-red-500/40 group-hover:bg-red-600 group-hover:text-white"><ArrowRight className="h-4 w-4"/></span></div>
          </button>;})}</div>
          <div className="mt-8 rounded-3xl border border-red-500/20 bg-gradient-to-r from-red-950/25 via-[#111014] to-[#101014] p-5 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-7"><div className="flex items-start gap-4"><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-red-500/25 bg-red-600/15 text-red-300"><WandSparkles className="h-6 w-6"/></span><div><span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-red-400">CREATIVE BREAK</span><h3 className="mt-1 font-display text-lg font-extrabold text-white">Make. Play. Reset. Repeat.</h3><p className="mt-1 text-xs leading-5 text-zinc-400">All games run locally in your browser. No accounts, payment or external game services.</p></div></div><Link href="/#site-top" className="mt-4 inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest text-red-300 hover:text-white sm:mt-0"><Home className="h-3.5 w-3.5"/> Return home <ArrowRight className="h-3.5 w-3.5"/></Link></div>
        </>}
      </div>
    </section>
  </main>;
}
