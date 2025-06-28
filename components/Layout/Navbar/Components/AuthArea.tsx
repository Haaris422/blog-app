import { animationCalss } from "@/components/Home/Constants/Data";
import { ActionButton } from "@/components/Shared/ActionButton";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { profileMenu } from "../Constants/Data";

export function AuthArea({ user }: NavbarProps) {
    const [openDropdown, setOpenDropdown] = useState(false);
    const { avatar_url, full_name } = user ? user : {};
    const supabase = createClient();

    const handleLogout = async (label: string) => {
        if (label === 'Sign-out') {
            await supabase.auth.signOut();
            window.location.href = '/';
        }
        if(label === 'Profile') {
            window.location.href = '/profile';
        }
    };
    console.log('AuthArea: avatar_url: ', avatar_url);
    return (
        <div className="absolute left-2">
            {user
                ?
                <div className={`${animationCalss}
                ${openDropdown ? 'border-b-0 rounded-b-none' : ''}
                    cursor-pointer relative
                    h-full  group border border-black
                    hover:border-gray-400 bg-white rounded-md
                    shadow-md transition-transform hover:scale-[1.02]`}>
                    <div
                        onClick={() => setOpenDropdown(!openDropdown)}
                        className={`${animationCalss}
                        
                    p-1 cursor-pointer relative
                    h-full flex items-center gap-2
                    `}
                    >
                        <div className={`${animationCalss} absolute 
                        ${openDropdown ? 'border-b-0 rounded-b-none w-full' : ''}
                        top-0 left-0 rounded-md h-full bg-black w-0 group-hover:w-full transition-all 
                        duration-300 z-0`}
                        />
                        <img
                            src={avatar_url}
                            height="40" width="40"
                            className="z-10 rounded-md border border-white shadow-sm"
                            alt="#"
                        />

                        <p
                            className={`${animationCalss}  hidden z-10 
      group-hover:text-white ${openDropdown ? 'text-white' : 'text-black'} text-sm
      md:block pr-2`}
                        >
                            {full_name}
                        </p>
                        <MdKeyboardArrowDown size={22}
                            className={`${animationCalss} z-5 mr-1 ${openDropdown ? 'text-white' : 'text-black'} group-hover:text-white
                        ${openDropdown ? 'rotate-180' : ''
                                }`} />
                    </div>
                    <div
                        className={`${animationCalss} 
                        bg-white w-full border border-t-0 border-black
                        group-hover:border-gray-400 rounded-b-md
                        absolute top-full overflow-hidden transition-all duration-300
                        ${openDropdown ? 'max-h-40' : 'max-h-0 opacity-0'}
                    `}
                    >
                        {profileMenu.map((item) => (
                            <div key={item.label}
                                onClick={() => handleLogout(item.label)}
                                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                <item.icon size={18} className="text-black" />
                                <span className="text-sm text-black">{item.label}</span>
                            </div>
                        ))}
                    </div>

                </div>

                :
                <Link href={'/login'}>
                    <ActionButton>
                        Sign In
                    </ActionButton>
                </Link>}

        </div>
    )
}