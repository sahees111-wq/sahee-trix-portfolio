export type ChessColor = "w" | "b";
export type ChessSquare = { r: number; c: number };
export type ChessCell = string | null;
export type ChessBoard = ChessCell[][];
export type CastlingRights = { K: boolean; Q: boolean; k: boolean; q: boolean };
export type ChessPosition = {
  board: ChessBoard;
  turn: ChessColor;
  castling: CastlingRights;
  enPassant: ChessSquare | null;
  halfMove: number;
  fullMove: number;
};
export type ChessMove = { from: ChessSquare; to: ChessSquare };

const inside = (r: number, c: number) => r >= 0 && r < 8 && c >= 0 && c < 8;
const colorOf = (piece: ChessCell): ChessColor | null =>
  !piece ? null : piece === piece.toUpperCase() ? "w" : "b";
const opposite = (color: ChessColor): ChessColor => color === "w" ? "b" : "w";
const sameSquare = (a: ChessSquare, b: ChessSquare) => a.r === b.r && a.c === b.c;
const cloneBoard = (board: ChessBoard): ChessBoard => board.map((row) => [...row]);

export function createChessPosition(): ChessPosition {
  return {
    board: [
      ["r","n","b","q","k","b","n","r"],
      ["p","p","p","p","p","p","p","p"],
      [null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null],
      ["P","P","P","P","P","P","P","P"],
      ["R","N","B","Q","K","B","N","R"],
    ],
    turn: "w",
    castling: { K: true, Q: true, k: true, q: true },
    enPassant: null,
    halfMove: 0,
    fullMove: 1,
  };
}

function findKing(board: ChessBoard, color: ChessColor): ChessSquare | null {
  const king = color === "w" ? "K" : "k";
  for (let r=0;r<8;r++) for(let c=0;c<8;c++) if(board[r][c]===king) return {r,c};
  return null;
}

export function isChessSquareAttacked(board: ChessBoard, r: number, c: number, by: ChessColor): boolean {
  const pawn = by === "w" ? "P" : "p";
  const pawnSourceRow = by === "w" ? r + 1 : r - 1;
  for (const dc of [-1,1]) {
    if (inside(pawnSourceRow,c+dc) && board[pawnSourceRow][c+dc]===pawn) return true;
  }
  const knight = by === "w" ? "N" : "n";
  const knightSteps = [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]];
  for (const [dr,dc] of knightSteps) if(inside(r+dr,c+dc)&&board[r+dr][c+dc]===knight) return true;
  const king = by === "w" ? "K" : "k";
  for(let dr=-1;dr<=1;dr++) for(let dc=-1;dc<=1;dc++)
    if((dr!==0||dc!==0)&&inside(r+dr,c+dc)&&board[r+dr][c+dc]===king) return true;
  const rays = [
    {dr:-1,dc:0,types:["r","q"]},{dr:1,dc:0,types:["r","q"]},
    {dr:0,dc:-1,types:["r","q"]},{dr:0,dc:1,types:["r","q"]},
    {dr:-1,dc:-1,types:["b","q"]},{dr:-1,dc:1,types:["b","q"]},
    {dr:1,dc:-1,types:["b","q"]},{dr:1,dc:1,types:["b","q"]},
  ];
  for(const ray of rays) {
    let rr=r+ray.dr, cc=c+ray.dc;
    while(inside(rr,cc)) {
      const piece=board[rr][cc];
      if(piece) {
        if(colorOf(piece)===by && ray.types.includes(piece.toLowerCase())) return true;
        break;
      }
      rr+=ray.dr; cc+=ray.dc;
    }
  }
  return false;
}

export function isChessInCheck(board: ChessBoard, color: ChessColor): boolean {
  const king=findKing(board,color);
  return king ? isChessSquareAttacked(board,king.r,king.c,opposite(color)) : true;
}

function applyRaw(position: ChessPosition, move: ChessMove): ChessPosition {
  const board=cloneBoard(position.board);
  const piece=board[move.from.r][move.from.c];
  if(!piece) return position;
  const color=colorOf(piece)!;
  const target=board[move.to.r][move.to.c];
  const castling={...position.castling};
  let enPassant:ChessSquare|null=null;
  const kind=piece.toLowerCase();
  if(kind==="k") {
    if(color==="w"){castling.K=false;castling.Q=false;}
    else {castling.k=false;castling.q=false;}
    if(Math.abs(move.to.c-move.from.c)===2) {
      const rookFrom=move.to.c===6?7:0;
      const rookTo=move.to.c===6?5:3;
      const rook=board[move.from.r][rookFrom];
      board[move.from.r][rookFrom]=null;
      board[move.from.r][rookTo]=rook;
    }
  }
  if(kind==="r") {
    if(move.from.r===7&&move.from.c===0) castling.Q=false;
    if(move.from.r===7&&move.from.c===7) castling.K=false;
    if(move.from.r===0&&move.from.c===0) castling.q=false;
    if(move.from.r===0&&move.from.c===7) castling.k=false;
  }
  if(target?.toLowerCase()==="r") {
    if(move.to.r===7&&move.to.c===0) castling.Q=false;
    if(move.to.r===7&&move.to.c===7) castling.K=false;
    if(move.to.r===0&&move.to.c===0) castling.q=false;
    if(move.to.r===0&&move.to.c===7) castling.k=false;
  }
  if(kind==="p" && position.enPassant && sameSquare(move.to,position.enPassant)) {
    board[move.from.r][move.to.c]=null;
  }
  board[move.from.r][move.from.c]=null;
  board[move.to.r][move.to.c]=piece;
  if(kind==="p" && (move.to.r===0||move.to.r===7)) board[move.to.r][move.to.c]=color==="w"?"Q":"q";
  if(kind==="p"&&Math.abs(move.to.r-move.from.r)===2) enPassant={r:(move.from.r+move.to.r)/2,c:move.from.c};
  return {
    board,
    turn:opposite(color),
    castling,
    enPassant,
    halfMove:kind==="p"||target?0:position.halfMove+1,
    fullMove:position.fullMove+(color==="b"?1:0),
  };
}

