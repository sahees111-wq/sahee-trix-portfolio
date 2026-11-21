import type { Metadata } from "next";
import { GamesArcade } from "@/components/games/GamesArcade";
export const metadata: Metadata = { title:"Play With Me | SAHEETRIX Arcade", description:"Take a creative break in the SAHEETRIX arcade: Snake, Chess, Memory Match, 2048, Reaction Lab and Pixel Studio.", alternates:{canonical:"/play"}, openGraph:{title:"Play With Me | SAHEETRIX Arcade",description:"Six free browser games in the SAHEETRIX creative playground.",url:"https://saheetrix.com/play",type:"website"} };
export default function PlayPage(){return <GamesArcade/>;}
