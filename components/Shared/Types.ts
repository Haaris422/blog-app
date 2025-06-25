interface DialogProps {
    children: React.ReactNode;
    className?: string;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string
}

interface DividerProps {
    variant?: "horizontal" | "vertical";
    color: string;
    className?: string;
}
interface ProfileProps {
    avatar_url?: string;
    created_at?: string;
    id?: string;
    full_name?: string;
    role?: string;
    dob?: string;
    email?: string;
    bio?: string;
    instagram?: string;
    x?: string;
    linkedIn?: string;
}
interface NavbarProps {
    user?: ProfileProps;

}
interface ArticleProps {
  id: string;
  category?: {
    id:number;
    name:string;
  };
  title: string;
  content: string;
  image: string;
  type_id: number;
  category_id: number;
  author_id: string;
  author:{
    id:string;
    full_name:string;
    avatar_url:string;
  };
  created_at: string;
  sub_title: string;
  isInsight: boolean;
  isFeatured: boolean;
  slug?:string;
}

interface UserCommentsProps{
    content:string;
    created_at:string;
    deleted?:boolean;
    id:string;
    article_id:string;
    user_id:string;
    parent_id?:null | string;
    user:{
        avatar_url:string;
        full_name:string;
        id:string;
        role:string;
    }
}

interface LikeProps{
    id:string;
    article_id:string;
    comment_id?:string;
    user_id:string;
    created_at:string;
}