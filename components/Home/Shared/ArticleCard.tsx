import Link from "next/link";
import { AuthorInfo } from "./AuthorInfo";
import { animationCalss } from "../Constants/Data";

export function ArticleCard({ className, article, isFeatured }: ArticleCardProps) {
  return (
    <div
      key={article.id}
      className={`flex w-full bg-white transition-all duration-300 ease-in-out hover:shadow-[0_0_10px_rgba(100,100,100,0.4)] hover:scale-105`}
    >
      <div className="relative hidden xs:block max-w-44 md:max-w-52">
        <img
          src={article.image}
          alt={`Image for ${article.title}`}
          className="peer w-full h-full object-cover"
        />
        <div
          className={`${animationCalss} peer-hover:opacity-40 absolute top-2 left-2 text-sm ${
            article.category === "Blogs"
              ? "text-black border border-black bg-white"
              : "text-white border border-white bg-black"
          } p-1.5`}
        >
          {article.category === "Blogs" ? "Blog" : "Research"}
        </div>
      </div>

      <div className="w-full h-full text-black p-2">
        <div className="flex justify-between">
          <Link href={article.link} className={`${animationCalss} hover:underline`}>
            <h2 className="text-2xl font-bold">{article.title}</h2>
          </Link>
        </div>

        <h3 className="text-sm italic">{article.subTitle}</h3>
        <p className="text-justify h-[70%] pt-4 line-clamp-3">{article.description}</p>

        <div className="mt-2">
          <AuthorInfo />
        </div>
      </div>
    </div>
  );
}
