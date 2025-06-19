interface SocialsProps {
    name:string;
    icon:React.ReactElement;
    link:string;
}

interface ArticleProps {
  id: number;
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

interface AuthorInfoProps{
   author:{
    id:string;
    full_name:string;
    avatar_url:string;
  };
  publish_date:string;
}