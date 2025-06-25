interface SocialsProps {
    name:string;
    icon:React.ReactElement;
    link:string;
}



interface HomeListProps {
    articles:ArticleProps[] | null;
    insights?:ArticleProps[] | null;
}

interface ArticleCardProps{
    className?: string;
    isFeatured?:boolean;
    article:ArticleProps;
}
interface AuthorProps{
    id?:string;
    role?:string;
    full_name:string;
    avatar_url:string;
  };
interface AuthorInfoProps{
   author:AuthorProps;
  publish_date:string;
}