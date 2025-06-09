import Link from "next/link";
import { NavLinkProps } from "../Constants/Types";



export function NavLink({ navItem, underline =true , children, className }: NavLinkProps) {
    return (
        <Link href={`/${navItem.name}`} 
        className={`relative group 
        text-sm lg:text-lg text-black/90 
        rouned-xl font-bold 
         
        transition-all duration-300 ease-in-out
        ${!underline ? 'hover:scale-105 border-x border-transparent hover:border-white':'hover:text-black/50'}
        ${className}`} key={navItem.label}>
            {children}
            {underline && <span
                className={`absolute mt-0.5 left-1/2 bottom-0 h-[2.5px] transition-all duration-300 ease-in-out transform -translate-x-1/2 ${"w-0 group-hover:w-full group-hover:left-0 group-hover:translate-x-0 bg-black/50"
                    }`}
            />}
        </Link>
    )
}