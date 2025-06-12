'use client';
import { useState } from "react";
import { Button } from "../Shared/Button";
import { ArticleCard } from "./Shared/ArticleCard";
import { dummyArticleList } from "./Constants/Data";
import { HomeInsights } from "./HomeInsights";
import { InsightContainer } from "./InsightContainer";

export function HomeList() {
    const [tab, setTab] = useState<string>('All');
    function changeTab(clickedTab: string) {
        setTab(clickedTab);
    }


    const categories = [
        'All', 'Blogs', 'Research'
    ];
    return (
        <div className=" pt-12">
            <h1 className="text-4xl ">{tab}</h1>
            <div className="flex mt-6 items-center">
                {categories.map((category) => (
                    <Button
                        key={category}
                        onClick={() => changeTab(category)}
                        className={`relative border  text-2xl px-8 overflow-hidden transition-all duration-500
                    ${tab === category ? 'bg-white border-black text-black' : 'bg-black border-white text-white'}
                    before:content-[''] before:absolute before:inset-0 before:bg-white 
                    before:scale-x-0 before:origin-left before:transition-transform before:duration-500
                    hover:before:scale-x-100
                    hover:text-black hover:border-black
                    `}>
                        <span className="relative z-10">{category}</span>
                    </Button>


                ))}
            </div>
            <div className="w-full h-[1px] bg-white" />
            <div className="flex relative justify-between flex-col md:flex-row">
                <div className="space-y-5 mt-6 mr-8">
                    {dummyArticleList.filter((article) =>
                        tab === 'All' || article.category === tab
                    )
                        .map((article) => (
                            <ArticleCard isFeatured={false} key={article.id} article={article} />
                        ))}
                </div>
                <div className="w-[2px] h-screen bg-white sticky top-36" />
                
                <InsightContainer/>
            </div>
        </div>
    )
}