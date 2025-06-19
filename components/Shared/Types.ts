interface DialogProps{
    children: React.ReactNode;
    className?:string;
    open:boolean;
    setOpen:React.Dispatch<React.SetStateAction<boolean>>;
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children:React.ReactNode;
    className?:string
}

interface DividerProps{
    variant?: "horizontal" | "vertical";
    color:string;
    className?:string;
}

interface ProfileProps{
    user?:{
    avatar_url?:string;
    created_at?:string;
    id?:string;
    full_name?:string;
    role?:string;
    }
    
}