function pseudoMoves(position:ChessPosition,from:ChessSquare):ChessSquare[] {
  const {r,c}=from, piece=position.board[r][c];
  if(!piece) return [];
  const color=colorOf(piece)!, kind=piece.toLowerCase(), moves:ChessSquare[]=[];
  const add=(rr:number,cc:number,onlyCapture=false)=>{
    if(!inside(rr,cc)) return false;
    const occupant=position.board[rr][cc];
    if(!occupant){if(!onlyCapture)moves.push({r:rr,c:cc});return true;}
    if(colorOf(occupant)!==color && occupant.toLowerCase()!=="k") moves.push({r:rr,c:cc});
    return false;
  };
  if(kind==="p") {
    const dir=color==="w"?-1:1, start=color==="w"?6:1, next=r+dir;
    if(inside(next,c)&&!position.board[next][c]) {
      moves.push({r:next,c});
      if(r===start&&!position.board[r+dir*2][c]) moves.push({r:r+dir*2,c});
    }
    for(const dc of [-1,1]) {
      const rr=r+dir,cc=c+dc;
      if(!inside(rr,cc)) continue;
      const target=position.board[rr][cc];
      if(target&&colorOf(target)!==color&&target.toLowerCase()!=="k") moves.push({r:rr,c:cc});
      if(position.enPassant&&sameSquare(position.enPassant,{r:rr,c:cc})) moves.push({r:rr,c:cc});
    }
  } else if(kind==="n") {
    for(const [dr,dc] of [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]]) add(r+dr,c+dc);
  } else if(kind==="k") {
    for(let dr=-1;dr<=1;dr++)for(let dc=-1;dc<=1;dc++)if(dr||dc)add(r+dr,c+dc);
    const row=color==="w"?7:0, rights=position.castling;
    const kingSide=color==="w"?rights.K:rights.k, queenSide=color==="w"?rights.Q:rights.q;
    if(r===row&&c===4&&!isChessSquareAttacked(position.board,row,4,opposite(color))) {
      if(kingSide&&!position.board[row][5]&&!position.board[row][6]&&
        position.board[row][7]===(color==="w"?"R":"r")&&
        !isChessSquareAttacked(position.board,row,5,opposite(color))&&
        !isChessSquareAttacked(position.board,row,6,opposite(color))) moves.push({r:row,c:6});
      if(queenSide&&!position.board[row][1]&&!position.board[row][2]&&!position.board[row][3]&&
        position.board[row][0]===(color==="w"?"R":"r")&&
        !isChessSquareAttacked(position.board,row,3,opposite(color))&&
        !isChessSquareAttacked(position.board,row,2,opposite(color))) moves.push({r:row,c:2});
    }
  } else {
    const directions=kind==="b"?[[-1,-1],[-1,1],[1,-1],[1,1]]:
      kind==="r"?[[-1,0],[1,0],[0,-1],[0,1]]:
      [[-1,-1],[-1,1],[1,-1],[1,1],[-1,0],[1,0],[0,-1],[0,1]];
    for(const [dr,dc] of directions) {
      let rr=r+dr,cc=c+dc;
      while(inside(rr,cc)) {
        const continueRay=add(rr,cc);
        if(!continueRay) break;
        rr+=dr;cc+=dc;
      }
    }
  }
  return moves;
}

export function getChessLegalMoves(position:ChessPosition,from:ChessSquare):ChessSquare[] {
  const piece=position.board[from.r]?.[from.c];
  if(!piece||colorOf(piece)!==position.turn) return [];
  return pseudoMoves(position,from).filter(to=>{
    const next=applyRaw(position,{from,to});
    return !isChessInCheck(next.board,position.turn);
  });
}

export function makeChessMove(position:ChessPosition,move:ChessMove):ChessPosition {
  return applyRaw(position,move);
}

export function getChessStatus(position:ChessPosition):"PLAYING"|"CHECK"|"CHECKMATE"|"STALEMATE" {
  const checked=isChessInCheck(position.board,position.turn);
  let hasMove=false;
  for(let r=0;r<8&&!hasMove;r++)for(let c=0;c<8&&!hasMove;c++) {
    const piece=position.board[r][c];
    if(piece&&colorOf(piece)===position.turn&&getChessLegalMoves(position,{r,c}).length>0) hasMove=true;
  }
  if(!hasMove) return checked?"CHECKMATE":"STALEMATE";
  return checked?"CHECK":"PLAYING";
}
