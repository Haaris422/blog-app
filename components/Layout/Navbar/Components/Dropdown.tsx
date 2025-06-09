import { useEffect, useState } from "react";
import { blogsAndResearch, categories } from "../Constants/Data";
import { NavLink } from "./NavLink";
import { DropdownProps } from "../Constants/Types";



export function Dropdown({ openDropdown }: DropdownProps) {
  const [visible, setVisible] = useState(false);
  const [currentDropdown, setCurrentDropdown] = useState<string | null>(null);

  useEffect(() => {
    if (openDropdown) {
      setCurrentDropdown(openDropdown);
      setVisible(true);
    } else {
      setVisible(false);
      const timeout = setTimeout(() => {
        setCurrentDropdown(null);
      }, 300);

      return () => clearTimeout(timeout);
    }
  }, [openDropdown]);

  const items = currentDropdown === "categories" ? categories : blogsAndResearch;

  const baseClasses =
    "transition-all duration-300 ease-in-out overflow-hidden font-typewriter ";

  if (currentDropdown === "categories") {
    return (
      <div
  className={`${baseClasses} hidden text-center md:grid grid-cols-4 gap-8 ${
    visible
      ? "max-h-[500px] bg-black/80 px-24 backdrop-blur-2xl py-10 opacity-100"
      : "max-h-0 p-0 opacity-0"
  }`}
>
  

        {items.map((item) => (
          <NavLink
            underline={false}
            key={item.name}
            navItem={item}
            className="text-white!"
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    );
  } else {
    return (
      <div
  className={`${baseClasses} hidden overflow-auto md:block space-y-4 ${
    visible
      ? "max-h-[600px] bg-black/80 px-36 backdrop-blur-2xl py-10 opacity-100"
      : "max-h-0 p-0 opacity-0"
  }`}
>
        {items.map((item) => (
          <div key={item.name}>
            <h2 className="text-white text-2xl">{item.label}</h2>
            <div className="w-full">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
              at tempora a laborum vero natus, odio magni. Laborum commodi
              delectus voluptate. Sunt nostrum rem, numquam iste cum pariatur
              excepturi nobis!
            </div>
          </div>
        ))}
      </div>
    );
  }
}
