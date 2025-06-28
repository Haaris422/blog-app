import { ApplicationForm } from "@/components/AutherApplication/ApplicationForm";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AuthorApplicationPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect('/');
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
    const profile: ProfileProps = data;
    if (profile.role !== 'reader') redirect('/');
    return (
        <div className='pt-42 font-girassol pb-10 flex flex-col md:flex-row bg-black text-white h-full w-full'>
            <div className="my-8 w-full md:max-w-full md:sticky md:top-42 self-start">
                <h1 className="text-4xl text-center font-bold my-4">Write for Us!</h1>

                <div className="max-w-3xl space-y-10 mx-auto mt-4 px-4 text-center text-lg leading-relaxed">
                    <p>
                        At <strong>Kanoon.com</strong>, we're building a community of passionate law students, budding writers, and curious minds who are eager to share their perspectives on the Indian legal landscape.
                    </p>
                    <p className="mt-4">
                        Whether you're deeply involved in legal research, have unique insights into current developments, or simply love writing — we'd love to hear from you. This is your chance to get published, reach a wide audience, and be a part of something impactful.
                    </p>

                </div>
            </div>

            <div className="flex justify-center my-8 w-full">
                <ApplicationForm user_id={user.id}/>
            </div>
        </div>
    )
}
