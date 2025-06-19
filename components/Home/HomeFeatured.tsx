import { Button } from "../Shared/Button";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import Link from "next/link";
import { animationCalss, shareSocials } from "./Constants/Data";
import { AuthorInfo } from "./Shared/AuthorInfo";



export function HomeFeatured({ articles }: HomeListProps) {
    const spotlightArticle = articles?.[0];
    const restArticles = articles?.slice(1) ?? [];

    return (
        <div className="">
            <h1 className="text-black text-4xl font-bold mb-6">
                Featured this Week
            </h1>
            <div className="flex flex-col md:flex-row gap-6 my-4  ">
                <div className={`${animationCalss} group relative shadow-[0_0_10px_rgba(100,100,100,0.4)] w-full h-screen flex hover:scale-102`}>
                    <div className="w-full md:w-1/2 md:h-full overflow-hidden relative">
                        <img
                            src={spotlightArticle?.image}
                            alt={spotlightArticle?.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                    </div>
                    <div className="absolute xs:right-0 z-5 bg-black/60 xs:bg-transparent w-full xs:w-[50%] h-full flex flex-col justify-between">
                        <div className={`${animationCalss} text-white xs:text-black 
                        flex flex-col justify-between
                         h-full text-center`}>
                            <div className="space-y-2 pt-2 group-hover:underline">
                                <h1 className="text-4xl">{spotlightArticle?.title}</h1>
                                <h1 className="text-md italic">{spotlightArticle?.sub_title}</h1>
                            </div>
                            <div className={`${animationCalss} space-y-2`}>
                                <p>Share</p>
                                <div className="flex justify-center gap-0">
                                    {shareSocials.map((social, index) => (
                                        <Link key={index} href={social.link}
                                            className={`${animationCalss} ${index < 3 ? 'border-r-0 border-2' : 'border-2'} text-md 
                                        p-1 text-black hover:text-white 
                                        bg-white  border-2 border-black
                                        hover:bg-black`}>
                                            {social.icon}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            <div className="p-1 text-white bg-black/70">
                                <AuthorInfo publish_date={spotlightArticle?.created_at ?? ''} author={spotlightArticle?.author ?? {full_name:'', id:'', avatar_url:''}}/>
                            </div>
                        </div>

                        <div className="bg-black p-4 pb-20">
                            <p className="text-justify h-[70%] pt-1.5 text-white line-clamp-9">
                                {spotlightArticle?.content}
                            </p>
                            <Link href={`#`}>

                                <Button className={`${animationCalss} border overflow-hidden group/button items-center 
        flex justify-between border-white mt-4 w-36 hover:bg-white
        hover:text-black hover:border-black hover:w-full`}>
                                    <span className="w-[70%] text-left">Read more</span>
                                    <div className={`h-[0.75px] -translate-x-100 bg-white -mr-2 
          w-0 opacity-0 group-hover/button:w-full
          group-hover/button:opacity-100 group-hover/button:translate-x-0 group-hover/button:bg-black ${animationCalss}`} />
                                    <MdOutlineKeyboardDoubleArrowRight className="text-3xl" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>


                <div className="flex text-black flex-col gap-8">
                    {restArticles.map((item) => (
                        <Link
                            key={item.id}
                            href="#"
                            className={`${animationCalss} group transition-all min-w-[350px] duration-300 hover:scale-105 
              shadow-[0_0_10px_rgba(100,100,100,0.4)]`}
                        >
                            <div className={` flex h-28 `}>
                                <img className={` w-20 h-full group-hover:scale-101`}
                                    src={item.image}
                                    alt={'top-article-this week'} />

                                <div className="relative pl-2 pb-6 w-full space-y-2 group-hover:underline underline-offset-2">
                                    <h3 className={`font-bold text-md`}>
                                        {item.title}
                                    </h3>
                                    <div className="absolute pl-2 bottom-0 left-2 right-2 text-sm flex justify-between">
                                        <p>By: Author's Name</p>
                                        <p>31/1/2000</p>
                                    </div>
                                </div>

                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}