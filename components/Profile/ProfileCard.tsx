import { cleanDate } from "@/lib/date";
import { BiCamera, BiEdit } from "react-icons/bi";
import { ActionButton } from "../Shared/ActionButton";
import { socials } from "./Constants/Data";
import { Socials } from "./Socials";
import { ProfileCardForm } from "./ProfileCardForm";
import { ProfileCardImage } from "./ProfileCardImage";


export function ProfileCard({ profile }: ProfileCardProps) {
    return (
        <div className="w-full  h-full 
                   flex justify-center
                   mt-40 relative">
            <ProfileCardImage profile={profile}/>
            <div className="w-[90%] sm:w-[80%] lg:w-[55%] border rounded-md
                       border-black h-full text-black bg-white">
                <div className="rounded-md relative text-center bg-black/5">
                    <div className="flex w-full justify-center gap-4 
                               sm:justify-between items-center absolute 
                               top-[90px] left-[50%] 
                       translate-x-[-50%] 
                               sm:relative 
                               p-2">
                        <p className={`text-md text-center rounded-md ${profile.role === 'author'
                            ? "text-black border border-black bg-white"
                            : "text-white border border-white bg-black"
                            } p-1.5`}>
                            {profile.role}
                        </p>
                        <p className={`text-md text-center rounded-md ${profile.role !== 'author'
                            ? "text-black border border-black bg-white"
                            : "text-white border border-white bg-black"
                            } p-1.5`}>
                            {cleanDate(profile.created_at || '')}
                        </p>
                    </div>
                    <div className="pt-[150px] sm:pt-[100px] p-4 flex gap-4 justify-center">
                        <Socials profile={profile} />

                    </div>

                </div>
                <div className="p-6">
                    <h2 className="text-center text-2xl ">Information</h2>
                    <ProfileCardForm profile={profile} />
                </div>
            </div>

        </div>
    )
}