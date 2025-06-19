'use client';
import { TopNav } from "./Components/TopNav";
import { BottomNav } from "./Components/BottomNav";
import { usePathname } from "next/navigation";

export function Navbar({user}: ProfileProps) {
  let pathname = usePathname();
  if (pathname === '/login' || pathname === '/register'){
    return null
  }
    console.log('Navbar: supabase: user: ', user);

  return (
    <div className="bg-white/70 fixed overflow-visible z-20 font-girassol backdrop-blur-md w-full">
      <TopNav user={user}/>
      <BottomNav />
    </div>
  );
}
