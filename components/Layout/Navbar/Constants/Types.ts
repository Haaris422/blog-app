export interface NavItems {
    label: string;
    name: string;
}

export interface NavLinkProps{
    navItem:NavItems;
    children: React.ReactNode;
    className?: string;
    underline?:boolean;
}

export interface SideNavAreaProps {
    openDropdown: string|null;
}

export interface DropdownProps {
  openDropdown: string | null;
}

export interface NavContentsProps extends NavItems{
  image?: string;
  description?: string;
}

