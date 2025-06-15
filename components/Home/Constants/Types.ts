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
  created_at: string;
  sub_title: string;
  isInsight: boolean;
  isFeatured: boolean;
}

interface HomeListProps {
    articles:ArticleProps[] | null;
}

interface ArticleCardProps{
    className?: string;
    isFeatured?:boolean;
    article:ArticleProps;
}