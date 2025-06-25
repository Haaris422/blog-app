import { ArticleComments } from "@/components/Articles/Comments/ArticleComments";
import { LikeButton } from "@/components/Articles/LikeButton";
import { animationCalss, shareSocials } from "@/components/Home/Constants/Data";
import { AuthorInfo } from "@/components/Home/Shared/AuthorInfo";
import { ActionButton } from "@/components/Shared/ActionButton";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BiComment, BiHeart } from "react-icons/bi";

export default async function ArticlePage({ params }: { params: { slug: string } }) {
    const supabase = await createClient();
    const user = (await supabase.auth.getUser()).data.user;
    
    const { data: tempArticle, error } = await supabase.from('articles')
        .select(`
      *,
      author:profiles!articles_author_id_fkey (
        id,
        full_name,
        avatar_url
      ),
    category:categories!articles_category_id_fkey (
      id,
      name
    )
    `).eq('slug', params.slug).single();
    if (!tempArticle || error) return notFound();
    const article = tempArticle as ArticleProps;
    console.log('ArticlePage: article: ', article);
    
    const {
        data: likesData,
        error: likesError,
    } = await supabase
        .from("likes")
        .select("user_id")
        .eq("article_id", article.id);

    const isLiked = likesData?.some(like => like.user_id === user?.id) ?? false;
    
    const {
        data: commentsData,
        error: commentsError,
    } = await supabase
        .from("comments")
        .select(`*,
            user:profiles!comments_user_id_fkey (
                avatar_url,
                full_name,
                role
            )
            `)
        .eq("article_id", article.id).order("created_at", { ascending: true });
        console.log('ArticlePage: commentsData: ', commentsData);

    return (
        <div className='pt-42 font-girassol pb-10 text-black px-4 xs:px-8 bg-white lg:px-20 h-full w-full'>
            <div className="w-full md:w-[80%] shadow-[0_0_10px_rgba(100,100,100,0.4)]">
                <div className="space-y-1 p-2 ">
                    <h1 className="text-4xl font-bold underline-offset-2 underline">{article.title}</h1>
                    <h2 className="text-lg italic text-gray-700">{article.sub_title}</h2>
                    <div className="flex my-2 justify-between">
                        <div
                            className={`${animationCalss} text-sm ${article.type_id === 1
                                ? "text-black border border-black bg-white"
                                : "text-white border border-white bg-black"
                                } p-1.5`}
                        >
                            {article.type_id === 1 ? "Blog" : "Research"}
                        </div>
                        <div
                            className={`${animationCalss} text-sm ${article.category_id % 2 === 0
                                ? "text-black border border-black bg-white"
                                : "text-white border border-white bg-black"
                                } p-1.5`}
                        >
                            {article.category?.name || 'No Category'}
                        </div>
                    </div>
                    <AuthorInfo author={article.author} publish_date={article.created_at} />
                    <div className="flex items-center justify-between">
                        <div className="flex gap-4">
                            <LikeButton
                                articleId={article.id}
                                initialLiked={isLiked}
                                initialCount={likesData?.length ?? 0}
                            />
                            <div className="flex flex-col text-center">
                                <Link href={'#comments'}>
                                    <ActionButton alt={true}>
                                        <BiComment />
                                    </ActionButton>
                                </Link>
                                {commentsData?.length}
                            </div>
                        </div>

                        <div className="flex gap-4">
                            {shareSocials.map((social) => (
                                <Link key={social.name} href={social.link}>
                                    <ActionButton >
                                        {social.icon}
                                    </ActionButton>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <img src={article.image} className="my-8 w-full h-full" />
                    <p className="mt-10 text-lg">
                        {article.content}
                    </p>
                </div>
                <ArticleComments user={user} comments={commentsData ?? []}
                article_id={article.id} user_id={user?.id ?? ''}/>
            </div>
        </div>
    )
}