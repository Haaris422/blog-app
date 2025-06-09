'use client';
import Link from "next/link"
import HamburgerButton from "./Hamburger"
import { useEffect, useRef, useState } from "react"
import { BiSearch } from "react-icons/bi";
import { Button } from "@/components/Shared/Button";
import { NavItems } from "../TS/Types";
import { NavLink } from "./NavLink";



export function TopNav() {
    const navLinks: NavItems[] = [
        { label: 'About', name: 'about' },
        { label: 'Contact Us', name: 'contact' },
        { label: 'Newsletter', name: 'newsletter' },
        { label: 'Search', name: 'search' },
    ]
    function navLinksGenerator(navItem: NavItems) {
        if (navItem.name !== 'search') {
            return navItem.label
        } else {
            return <Button key={navItem.name}
                className="bg-black text-white rounded-lg group 
                                    transition-all duration-300 ease-in-out
                                    hover:bg-black/70 hover:backdrop-blur-3xl">
                <BiSearch className="text-md transition-all duration-300 ease-in-out lg:text-xl group-hover:scale-120" />
            </Button>
        }
    }
    // useEffect(() => {
    //     function handleClickOutside(event: MouseEvent) {
    //         if (
    //             openMenu &&
    //             menuRef.current &&
    //             hamburgerRef.current &&
    //             !menuRef.current.contains(event.target as Node) &&
    //             !hamburgerRef.current.contains(event.target as Node)
    //         ) {
    //             setOpenMenu(false);
    //         }
    //     }

    //     document.addEventListener("mousedown", handleClickOutside);
    //     return () => {
    //         document.removeEventListener("mousedown", handleClickOutside);
    //     };
    // }, [openMenu]);
    return (
        <div>
            <div className="relative flex justify-center items-center p-2">

                <h1 className=" text-black">
                    <span className="text-6xl">Kanoon</span>
                    <span className="text-lg">.com</span>
                </h1>
                <div className="absolute right-0  ">
                    <div className="hidden md:flex 
                    gap-5 lg:gap-8 
                    py-2 px-4 items-center">
                        {navLinks.map((navItem) => (
                            <NavLink navItem={navItem} key={navItem.label}>
                                {navLinksGenerator(navItem)}
                            </NavLink>
                        )

                        )}
                    </div>
                    

                </div>

            </div>
            <div
                className={`flex md:hidden text-md sm:text-lg
                 text-[#2d2d2d] font-bold justify-center items-center 
                 transition-all duration-500 ease-in-out overflow-hidden 
                 gap-4 xs:gap-10 sm:gap-20
                    ${
                        "max-h-screen"
                    }`}>
                {navLinks.map((navItem) => (
                    <NavLink className="my-2" key={navItem.label} navItem={navItem}>
                        {navLinksGenerator(navItem)}
                    </NavLink>
                ))}
            </div>
        </div>
    )
}