import { LikedArticles } from "@/components/Profile/LikedArticles";
import { ProfileCard } from "@/components/Profile/ProfileCard";
import { WrittenArticles } from "@/components/Profile/WrittenArticles";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getAuthorArticles, getLikedArticles, getUserApplication, getUserComments } from "./actions";
import { UserComments } from "@/components/Profile/Comments";
import Link from "next/link";
import { AdminApplications } from "@/components/Profile/Admin/AdminApplications";

export default async function ProfilePage() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect('/login');

    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
    const profile: ProfileProps = data;
    if (!profile) redirect('/error');
    const { data: tempArticles, error: articlesError } = await getAuthorArticles(profile.id ?? '');
    const { data: tempLikedArticles, error: likedArticlesError } = await getLikedArticles(profile.id ?? '');
    const { data: comments, error: commentsError } = await getUserComments(profile.id ?? '');
    const { data: application, error: applicationError } = await getUserApplication(profile.id ?? '', profile.role ?? '');
    console.log('profile: getUserApplication: ', application)

    const author: AuthorProps = {
        id: profile.id ?? '',
        avatar_url: profile.avatar_url ?? '',
        full_name: profile.full_name ?? ''
    }

    const insights = tempArticles?.filter((article) => (article.isInsight)) || null;
    const articles = tempArticles?.filter((article) => (!article.isInsight));
    const likedInsights = tempLikedArticles?.filter((article) => (article.isInsight)) || null;
    const likedArticles = tempLikedArticles?.filter((article) => (!article.isInsight));
    console.log('profile: liked data: ', tempLikedArticles, likedArticles, likedInsights)
    return (
        <div className='pt-42 font-girassol pb-10 bg-white h-full w-full'>
            <h1 className="text-4xl font-bold text-center text-black">Welcome, {profile.full_name?.split(' ')[0]}</h1>
            <ProfileCard profile={profile} />

            {profile.role === 'author'
                &&
                <div className="px-4 py-10 mt-8 xs:px-8 bg-black lg:px-20 ">

                    <WrittenArticles author={author} insights={insights ?? []} error={articlesError} articles={articles} />
                </div>
            }
            {profile.role === 'admin' && <AdminApplications applications={application}/>}
            {profile.role === 'reader'
                &&
                <div className="px-4 py-10 mt-8 xs:px-8 bg-black lg:px-20 ">
                    {application === 'pending' ? 
                    <p className="text-center text-2xl">Your application is under review.</p>
                    :
                    <><span className="text-4xl">Want to write for us? </span>
                    <Link href={'/authorApplication'} className="text-3xl text-white hover:underline">Lets Connect!</Link></>}
                </div>
            }
            <div className="px-4 py-10 mt-8 xs:px-8 bg-white lg:px-20 ">
                <LikedArticles author={author} insights={likedInsights ?? []} error={likedArticlesError} articles={likedArticles} />

            </div>
            <div className="px-4 py-10 mt-8 xs:px-8 bg-black lg:px-20 ">
                <UserComments author={author} error={articlesError} comments={comments} />

            </div>
        </div>
    );
}
