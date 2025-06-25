'use client';
import { useState } from "react";
import { Button } from "../Shared/Button";
import { ArticleCard } from "./Shared/ArticleCard";
import { InsightContainer } from "./InsightContainer";

export function HomeList({articles, insights}:HomeListProps) {
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

    const categories = [
        'All', 'Blogs', 'Research'
    ];
    return (
        <div className=" pt-12">
            <h1 className="text-4xl ">{tab === 0 ? 'All': tab === 1 ? 'Blogs':'Research'}</h1>
            <div className="flex mt-6 items-center">
                {categories.map((category, index) => (
                    <Button
                        key={index}
                        onClick={() => changeTab(index)}
                        className={`relative border  text-2xl px-8 overflow-hidden transition-all duration-500
                    ${tab === index ? 'bg-white border-black text-black' : 'bg-black border-white text-white'}
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
            <div className="flex relative gap-0 flex-col md:flex-row">
                <div className="space-y-5 mt-6 md:mr-8 w-full grid grid-cols-1 place-items-center sm:block">
                    {currentData()?.map((article) => (
                            <ArticleCard isFeatured={false} key={article.id} article={article} />
                        ))}
                </div>
                <div className={`hidden md:block w-[2px] h-screen 
                bg-white sticky top-36`} />
                
                <InsightContainer dummyArticleList={currentDataInsights()}/>
            </div>
        </div>
    )
}