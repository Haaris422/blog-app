"use client";

import { JSX, useState, useEffect } from "react";
import { MdOutlineArticle } from "react-icons/md";
import { blogsAndResearch, categories } from "../Constants/Data";
import { NavLink } from "./NavLink";
import { NavContentsProps, SideNavAreaProps } from "../Constants/Types";

export function SideNavArea({ openDropdown }: SideNavAreaProps) {
    const [visibleContent, setVisibleContent] = useState<string | null>(openDropdown);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        if (openDropdown !== visibleContent) {
            if (visibleContent && openDropdown) {
                setIsTransitioning(true);
                const timeout = setTimeout(() => {
                    setVisibleContent(openDropdown);
                    setIsTransitioning(false);
                }, 200);
                return () => clearTimeout(timeout);
            } else {
                setVisibleContent(openDropdown);
                setIsTransitioning(false);
            }
        }
    }, [openDropdown, visibleContent]);

    const renderItem = (link: NavContentsProps) => {
        if (visibleContent === 'categories') {
            return (
                <div
                    key={link.name}
                    className="relative border overflow-hidden h-40 w-60"
                >
                    <img
                        src={link.image}
                        alt={link.label}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <NavLink
                        navItem={link}
                        underline={false}
                        className="text-white p-2 relative h-full text-center bg-black/60 grid place-items-center"
                    >
                        <h3>{link.label}</h3>
                        <div className="flex justify-center py-2">
                            <MdOutlineArticle size={26} />
                        </div>
                        <div className="text-md text-center font-normal">
                            {link.description}
                        </div>
                    </NavLink>
                </div>
            )
        } else {
            return (
                <div
                    key={link.name}
                    className="relative w-full overflow-hidden"
                >
                    <div className="text-white p-4 space-y-6 relative h-full bg-black/60 text-left">
                        <h3 className="text-lg sm:text-xl">{link.label}</h3>
                        <div className="flex py-4 overflow-x-auto gap-8 min-w-[150px]">
                            {[1,2,3,4].map((item)=>(
                                <div key={item} className="min-w-[200px] xs:min-w-[300px] h-[200px] border">
                                    
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )
        }
    };

    function SideNavLinks(tab: string | null) {
        if (!tab) return null;

        const isCategories = tab === "categories";
        const data = isCategories ? categories : blogsAndResearch;
        const title = isCategories ? "Explore Categories" : "Explore Blogs";

        return (
            <div>
                <div className={`${isTransitioning ? "animate-slide-up" : "animate-slide-down"} text-center py-8 bg-black/80 backdrop-blur-md sticky top-0 z-10`}>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                        {title}
                    </h2>
                    <div className="w-24 h-1 bg-white/60 mx-auto rounded-full"></div>
                </div>

                <div className={`${isTransitioning ? "animate-slide-left" : "animate-slide-right"} grid ${tab !== 'categories' ? 'grid-cols-1':'grid-cols-1 sm:grid-cols-2'} place-items-center gap-x-2 gap-y-8`}>
                    {data.map(renderItem)}
                </div>
            </div>
        );
    }

    return (
        <div className="w-full overflow-y-auto h-screen">
            <div
                className={`transition-all duration-200 ease-out transform ${
                    isTransitioning
                        ? "opacity-0 translate-y-4 scale-95"
                        : "opacity-100 translate-y-0 scale-100"
                }`}
            >
                {SideNavLinks(visibleContent)}
            </div>
        </div>
    );
}