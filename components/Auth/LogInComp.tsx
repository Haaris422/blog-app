'use client';
import { Button } from "@/components/Shared/Button";
import Link from "next/link";
import { useState } from "react";
import { animationCalss } from "../Home/Constants/Data";

export function LoginComp() {
    const [user, setUser] = useState<LoginUsers>({
        email: '',
        password: ''
    })
    const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    return (
        <div className="h-screen font-girassol w-screen">
            <div className="h-screen w-[50%] flex flex-col gap-8 bg-white text-black justify-between items-center">
                <h1 className=" text-black">
                    <span className="text-6xl">Kanoon</span>
                    <span className="text-lg">.com</span>
                </h1>    
                <div className="space-y-10 text-center">            
                <h1 className="text-4xl">Log In</h1>
                <h1>Forgot Password? <Link href={'#'} className="font-bold hover:underline">Click here</Link></h1>
                <form className="flex flex-col gap-5">
                    <input type='email' placeholder="Email" name="email" onChange={inputChange} 
                    className={`p-2 `}/>
                    <input type="password" placeholder="Password" name="password" onChange={inputChange} />
                    <Button className={`relative border mt-12 text-xl px-8 overflow-hidden transition-all duration-500
                    bg-black border-white text-white
                    before:content-[''] before:absolute before:inset-0 before:bg-white 
                    before:scale-x-0 before:origin-left before:transition-transform before:duration-500
                    hover:before:scale-x-100
                    hover:text-black hover:border-black
                    `}>
                        <span className="relative z-10">Log In</span>
                    </Button>
                </form>
                <p>
                   Not Registered? <Link className="hover:underline" href={'#'}> Register Here </Link> 
                </p>
                </div>
                <div>
                    <div className="w-full bg-black/70 h-[1px]"/>
                    <p className="text-black/70">@All Rights Reserved</p>
                </div>
            </div>
        </div>
    )
}