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