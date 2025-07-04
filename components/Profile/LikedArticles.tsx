'use client';
import { ActionButton } from "../Shared/ActionButton";
import { PiPlusBold } from "react-icons/pi";
import Link from "next/link";
import { animationCalss } from "../Home/Constants/Data";
import { AuthorInfo } from "../Home/Shared/AuthorInfo";
import { PostgrestError } from "@supabase/supabase-js";
import { Button } from "../Shared/Button";
import { useState } from "react";
import { Divider } from "../Shared/Divider";
import { InsightContainer } from "../Home/InsightContainer";
import { CgArrowTopRight } from "react-icons/cg";
interface WrittenArticlesProps {
    author: AuthorProps;
    articles: ArticleProps[];
    error: PostgrestError | null;
    insights: ArticleProps[];
}
export function LikedArticles({ error, insights, articles, author }: WrittenArticlesProps) {

    if (error || articles.length === 0) {
        return(
<div className="text-black">
            <div className="flex justify-between">
                <h1 className="text-4xl font-bold">Liked Articles</h1>

                <ActionButton className=""><CgArrowTopRight size={22} /></ActionButton>

            </div>
            <p className="">
                No Articles Liked yet.
            </p>
        </div>
        )
        
    }
    const categories = [
        'All', 'Blogs', 'Research'
    ];
    const [tab, setTab] = useState<number>(0);
    function changeTab(clickedTab: number) {
        setTab(clickedTab);
    }

    function currentData() {

        return articles ? articles.filter((article) =>
            tab === 0 || article.type_id === tab
        ) : [];
    }

    function currentDataInsights() {

        return insights ? insights.filter((article) =>
            tab === 0 || article.type_id === tab
        ) : [];
    }
    return (
        <div className="text-black">
            <div className="flex gap-2 flex-col md:flex-row items-center justify-between">
                <h1 className="text-4xl font-bold">Liked Articles</h1>
                <div className="flex items-center">
                    {categories.map((category, index) => (
                        <Button
                            key={index}
                            onClick={() => changeTab(index)}
                            className={`relative border text-sm xs:text-md xs:py-[12px] px-8 overflow-hidden transition-all duration-500
                                    ${tab === index ? 'bg-black border-white text-white' : 'bg-white border-black text-black'}
                                    before:content-[''] before:absolute before:inset-0 before:bg-black 
                                    before:scale-x-0 before:origin-left before:transition-transform before:duration-500
                                    hover:before:scale-x-100
                                    hover:text-white hover:border-gray-400
                                    `}>
                            <span className="relative z-10">{category}</span>
                        </Button>


                    ))}

                </div>
            </div>
            <Divider variant="horizontal" color="black" />
            <div className="flex flex-col md:flex-row md:justify-between">
                <div className="my-8 max-w-full md:w-[100%] gap-4 mr-6 py-4 flex h-full overflow-x-auto">
                    {currentData()?.map((article) => (
                        <Link href={'#'}
                            className={`${animationCalss} ml-2 group hover:scale-105 h-[600px] w-[300px] border-black border`}
                            key={article.id}>
                            <div className="relative">
                                <img className="peer w-[300px] h-[300px]"
                                    src={article.image} />
                                <div
                                    className={`${animationCalss} peer-hover:opacity-40 absolute top-2 left-2 text-sm ${article.type_id === 1
                                        ? "text-black border border-black bg-white"
                                        : "text-white border border-white bg-black"
                                        } p-1.5`}
                                >
                                    {article.type_id === 1 ? "Blog" : "Research"}
                                </div>
                            </div>
                            <div className='p-2 min-h-[300px] justify-between flex flex-col'>
                                <div className={`${animationCalss} text-center space-y-2 pb-4 
                            group-hover:underline underline-offset-2`}>
                                    <h2 className="text-2xl">{article.title}</h2>
                                    <h2 className="text-md">{article.sub_title}</h2>
                                </div>
                                <div className="m-auto">
                                    <p className={`line-clamp-3`}>{article.content}</p>
                                    <AuthorInfo author={author} publish_date={article.created_at} />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                <Divider variant="vertical" color="black" />
                <InsightContainer alt={true} dummyArticleList={currentDataInsights()} />

            </div>
        </div>
    )
}