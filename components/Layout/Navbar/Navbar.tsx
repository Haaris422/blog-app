'use client';

import { usePathname } from "next/navigation";
import { TopNav } from "./Components/TopNav";
import { BottomNav } from "./Components/BottomNav";

export function Navbar() {
  const pathname = usePathname();
  const hideNavbar = pathname === '/login';

  if (hideNavbar) return null;

  return (
    <div className="bg-white/70 fixed overflow-visible z-20 font-girassol backdrop-blur-md w-full">
      <TopNav />
      <BottomNav />
    </div>
  );
}
