"use client";

import { useEffect, useState } from "react";
import { blogsAndResearch, categories } from "../Constants/Data";
import { NavLink } from "./NavLink";
import { DropdownProps, NavContentsProps } from "../Constants/Types";
import { MdOutlineArticle } from "react-icons/md";

export function Dropdown({ openDropdown }: DropdownProps) {
  const [visibleContent, setVisibleContent] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (openDropdown) {
      if (visibleContent && openDropdown !== visibleContent) {
        setIsTransitioning(true);
        const timeout = setTimeout(() => {
          setVisibleContent(openDropdown);
          setIsTransitioning(false);
        }, 150);
        return () => clearTimeout(timeout);
      } else {
        setVisibleContent(openDropdown);
        setIsTransitioning(false);
      }
    } else {
      setIsTransitioning(false);
      const timeout = setTimeout(() => {
        setVisibleContent(null);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [openDropdown, visibleContent]);

  const renderCategoryItem = (link: NavContentsProps, index: number) => (
    <div
      key={link.name}
      className="relative border group overflow-hidden h-40 w-64"
    >
      <img
        src={link.image}
        alt={link.label}
        className="absolute transition-transform duration-400 ease-in-out scale-110 group-hover:scale-100 inset-0 w-full h-full object-cover"
      />
      <NavLink
        navItem={link}
        underline={false}
        className="text-white p-2 relative h-full text-center bg-black/60 grid place-items-center"
      >
        <h3>{link.label}</h3>
        <div className="flex justify-center py-1">
          <MdOutlineArticle size={26} />
        </div>
        <div className="text-md text-center font-normal">
          {link.description}
        </div>
      </NavLink>
    </div>
  );

  const renderBlogItem = (item: NavContentsProps, index: number) => (
    <div
      key={item.name}
      className="group w-full relative bg-black/80 animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >

      <div className="relative p-8">
        <h3 className="text-white text-xl font-bold mb-4 group-hover:text-white/90 transition-colors duration-300">
          {item.label}
        </h3>
        <div className="flex overflow-x-auto py-4 gap-8 min-w-[150px]">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div key={item} className="min-w-[200px] xs:min-w-[300px] h-[200px] border">

            </div>
          ))}
        </div>

        <div className="mt-4 text-white/40 text-sm group-hover:text-white/60 transition-colors duration-300">
          Click to read more →
        </div>
      </div>
    </div>
  );

  const getDropdownContent = (tab: string | null) => {
    if (!tab) return null;

    const isCategories = tab === "categories";
    const data = isCategories ? categories : blogsAndResearch;
    const title = isCategories ? "Explore Categories" : "Latest Insights";
    const renderItem = isCategories ? renderCategoryItem : renderBlogItem;

    return (
      <div className="w-full space-y-8">
        <div className="text-center py-6 bg-black/90 sticky top-0 z-5">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 animate-fade-in-up">
            {title}
          </h2>
          <div className="w-24 h-1 bg-white/60 mx-auto rounded-full animate-fade-in-up" style={{ animationDelay: '100ms' }}></div>
        </div>

        <div className={`place-items-center 
          ${isCategories
            ? "grid md:grid-cols-2 pb-8 lg:grid-cols-4 gap-6"
            : "grid grid-cols-1 w-full gap-8"
          }
        `}>
          {data.map((item, index) => renderItem(item, index))}
        </div>

      </div>
    );
  };

  return (
    <div
      className={`
        hidden md:block backdrop-blur-2xl overflow-hidden border-t border-white/10
        transition-all duration-500 ease-out
        ${openDropdown
          ? "max-h-[600px] bg-black/90 opacity-100"
          : "max-h-0 bg-black/90 opacity-0"
        }
      `}
    >
      <div
        className={`transition-all max-h-[550px] overflow-y-auto duration-200 ease-out transform ${isTransitioning
          ? "opacity-0 translate-y-4 scale-98"
          : "opacity-100 translate-y-0 scale-100"
          }`}
      >
        {getDropdownContent(visibleContent)}
      </div>
    </div>
  );
}