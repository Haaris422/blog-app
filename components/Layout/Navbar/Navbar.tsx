import { TopNav } from "@/components/Layout/Navbar/Components/TopNav"
import Link from "next/link"
import { BottomNav } from "./Components/BottomNav"

export function Navbar(){
    
    return(
        <div className="bg-white/70 fixed overflow-visible z-10 font-girassol backdrop-blur-md w-full">
           <TopNav/>
           <BottomNav/>
        </div>
    )
}