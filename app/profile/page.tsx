import { LikedArticles } from "@/components/Profile/LikedArticles";
import { ProfileCard } from "@/components/Profile/ProfileCard";
import { WrittenArticles } from "@/components/Profile/WrittenArticles";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getAuthorArticles, getLikedArticles } from "./actions";
import { UserComments } from "@/components/Profile/Comments";

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
    const { data:tempLikedArticles, error: likedArticlesError} = await getLikedArticles(profile.id ?? '')
    const author: AuthorProps = {
        id: profile.id ?? '',
        avatar_url: profile.avatar_url ?? '',
        full_name: profile.full_name ?? ''
    }
    const insights = tempArticles?.filter((article) => (article.isInsight)) || null;
    const articles = tempArticles?.filter((article) => (!article.isInsight));
    const likedInsights = tempLikedArticles?.filter((article) => (article.isInsight)) || null;
        const likedArticles = tempArticles?.filter((article) => (!article.isInsight));

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
            <div className="px-4 py-10 mt-8 xs:px-8 bg-white lg:px-20 ">
                <LikedArticles author={author} insights={insights ?? []} error={articlesError} articles={articles}  />

            </div>
            <div className="px-4 py-10 mt-8 xs:px-8 bg-black lg:px-20 ">
                <UserComments author={author} insights={insights ?? []} error={articlesError} articles={articles}  />

            </div>
        </div>
    );
}
