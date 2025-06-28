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
interface CommentsProps {
    author: AuthorProps;
    comments: UserCommentsProps[];
    error: PostgrestError | null;
}
export function UserComments({ error, comments, author }: CommentsProps) {

    if (error) {
        <div className="text-white">
            <div className="flex justify-between">
                <h1 className="text-4xl font-bold">Comments</h1>

                <ActionButton className=""><PiPlusBold size={22} /></ActionButton>

            </div>
            <p className="">
                No Articles written yet.
            </p>
        </div>
    }
    const categories = [
        'All', 'Blogs', 'Research'
    ];
    const [tab, setTab] = useState<number>(0);
    function changeTab(clickedTab: number) {
        setTab(clickedTab);
    }

   
     
    return (
        <div className="text-white">
            <div className="flex gap-2 flex-col md:flex-row items-center justify-between">
                <h1 className="text-4xl font-bold">Comments</h1>
                
            </div>
            <Divider variant="horizontal" color="white" />
            <div className="flex flex-col md:flex-row">
                <div className="my-8 gap-4 py-4 mr-6 w-full flex h-full overflow-x-auto">
                    {comments.map((comment) => (
                        <Link href={`articles/${comment.article?.slug}`}
                            className={`${animationCalss} ml-2 group hover:scale-105 min-w-[300px] border-white border`}
                            key={comment.id}>
                            
                            <div className='p-2 min-h-[300px] justify-between flex flex-col'>
                                <div className={`${animationCalss} text-center space-y-2 
                            group-hover:underline underline-offset-2`}>
                                    <h2 className="text-2xl">{comment?.article?.title}</h2>
                                </div>
                                <div className="m-auto bg-white p-4 text-black">
                                    <p className={`line-clamp-3`}>{comment.content}</p>
                                    <AuthorInfo author={author} publish_date={comment.created_at} />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </div>
    )
}