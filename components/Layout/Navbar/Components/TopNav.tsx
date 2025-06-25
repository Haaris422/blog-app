import { BiSearch } from "react-icons/bi";
import { Button } from "@/components/Shared/Button";
import { NavItems } from "../Constants/Types";
import { NavLink } from "./NavLink";
import { animationCalss } from "@/components/Home/Constants/Data";
import { AuthArea } from "./AuthArea";
import { navLinks } from "../Constants/Data";
import Link from "next/link";



export function TopNav({user}: NavbarProps) {
   
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

    return (
        <>
            <div>
                <div className="relative flex justify-center items-center p-2">
                    <AuthArea user={user}/>
                    <Link href={'/'} className=" text-black">
                        <span className="text-6xl">Kanoon</span>
                        <span className="text-lg">.com</span>
                    </Link>
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
                 ${animationCalss} ease-in-out overflow-hidden 
                 gap-4 xs:gap-10 sm:gap-20
                    ${"max-h-screen"
                        }`}>
                    {navLinks.map((navItem) => (
                        <NavLink className="my-2" key={navItem.label} navItem={navItem}>
                            {navLinksGenerator(navItem)}
                        </NavLink>
                    ))}
                </div>

            </div>
        </>
    )
}