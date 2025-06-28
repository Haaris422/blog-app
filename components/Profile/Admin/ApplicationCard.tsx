'use client';
import { animationCalss } from "@/components/Home/Constants/Data";
import { AuthorInfo } from "@/components/Home/Shared/AuthorInfo";
import { ActionButton } from "@/components/Shared/ActionButton";
import { Dialog } from "@/components/Shared/Dialog";
import { Divider } from "@/components/Shared/Divider";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";

export function ApplicationCard({ application }: { application: AuthorApplicationForm }) {
    const [feedback, setFeedback] = useState({
        open: false,
        status: false,
        message: ''
    });
    function openDialog() {
        setFeedback({
            open: true,
            status: false,
            message: ''
        });
    }
    async function submit(decision: 'approved' | 'denied') {
        const supabase = await createClient();

        const { error: appError } = await supabase
            .from('author_applications')
            .update({ status: decision })
            .eq('id', application.id);

        if (appError) {
            return setFeedback({
                open: true,
                status: false,
                message: 'Failed to update application status. Please try again.',
            });
        }
        const response = await supabase
            .from('profiles')
            .update({ role: decision === 'approved'?'author':'reader' })
            .eq('id', application.user_id).select('*');
        console.log('Application Card: submit: profile response', response)
        if (response.error) {
            return setFeedback({
                open: true,
                status: false,
                message: 'Application approved, but failed to update user role.',
            });
        }


        setFeedback({
            open: true,
            status: true,
            message: `Application successfully ${decision}.`,
        });
    }

    return (
        <>
            <div onClick={openDialog} className={`${animationCalss} hover:scale-105 cursor-pointer max-w-[300px] py-2 px-4 max-h-[400px] text-black bg-white rounded-md`}>
                {(application.author && application.created_at) && <AuthorInfo author={application.author} publish_date={application.created_at} />}
            </div>
            <Dialog feedback={feedback} setFeedback={setFeedback}>
                <div className="flex justify-between gap-4 items-center">
                    <div className="w-full">
                        {(application.author && application.created_at) && <AuthorInfo author={application.author} publish_date={application.created_at} />}
                    </div>
                    <ActionButton disabled={application.status == 'approved'} onClick={() => submit('approved')} className="min-w-[100px]">
                        Approve
                    </ActionButton>
                    <ActionButton disabled={application.status == 'denied'} onClick={() => submit('denied')} alt={false} className="min-w-[60px]">
                        Deny
                    </ActionButton>
                </div>
                <div className={`text-lg font-semibold text-center ${feedback.status ? 'text-green-600' : 'text-red-600'}`}>
                    {feedback.message}
                </div>
                <Divider color="black" />
                <div className="space-y-8 pb-18 pt-4 px-2">

                    <div className="flex flex-col justify-between sm:flex-row">
                        <p>
                            Institution:
                        </p>
                        <p>
                            {application.institution}
                        </p>
                    </div>
                    <div className="flex flex-col justify-between sm:flex-row">
                        <p>
                            Motivation:
                        </p>
                        <p className="sm:max-w-[400px] text-justify">
                            {application.motivation}
                        </p>
                    </div>
                    <div className="flex flex-col justify-between sm:flex-row">
                        <p>
                            Sample:
                        </p>
                        <p className="sm:max-w-[400px] text-justify">
                            {application.blog_draft}
                        </p>
                    </div>

                </div>
            </Dialog>
        </>
    )
}