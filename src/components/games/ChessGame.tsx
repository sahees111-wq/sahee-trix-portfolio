"use client";

import { useMemo, useState } from "react";
import { RotateCcw, Crown, Undo2 } from "lucide-react";
import {
  ChessPosition, ChessSquare, createChessPosition, getChessLegalMoves,
  getChessStatus, isChessInCheck, makeChessMove,
} from "./chessEngine";

const glyph:Record<string,string>={K:"♔",Q:"♕",R:"♖",B:"♗",N:"♘",P:"♙",k:"♚",q:"♛",r:"♜",b:"♝",n:"♞",p:"♟"};
const squareName=(s:ChessSquare)=>String.fromCharCode(97+s.c)+(8-s.r);
const pieceNames:Record<string,string>={k:"king",q:"queen",r:"rook",b:"bishop",n:"knight",p:"pawn"};

export function ChessGame(){
  const [position,setPosition]=useState<ChessPosition>(()=>createChessPosition());
  const [selected,setSelected]=useState<ChessSquare|null>(null);
  const [targets,setTargets]=useState<ChessSquare[]>([]);
  const [history,setHistory]=useState<ChessPosition[]>([]);
  const [moveLog,setMoveLog]=useState<string[]>([]);
  const status=getChessStatus(position);
  const checked=isChessInCheck(position.board,position.turn);
  const moveCount=Math.max(1,Math.ceil(history.length/2));
  const targetSet=useMemo(()=>new Set(targets.map(s=>s.r+"-"+s.c)),[targets]);
  const restart=()=>{setPosition(createChessPosition());setSelected(null);setTargets([]);setHistory([]);setMoveLog([]);};
  const undo=()=>{if(!history.length)return;setPosition(history[history.length-1]);setHistory(h=>h.slice(0,-1));setMoveLog(m=>m.slice(0,-1));setSelected(null);setTargets([]);};
  const clickSquare=(r:number,c:number)=>{
    const square={r,c};
    if(selected&&targetSet.has(r+"-"+c)){
      setHistory(h=>[...h,position]);
      setMoveLog(m=>[...m,squareName(selected)+" → "+squareName(square)]);
      setPosition(makeChessMove(position,{from:selected,to:square}));
      setSelected(null);setTargets([]);return;
    }
    const piece=position.board[r][c];
    if(piece&&((piece===piece.toUpperCase()?"w":"b")===position.turn)){
      setSelected(square);setTargets(getChessLegalMoves(position,square));return;
    }
    setSelected(null);setTargets([]);
  };
  const label=status==="CHECKMATE"?(position.turn==="w"?"Black wins":"White wins"):
    status==="STALEMATE"?"Draw by stalemate":status==="CHECK"?"King in check":
    position.turn==="w"?"White to move":"Black to move";
  return <div className="grid gap-5 lg:grid-cols-[minmax(0,540px)_minmax(220px,1fr)]">
    <div className="mx-auto w-full max-w-[540px]">
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-red-500/25 bg-red-950/30 px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-red-200"><Crown className="h-3.5 w-3.5"/>{label}</span>
        <span className="font-mono text-[10px] text-zinc-500">MOVE {Math.max(1,Math.ceil(moveCount/2))}</span>
      </div>
      <div className="grid grid-cols-8 overflow-hidden rounded-xl border border-red-500/30 shadow-[0_18px_55px_-25px_rgba(229,9,20,0.35)]" role="grid" aria-label="Chess board">
        {position.board.map((row,r)=>row.map((piece,c)=>{
          const isLight=(r+c)%2===0;
          const isSelected=selected?.r===r&&selected?.c===c;
          const isTarget=targetSet.has(r+"-"+c);
          return <div key={r+"-"+c} role="gridcell" className="aspect-square">
            <button type="button" onClick={()=>status==="CHECKMATE"||status==="STALEMATE"?undefined:clickSquare(r,c)}
              aria-label={`${squareName({r,c})} ${piece?((piece===piece.toUpperCase()?"White ":"Black ")+(pieceNames[piece.toLowerCase()]||"piece")):"empty"}`}
              className={`relative flex h-full w-full items-center justify-center text-[clamp(1.45rem,5vw,3rem)] leading-none transition-colors ${isLight?"bg-[#29262a]":"bg-[#151317]"} ${isSelected?"!bg-red-600/80":""} ${isTarget?"after:absolute after:inset-[38%] after:rounded-full after:bg-red-400/65 after:content-['']":""} ${isTarget&&piece?"after:inset-1 after:rounded-none after:border-[3px] after:border-red-400 after:bg-transparent":""} hover:brightness-125 focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-400`}>
              {piece&&<span className={piece===piece.toUpperCase()?"drop-shadow-[0_2px_1px_rgba(0,0,0,0.5)] text-white":"drop-shadow-[0_2px_2px_rgba(0,0,0,0.9)] text-[#ff5260]"}>{glyph[piece]}</span>}
              {c===0&&<span className="absolute left-1 top-0.5 text-[8px] font-bold text-red-300/70">{8-r}</span>}
              {r===7&&<span className="absolute bottom-0 right-1 text-[8px] font-bold text-red-300/70">{String.fromCharCode(97+c)}</span>}
            </button>
          </div>;
        }))}
      </div>
    </div>
    <aside className="flex flex-col gap-4">
      <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-red-400">// LOCAL TWO-PLAYER</p>
        <h3 className="mt-2 font-display text-xl font-extrabold text-white">Your move.</h3>
        <p className="mt-2 text-sm leading-6 text-zinc-400">Take turns on the same board. Select a piece, then tap a highlighted square. Legal moves, check, checkmate, castling, en passant and queen promotion are supported.</p>
        <div className="mt-5 grid grid-cols-2 gap-2">
          <div className="rounded-xl border border-white/10 bg-black/30 p-3"><span className="block font-mono text-[9px] text-zinc-500">WHITE</span><span className="mt-1 block text-sm font-bold text-white">♔ Player 1</span></div>
          <div className="rounded-xl border border-red-500/20 bg-red-950/20 p-3"><span className="block font-mono text-[9px] text-zinc-500">BLACK</span><span className="mt-1 block text-sm font-bold text-red-200">♚ Player 2</span></div>
        </div>
        {checked&&<p className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs font-bold text-red-200">CHECK — protect your king.</p>}
      </div>
      <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
        <div className="flex items-center justify-between"><span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Move history</span><span className="font-mono text-[10px] text-zinc-500">{history.length} plies</span></div>
        <div className="mt-3 max-h-40 space-y-2 overflow-y-auto pr-1">
          {moveLog.length===0?<p className="text-xs text-zinc-500">Your first move starts the match.</p>:moveLog.map((move,i)=><div key={i} className="flex justify-between border-b border-white/5 pb-1 font-mono text-[10px] text-zinc-400"><span>{Math.floor(i/2)+1}{i%2?". ...":"."}</span><span className="text-zinc-200">{move}</span></div>)}
        </div>
        <div className="mt-4 flex gap-2">
          <button onClick={undo} disabled={!history.length} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/10 px-3 py-2.5 text-[10px] font-bold uppercase tracking-wider text-zinc-300 transition hover:border-red-500/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-35"><Undo2 className="h-3.5 w-3.5"/> Undo</button>
          <button onClick={restart} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-red-600 px-3 py-2.5 text-[10px] font-bold uppercase tracking-wider text-white transition hover:bg-red-500"><RotateCcw className="h-3.5 w-3.5"/> Restart</button>
        </div>
      </div>
      {status==="CHECKMATE"||status==="STALEMATE"?<button onClick={restart} className="rounded-xl border border-red-500/30 bg-red-950/30 p-4 text-left text-sm font-bold text-red-200">MATCH FINISHED — PLAY AGAIN</button>:null}
    </aside>
  </div>;
}
