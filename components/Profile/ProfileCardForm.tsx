'use client'
import { useState } from "react";
import { socials } from "./Constants/Data";
import { createClient } from "@/lib/supabase/client";
import { ActionButton } from "../Shared/ActionButton";
import { BiEdit } from "react-icons/bi";
import { FaArrowUp } from "react-icons/fa";

export function ProfileCardForm({ profile }: ProfileCardProps) {
    const [profileData, setProfileData] = useState<ProfileProps>({
        ...profile,
        dob: profile.dob ?? "",
        bio: profile.bio ?? "",
        email: profile.email ?? "",
        full_name: profile.full_name ?? "",
        instagram: profile.instagram ?? "",
        x: profile.x ?? "",
        linkedIn: profile.linkedIn ?? ""
    });

    const [disabled, setDisabled] = useState(true);

    function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        console.log('ProfileCardForm: onChange: name, value: ', name, value);
        setProfileData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    async function onSubmit() {
        if (disabled) {
            setDisabled(false);
            return
        }
        const supabase = createClient();

        const profileResponse = await supabase.
            from('profiles').update(profileData).eq('id', profile.id).select();
console.log('ProfileCardForm: onSubmit: Updated profile:', profileResponse.data);

        if (profileResponse.error) {
            console.log('ProfileCardForm: onSubmit: profile.error: ', profileResponse.error)
            return alert('A Profile Error Occured, please try again.')
        }

        if (profileData.email !== profile.email) {
            const authResponse = await supabase.auth.updateUser({
                email: profileData.email
            })

            if (authResponse.error) {
                return alert('A User Error Occured, please try again.')
            }
        }


        setDisabled(true);
        return alert('SUCCESSS BITCH')
    }

    return (
        <form>
            <div className="flex py-4 w-full gap-4 flex-wrap justify-center lg:justify-between">
                <div className="flex flex-col">
                    <label className="text-center" htmlFor="full_name">Name</label>
                    <input type='text' name="full_name" id="full_name" onChange={onChange}
                        className='p-2 bg-white border text-center 
                                               border-black rounded-md' disabled={disabled} value={profileData.full_name} />
                </div>
                <div className="flex flex-col">
                    <label className="text-center" htmlFor="dob">Date of Brith</label>
                    <input type='date' id="dob" name="dob" onChange={onChange}
                        className='p-2 bg-white border text-center 
                                               border-black rounded-md'  value={profileData.dob} />
                </div>
                <div className="flex flex-col">
                    <label className="text-center" htmlFor="full_name">Email</label>
                    <input type='text' id="full_name" name="email" onChange={onChange}
                        className='p-2 bg-white border text-center 
                                               border-black rounded-md' disabled={disabled} value={profileData.email} />
                </div>
            </div>
            <div className="flex flex-col py-4">
                <label className="text-center" htmlFor="bio">Bio</label>
                <textarea disabled={disabled}
                    name="bio"
                    onChange={onChange} value={profileData.bio}
                    className='p-2 bg-white border text-center 
                                               border-black rounded-md'/>
            </div>
            <div className="py-4">
                <p className="text-center">Socials</p>
                <div className="flex pt-2 flex-wrap w-full gap-4 justify-center lg:justify-between">
                    {socials.map((social) => (
                        <div key={social.label} className="flex gap-2 pl-2
                                                       rounded-md items-center
                                                       border  border-black">
                            <social.icon size={22} />
                            <input placeholder={social.label} name={social.label}
                                disabled={disabled} onChange={onChange}
                                value={profileData[social.label]}
                                className='p-2 bg-white rounded-l-none text-center rounded-md'
                                type='url' />
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-full flex justify-center pt-4">
                <ActionButton
                    type='button'
                    onClick={onSubmit}
                    className={`rounded-md mb-5`}>
                    <span className="flex gap-2">
                        {disabled ? <BiEdit size={22} /> : <FaArrowUp size={22} />}
                        {disabled ? 'Edit' : 'Update'} Profile
                    </span>
                </ActionButton>
            </div>
        </form>
    )
}