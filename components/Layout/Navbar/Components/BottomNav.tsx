
import { Button } from "@/components/Shared/Button"
import { NavItems } from "../Constants/Types"
import { NavLink } from "./NavLink"
import { MdKeyboardArrowDown } from "react-icons/md"
import HamburgerButton from "./Hamburger"
import { useEffect, useRef, useState } from "react"
import { Dropdown } from "./Dropdown";
import { bottomNavs } from "../Constants/Data";
import { SideNav } from "./SideNav";

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

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

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
            <SideNav openMenu={openMenu} setOpenDropdown={setOpenDropdown} openDropdown={openDropdown} />
            <Dropdown
                openDropdown={openDropdown}
            />

        </div>
    )
}