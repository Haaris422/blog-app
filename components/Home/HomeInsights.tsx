import { RxDoubleArrowDown, RxDoubleArrowUp } from "react-icons/rx"
import { Button } from "../Shared/Button"
import { animationCalss, dummyArticleList, shareSocials } from "./Constants/Data"
import { AuthorInfo } from "./Shared/AuthorInfo"
import { useState } from "react"
import Link from "next/link"
import { FaRegPaperPlane } from "react-icons/fa"

export function HomeInsights({ article }: ArticleCardProps) {
    const [showFull, setShowFull] = useState(false);
    const [showShare, setShowShare] = useState(false);

    return (
        <div className="max-w-[300px] my-4 border border-white ">
            {article.image && <div className="relative hidden xs:block max-w-44 md:max-w-[300px] border-b border-white">
                <img
                    src={article.image}
                    alt={`Image for ${article.title}`}
                    className="peer w-full h-full object-cover"
                />

                <div
                    className={`absolute ${animationCalss} peer-hover:opacity-40 top-2 left-2 text-sm ${article.category === "Blogs"
                            ? "text-black border border-black bg-white"
                            : "text-white border border-white bg-black"
                        } p-1.5`}
                >
                    {article.category === "Blogs" ? "Blog" : "Research"}
                </div>

                <div className="absolute grid grid-cols-1 gap-1 bottom-2 right-2 items-end">
                    {[...shareSocials].reverse().map((social, i) => (
                        <Button
                            key={social.name}
                            className={`border border-white bg-black text-white transition-all duration-500 ease-in-out
              ${showShare
                                    ? `opacity-100 translate-y-0 delay-${(shareSocials.length - i) * 100}`
                                    : "opacity-0 translate-y-2 pointer-events-none delay-0"
                                }`}
                        >
                            {social.icon}
                        </Button>
                    ))}

                    <Button
                        className="border border-white bg-black text-white"
                        onClick={() => setShowShare(!showShare)}
                    >
                        <FaRegPaperPlane />
                    </Button>
                </div>
            </div>}
            <div className="text-center text-white ">
                <div className="p-2">
                    <h3 className="text-2xl font-bold ">{article.title}</h3>
                </div>
                <p
                    className={`text-justify px-2 pb-2 overflow-hidden transition-all duration-500 ease-in-out
    ${showFull ? 'max-h-[12rem]' : 'max-h-[5rem]'}`}
                >                            {article.description}
                </p>
                <Button
                    onClick={() => setShowFull(!showFull)}
                    className={`relative border mt-2 text-2xl px-2 overflow-hidden transition-all duration-500
    ${showFull ? 'bg-white text-black border-black' : 'bg-black text-white border-white'}

    before:content-[''] before:absolute before:inset-0 
    before:transition-transform before:duration-500 before:z-0
    ${showFull
                            ? 'before:bg-black before:scale-y-0 before:origin-bottom hover:before:scale-y-100'
                            : 'before:bg-white before:scale-y-0 before:origin-top hover:before:scale-y-100'}

    ${showFull
                            ? 'hover:text-white hover:border-white'
                            : 'hover:text-black hover:border-black'}
  `}
                >
                    <span className="relative z-10">
                        {showFull ? <RxDoubleArrowUp size={22} /> : <RxDoubleArrowDown size={22} />}
                    </span>
                </Button>



                <div className="px-2">
                    <AuthorInfo />
                </div>

            </div>
        </div>

    )
}