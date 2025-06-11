import { Button } from "../Shared/Button";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import Link from "next/link";
import { shareSocials } from "./Constants/Data";



export function HomeFeatured() {

    const animationCalss = 'transition-all duration-500 ease-in-out'
    return (
        <div className="">
            <h1 className="text-black text-4xl font-bold mb-6">
                Featured this Week
            </h1>
            <div className="flex flex-col md:flex-row gap-6 my-4">
                <div className={`${animationCalss} group relative w-full h-screen flex`}>
                    <img className={`${animationCalss} block h-full max-w-full xs:max-w-[50%] group-hover:max-w-[100%]`} src="/images/dummyImg.jpg" alt="..." />

                    <div className="absolute xs:right-0 z-5 bg-black/60 xs:bg-transparent w-full xs:w-[50%] h-full flex flex-col justify-between">
                        <div className={`${animationCalss} text-white xs:text-black 
                        flex flex-col justify-between
                        group-hover:text-white h-full text-center`}>
                            <div className="space-y-2 pt-2">
                                <h1 className="text-4xl">Heading</h1>
                                <h1 className="text-md italic">Sub-Heading</h1>
                            </div>
                            <div className={`${animationCalss} space-y-2`}>
                                <p>Share</p>
                                <div className="flex justify-center gap-0">
                                    {shareSocials.map((social, index) => (
                                        <Link key={index} href={social.link}
                                            className={`${animationCalss} ${index < 3 ? 'border-r-0 border-2' : 'border-2'} text-md 
                                        p-1 text-black group-hover:text-white 
                                        bg-white  border-2
                                        group-hover:bg-black group-hover:border-white`}>
                                            {social.icon}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            <div className={`h-16 italic bg-black/70 flex p-1 items-center 
                            justify-between group/author`}>
                                <div className={`flex gap-2 items-center`}>
                                    <img src="/images/dummyPp.jpg"
                                        className={`${animationCalss} w-10 h-10 border-2 
                                border-white 
                                rounded-full object-cover`} alt="Author's Face" />
                                    <div className={`${animationCalss}  text-white 
                                    space-y-2`}>
                                        <h2 className="text-md">Author's Name</h2>

                                    </div>
                                </div>

                                <p className="text-xs text-white">20/12/2020</p>
                            </div>
                        </div>

                        <div className="bg-black p-4">
                            <p className="text-justify h-[70%] pt-1.5 text-white line-clamp-9">
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit molestias delectus et asperiores! Velit, non adipisci vero culpa distinctio voluptatibus repellendus et fugiat aperiam quibusdam tenetur aut earum provident pariatur.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet provident, eligendi maxime, expedita similique officia molestias delectus maiores error odio ducimus neque earum consequuntur architecto eius magni consequatur facere quasi?
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda a saepe sit dolore unde repudiandae sint error eaque quia laboriosam ipsa eligendi dolorem sed, quos sapiente quidem eos rerum? Assumenda?
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


                <div className="flex text-black flex-col  gap-8">
                    {[1, 2, 3, 4, 5].map((item) => (
                        <Link
                            key={item}
                            href="#"
                            className={`${animationCalss} transition-all duration-300 hover:scale-105 
              hover:shadow-[0_0_10px_rgba(100,100,100,0.4)]`}
                        >
                            <div className={` flex h-24 `}>
                                <img className={` w-20 h-full`}
                                    src='/images/dummyImg.jpg'
                                    alt={'top-article-this week'} />

                                <div className="relative pl-2 pb-6 w-full space-y-2">
                                    <h3 className={`font-bold text-sm lg:text-md`}>
                                        {item} Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, accusantium expedita.
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