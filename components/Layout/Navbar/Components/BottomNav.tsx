'use client';

import { Button } from "@/components/Shared/Button"
import { NavItems } from "../Constants/Types"
import { NavLink } from "./NavLink"
import { MdKeyboardArrowDown } from "react-icons/md"
import HamburgerButton from "./Hamburger"
import { useRef, useState } from "react"
import { Dropdown } from "./Dropdown";
import { bottomNavs } from "../Constants/Data";

export function BottomNav() {
    const [openMenu, setOpenMenu] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

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
            <div className={`block md:hidden absolute top-8.5 z-10 right-5 
                ${openMenu ? 'text-white' : 'text-black'}`}>
                <HamburgerButton open={openMenu} onClick={() => setOpenMenu(!openMenu)} />
            </div>
            <div
                className={`fixed top-0 w-full flex justify-between items-center h-[100vh] bg-black/90 backdrop-blur-md ${openMenu ? 'opacity-100' : 'opacity-0'}`}>
                <div className="w-full">

                </div>
                <div className="w-[2px] h-[100vh]  bg-white" />
                <div className="flex flex-col py-2 space-y-8">
                    {bottomNavs.map((navItem) => (
                        <Button onClick={() => setOpenDropdown(navItem.name)}
                            className={`transition-all duration-500 ease-in-out 
                            ${openDropdown === navItem.name ?
                                    'bg-white text-black'
                                    :
                                    'bg-transparent'
                                }`
                            } key={navItem.label}>{navItem.name}</Button>
                    ))}
                </div>
            </div>
            {<Dropdown
                openDropdown={openDropdown}
            />}

        </div>
    )
}