'use client';

import { Button } from "@/components/Shared/Button"
import { NavItems } from "../TS/Types"
import { NavLink } from "./NavLink"
import { MdKeyboardArrowDown } from "react-icons/md"
import HamburgerButton from "./Hamburger"
import { useEffect, useRef, useState } from "react"

export function BottomNav() {
    const [openMenu, setOpenMenu] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const arrowRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const bottomNavs: NavItems[] = [
        { label: 'Categories', name: 'categories' },
        { label: 'Blogs', name: 'blogs' },
        { label: 'Research', name: 'research' },
        { label: 'Thoughts', name: 'thaughts' },
        { label: 'Videos', name: 'videos' },
    ]
    const categories: NavItems[] = [
        { label: 'Family Law', name: 'family-law' },
        { label: 'Criminal Law', name: 'criminal-law' },
        { label: 'Constitutional Law', name: 'constitutional-law' },
        { label: 'Corporate Law', name: 'corporate-law' },
        { label: 'Contract Law', name: 'contract-law' },
        { label: 'Labour Law', name: 'labour-law' },
        { label: 'Intellectual Property Law', name: 'ip-law' },
        { label: 'Property Law', name: 'property-law' },
        { label: 'Taxation Law', name: 'tax-law' },
        { label: 'Environmental Law', name: 'environmental-law' },
        { label: 'Consumer Law', name: 'consumer-law' },
        { label: 'Cyber Law', name: 'cyber-law' },
    ];

    const blogs:NavItems[] =[
        { label:'Featured', name:'featured-blogs' },
        { label:'Spotlight', name:'spotlight-blogs' },
        { label:'Latest', name:'latest-blogs' },
        { label:'All', name:'all-blogs' },
    ]
    const toggleDropdown = (name: string) => {
        setOpenDropdown(prev => (prev === name ? null : name));
    };
    const bottomNavLinksGeneraor = (item: NavItems) => {
        if (item.name === 'categories' || item.name === 'blogs' || item.name === 'research') {
            return (
                <Button key={item.name} onClick={() => toggleDropdown(item.name)} className="flex items-center gap-2 
                group text-black/90 text-sm lg:text-lg font-bold hover:text-black/50">
                    {item.label}
                    <MdKeyboardArrowDown className={`text-lg lg:text-xl
                    transition-transform duration-300 ease-in-out
                        ${openDropdown === item.name ? 'rotate-180' : ''
                        }`} />
                </Button>
            )
        } else {
            return (
                <NavLink key={item.name} navItem={item}>
                    {item.label}
                </NavLink>
            )
        }
    }


    return (
        <div>
            <div className="hidden md:flex justify-center 
        items-center p-3
        gap-10 md:gap-16 text-black/90">
                {bottomNavs.map((navItem) => (
                    bottomNavLinksGeneraor(navItem)
                ))}
            </div>
            <div className="block md:hidden absolute top-8.5 right-5">
                <HamburgerButton open={openMenu} onClick={() => setOpenMenu(!openMenu)} />
            </div>
            <div
                className={`hidden text-center md:grid grid-cols-4
                    gap-8 font-typewriter transition-all duration-500 ease-in-out overflow-hidden 
                    ${openDropdown === 'categories'  ?
                        "max-h-screen bg-black/80 px-24 backdrop-blur-2xl py-10 "
                        :
                        "max-h-0 p-0 opacity-0"
                    }`}>
                {categories.map((category) => (
                    <NavLink underline={false} className="text-red-800!" key={category.name} navItem={category}>
                        {category.label}
                    </NavLink>
                ))}
            </div>
            <div
                className={`hidden text-center md:grid grid-cols-4
                    gap-8 font-typewriter transition-all duration-500 ease-in-out overflow-hidden 
                    ${openDropdown === 'blogs'  ?
                        "max-h-screen bg-black/80 px-24 backdrop-blur-2xl py-10 "
                        :
                        "max-h-0 p-0 opacity-0"
                    }`}>
                {categories.map((category) => (
                    <NavLink underline={false} className="text-white!" key={category.name} navItem={category}>
                        {category.label}
                    </NavLink>
                ))}
            </div>
        </div>
    )
}