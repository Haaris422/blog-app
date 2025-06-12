import { animationCalss } from "../Constants/Data";

export function AuthorInfo() {
    return (
        <div className={`h-16 italic  flex items-center 
                                    justify-between group/author`}>
            <div className={`flex gap-2 items-center`}>
                <img src="/images/dummyPp.jpg"
                    className={`${animationCalss} w-10 h-10 border-2 
                                        border-black 
                                        rounded-full object-cover`} alt="Author's Face" />
                <div className={`${animationCalss}  
                                            space-y-2`}>
                    <h2 className="text-md">Author's Name</h2>

                </div>
            </div>

            <p className="text-xs">20/12/2020</p>
        </div>
    )
}