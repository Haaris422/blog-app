import { HomeFeatured } from "@/components/Home/HomeFeatured";
import { HomeList } from "@/components/Home/HomeList";
import { getArticles } from "./actions";

export default async function Home() {
  const tempArticles = await getArticles();
  const insights = tempArticles?.filter((article) =>(article.isInsight)) || null;
  const articles = tempArticles?.filter((article) =>(!article.isInsight));
  const featuredArticles = articles?.filter((item) => item.isFeatured) || null;
  console.log('Home: articles & insights: ', articles, insights)
  return (
    <div>
      <div className="pt-40 pb-10 px-4 xs:px-8 lg:px-20 font-girassol w-full h-full bg-white">
        <HomeFeatured articles={featuredArticles}/>
      </div>
      <div className="px-4 pb-10 xs:px-8 lg:px-20 font-girassol w-full h-full bg-black">
        <HomeList articles={articles ?? null} insights={insights}/>
      </div>
    </div>

  );
}
