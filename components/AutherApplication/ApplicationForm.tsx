'use client';

import { useState } from "react";
import { ActionButton } from "../Shared/ActionButton";
import { Divider } from "../Shared/Divider";
import { createClient } from "@/lib/supabase/client";
import { Dialog } from "../Shared/Dialog";

export function ApplicationForm({ user_id }: { user_id: string }) {
    const [data, setData] = useState<AuthorApplicationForm>({
        motivation: '',
        institution: '',
        blog_draft: ''
    });
    const [feedback, setFeedback] = useState({
        open: false,
        status: false,
        message: ''
    });
    function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }))
    }
    async function submit() {
        if (!data?.institution || !data?.motivation || !data?.blog_draft) {
            setFeedback({
                open: true,
                status: false,
                message: 'Please fill in all required fields.'
            });
            return;
        }
        if (data.motivation.length < 50) {
            setFeedback({
                open: true,
                status: false,
                message: 'Motivation must be at least 50 characters long.'
            });
            return;
        }
        if (data.blog_draft.length < 600) {
            setFeedback({
                open: true,
                status: false,
                message: 'Blog draft must be at least 600 characters long.'
            });
            return;
        }
        const supabase = await createClient();
        const { error } = await supabase.from('author_applications')
            .insert({ user_id, ...data })
            .select('*');
        if (error) {
            if(error.code === '23505'){
                setFeedback({
                open: true,
                status: false,
                message: 'You have already submitted an application, please wait while our team reviews it.'
            });
            return;
            }
            setFeedback({
                open: true,
                status: false,
                message: 'An error occurred while submitting the application. Please try again.'
            });
            return;
        }
        setFeedback({
            open: true,
            status: true,
            message: 'Application sent successfully!'
        });
    }

    return (
        <div className="w-[90%] border rounded-md
                       border-black h-full text-black bg-white">

            <p className="pt-4 bg-black/10 text-2xl font-semibold text-center">
                Let’s get to know you better.
            </p>
            <p className="bg-black/10 text-center">
                Please take a moment to answer a few questions below so we can understand your passion and perspective.
            </p>
            <Divider color="black" />
            <form className="my-4 p-3">
                <div className="flex flex-col md:flex-row gap-4 items-center m-2">
                    <label className="text-center" htmlFor="institution">
                        Institution (If not associated with any institution, write "NA")
                    </label>
                    <input type='text' name="institution" id="institution" onChange={onChange}
                        className='p-2 bg-white border text-center w-full border-black rounded-md' value={data?.institution} />
                </div>
                <div className="flex flex-col mt-4 gap-4 items-center m-2">
                    <label className="text-center w-full" htmlFor="motivation">Why do you want to Join us?</label>
                    <textarea name="motivation" id="motivation" onChange={onChange}
                        className='p-2 bg-white border text-center w-full border-black rounded-md' value={data?.motivation} />
                </div>
                <div className="flex flex-col mt-4 gap-4 items-center m-2">
                    <label className="text-center w-full" htmlFor="blog_draft">
                        Share a blog on any topic within the world of Indian law — it could be your opinion on a recent legal development, a critique or support of an existing law, or any issue you feel strongly about in the legal landscape.
                    </label>
                    <textarea rows={20} name="blog_draft" id="blog_draft" onChange={onChange}
                        className='p-2 bg-white border text-center w-full border-black rounded-md' value={data?.blog_draft} />
                </div>
                <div className="text-center w-full mt-6">
                    <ActionButton onClick={submit} type="button" className="rounded-md">
                        Submit
                    </ActionButton>
                </div>

            </form>
            <Dialog feedback={feedback} setFeedback={setFeedback}>
                <div className={`text-lg font-semibold text-center ${feedback.status ? 'text-green-600' : 'text-red-600'}`}>
                    {feedback.message}
                </div>
            </Dialog>
        </div>
    )
}