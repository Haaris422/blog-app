import { animationCalss } from "../Constants/Data";

export function AuthorInfo({ author, publish_date }: AuthorInfoProps) {
    function cleanDate(publishDate: string) {
        const date = new Date(publishDate);
        const now = new Date();

        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const isPM = hours >= 12;
        const formattedHour = (hours % 12) || 12;
        const time = `${formattedHour}:${minutes} ${isPM ? 'PM' : 'AM'}`;
        if (year === now.getFullYear()) {
            return `${day} ${month}, ${time}`;
        } else {
            return `${day} ${month} ${year}, ${time}`;
        }

    }

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