import { Button } from "@/components/Shared/Button";
import { bottomNavs, categories } from "../Constants/Data";
import { SideNavArea } from "./SideNavArea";
import { NavLink } from "./NavLink";
import Link from "next/link";
import { animationCalss } from "@/components/Home/Constants/Data";

interface SideNavProps {
    openDropdown: string | null;
    setOpenDropdown: React.Dispatch<React.SetStateAction<string | null>>;
    openMenu: boolean;
}

export function SideNav({ openDropdown, setOpenDropdown, openMenu }: SideNavProps) {

    return (
        <div
            className={`fixed flex md:hidden justify-center items-center 
                top-0 right-0 h-screen bg-black/95 
                backdrop-blur-md transform 
                transition-transform duration-500 ease-in-out 
                origin-right z-5 
                ${openMenu ?
                    'scale-x-100 w-full' : 'scale-x-0 w-full'
                }`}
        >
            <SideNavArea openDropdown={openDropdown} />
            <div className="w-[2px] h-screen bg-white" />
            <div className="flex flex-col py-2 space-y-8">
                {bottomNavs.map((navItem) => {
                    if (navItem.name === 'insights' || navItem.name === 'videos') {
                        return (
                            <Button
                                onClick={() => setOpenDropdown(navItem.name)}
                                className={`${animationCalss} ${openDropdown === navItem.name
                                    ? 'bg-white text-black'
                                    : 'bg-transparent'
                                    }`}
                                key={navItem.label}
                            >
                                <Link href={`/${navItem.name}`}>
                                    {navItem.name}
                                </Link>
                            </Button>
                        )
                    }
                    return (
                        <Button
                            onClick={() => setOpenDropdown(navItem.name)}
                            className={`${animationCalss} ${openDropdown === navItem.name
                                ? 'bg-white text-black'
                                : 'bg-transparent'
                                }`}
                            key={navItem.label}
                        >
                            {navItem.name}
                        </Button>
                    )
                })}
            </div>
        </div>
    )
}