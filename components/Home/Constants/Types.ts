interface SocialsProps {
    name:string;
    icon:React.ReactElement;
    link:string;
}

interface ArticleProps{
    id:number;
    link:string;
    title:string;
    image:string;
    subTitle:string;
    description:string;
    category:string;
}

interface ArticleCardProps{
    className?: string;
    isFeatured?:boolean;
    article:ArticleProps;
}