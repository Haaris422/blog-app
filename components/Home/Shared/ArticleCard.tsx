import Link from "next/link";
import { AuthorInfo } from "./AuthorInfo";
import { animationCalss } from "../Constants/Data";

export function ArticleCard({ className, article, isFeatured }: ArticleCardProps) {
  return (
    <div
      key={article.id}
      className={`flex max-w-[1000px] max-h-[250px] shadow-[0px_0px_10px_rgba(255,255,255,0.9)] bg-white/90 transition-all duration-300 ease-in-out hover:scale-105`}
    >
      <div className="relative max-w-44 md:max-w-52">
        <img
          src={article.image}
          alt={`Image for ${article.title}`}
          className="peer w-full h-full object-cover"
        />
        <div
          className={`${animationCalss} peer-hover:opacity-40 absolute top-2 left-2 text-sm ${article.type_id === 1
              ? "text-black border border-black bg-white"
              : "text-white border border-white bg-black"
            } p-1.5`}
        >
          {article.type_id === 1 ? "Blog" : "Research"}
        </div>
      </div>

      <div className="w-full flex justify-between flex-col max-h-[100%] text-black p-2">
        <div className="">
          <Link href={'#'} className={`${animationCalss} text-2xl font-bold hover:underline`}>
            {article.title}
          </Link>
          <h3 className="text-sm italic">{article.sub_title}</h3>
        </div>
            <div>
        <p className="text-justify h-full pt-4 line-clamp-3">{article.content}</p>
</div>
        <div className="mt-2">
          <AuthorInfo author={article.author} publish_date={article.created_at} />
        </div>
      </div>
    </div>
  );
}
