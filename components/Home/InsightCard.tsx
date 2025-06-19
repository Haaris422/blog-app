import { Button } from "../Shared/Button"
import { Dialog } from "../Shared/Dialog"
import { animationCalss, shareSocials } from "./Constants/Data"
import { AuthorInfo } from "./Shared/AuthorInfo"
import { useState } from "react"
import { FaRegPaperPlane } from "react-icons/fa"

export function InsightCard({ article }: ArticleCardProps) {
    const [showShare, setShowShare] = useState(false);
    return (
        <>
        <div className={`${animationCalss} relative shadow-[0px_0px_10px_rgba(255,255,255,0.9)] max-w-[300px] hover:scale-105 group cursor-pointer -mt-32 border border-white `}>
            <div className="relative max-w-[300px]  border-b border-white">
                <img
                    src={article.image}
                    alt={`Image for ${article.title}`}
                    className="peer w-full object-cover -z-5"
                />

                <div
                    className={`absolute ${animationCalss} peer-hover:opacity-40 top-2 left-2 text-sm ${article.type_id === 1
                        ? "text-black border border-black bg-white"
                        : "text-white border border-white bg-black"
                        } p-1.5`}
                >
                    {article.type_id === 1 ? "Blog" : "Research"}
                </div>

                <div className="absolute grid grid-cols-1 gap-1 z-100 top-2 right-2">
                    <Button
                        className="border border-white bg-black text-white"
                        onClick={() => setShowShare(!showShare)}
                    >
                        <FaRegPaperPlane />
                    </Button>
                    {[...shareSocials].reverse().map((social, i) => (
                        <Button
                            key={social.name}
                            className={`border border-white bg-black text-white ${animationCalss}
              ${showShare
                                    ? `opacity-100 translate-y-0 delay-${(shareSocials.length - i) * 100}`
                                    : "opacity-0 translate-y-2 pointer-events-none delay-0"
                                }`}
                        >
                            {social.icon}
                        </Button>
                    ))}

                    
                </div>
            </div>
            <div className="absolute bottom-0 text-left z-50 w-full text-white ">
                <div className="p-2">
                    <h3 className="text-2xl font-bold ">{article.title}</h3>
                </div>
                <div className="px-2 w-full">
                    <AuthorInfo author={article.author} publish_date={article.created_at}/>
                </div>

            </div>
            
        </div>
        
            </>

    )
}