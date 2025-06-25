import { cleanDate } from "@/lib/date";
import { animationCalss } from "../Constants/Data";

export function AuthorInfo({ author, publish_date }: AuthorInfoProps) {
    

    const displayDate = cleanDate(publish_date);
    return (
        <div className={`h-16 italic  flex items-center 
                                    justify-between group/author`}>
            <div className={`flex gap-2 items-center`}>
                <img src={author.avatar_url}
                    className={`${animationCalss} w-10 h-10 border-2 
                                        border-black 
                                        rounded-full object-cover`} alt="Author's Face" />
                <div className={`${animationCalss}  
                                            space-y-2`}>
                    <h2 className="text-md">{author?.full_name}</h2>

                </div>
            </div>

            <p className="text-xs">{displayDate}</p>
        </div>
    )
}