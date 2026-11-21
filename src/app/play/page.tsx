import type { Metadata } from "next";
import { GamesArcade } from "@/components/games/GamesArcade";
export const metadata: Metadata = { title:"Play With Me | SAHEETRIX Arcade", description:"Take a creative break in the SAHEETRIX arcade: Snake, Chess, Memory Match, 2048, Reaction Lab, Pixel Studio, Whack-a-Glitch, Tic-Tac-Toe and Simon Sequence.", alternates:{canonical:"/play"}, openGraph:{title:"Play With Me | SAHEETRIX Arcade",description:"Nine free browser games in the SAHEETRIX creative playground.",url:"https://saheetrix.com/play",type:"website"} };
export default function PlayPage(){return <GamesArcade/>;}
