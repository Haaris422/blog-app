'use client';
import { useEffect, useState } from 'react';
import { BiHeart, BiSolidHeart } from 'react-icons/bi';
import { createClient } from '@/lib/supabase/client';
import { ActionButton } from '../../Shared/ActionButton';
import { animationCalss } from '../../Home/Constants/Data';

export function CommentLikeButton({ comment_id, user_id }: {
    comment_id: string;
    user_id: string
}) {
    async function fetchCommentLike() {
        const supabase = await createClient();
        const {
            data: commentsLikesData,
            error: commentsLikesError,
        } = await supabase
            .from("comment_likes")
            .select("*")
            .eq("comment_id", comment_id);
        if (commentsLikesError) {
            console.log('CommentlikeButton: fetchCommentLike: commentsLikesError:', commentsLikesError);
            return { initialCount: 0, initialLiked: false };
        }
        console.log('CommentlikeButton: fetchCommentLike: commentsLikesData:', commentsLikesData);
        const tempLikesData = commentsLikesData as LikeProps[];
        const initialLiked = tempLikesData?.some(like => like.user_id === user_id) ?? false;
        return { initialCount: tempLikesData.length, initialLiked }
    }
    const [liked, setLiked] = useState(false);
    const [count, setCount] = useState(0);

    useEffect(() => {
        async function fetchData() {
            const { initialCount, initialLiked } = await fetchCommentLike();
            setCount(initialCount);
            setLiked(initialLiked);
        }
        fetchData();
    }, []);

    console.log('CommentlikeButton: Props & like: ', comment_id)

    const supabase = createClient();

    const toggleLike = async () => {
        const user = (await supabase.auth.getUser()).data.user;
        if (!user) return alert('You must be logged in to like.');

        if (liked) {
            const alreadyLiked = await supabase.from('comment_likes')
                .delete()
                .eq('comment_id', comment_id)
                .eq('user_id', user.id);
            setLiked(false);
            console.log('CommentlikeButton: toggleLike: already liked:', alreadyLiked);

            setCount((c) => c - 1);
        } else {
            const notLiked = await supabase.from('comment_likes').insert({
                comment_id: comment_id,
                user_id: user.id
            });
            console.log('CommentlikeButton: toggleLike: not liked:', notLiked);

            setLiked(true);
            setCount((c) => c + 1);
        }
    };

    return (
        <div className="flex flex-col text-center">
            <ActionButton onClick={toggleLike} className='group rounded-md'>
                {liked ? <BiSolidHeart className={`${animationCalss} text-red-500 group-hover:scale-120`} /> : <BiHeart />}
            </ActionButton>
            <span>
                {count}
            </span>
        </div>
    );
}
