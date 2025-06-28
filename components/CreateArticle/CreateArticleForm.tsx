'use client';

import { animationCalss } from "../Home/Constants/Data";

export function CreateArticleForm({ categories, types }: {
    categories: GroupProps;
    types: GroupProps;
}) {
    return (
        <div className="w-full md:w-[80%] shadow-[0_0_10px_rgba(100,100,100,0.4)]">
            <div className="space-y-1 p-2 ">
                <input placeholder="title" className="text-4xl p-2 w-full border-black border rounded-md font-bold underline-offset-2 underline" />
                <input placeholder="sub_title" className="text-lg p-2 w-full border-black border  rounded-md italic text-gray-700" />

                <div className="flex my-2 justify-between">

                    <div
                        className={`${animationCalss} rounded-md text-sm ${"text-white border border-white bg-black"
                            } p-1.5`}
                    >
                    </div>
                    <div
                        className={`${animationCalss} rounded-md text-sm ${"text-white border border-white bg-black"
                            } p-1.5`}
                    >
                    </div>
                </div>
                <div className="flex items-center justify-between">



                </div>
                <img src={'/images/dummyImg.jpg'} className="my-8 w-full h-full" />
                <p className="mt-10 text-lg">
                </p>
            </div>
        </div>
    )
}