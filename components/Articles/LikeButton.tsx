'use client';
import { useEffect, useState } from 'react';
import { BiHeart, BiSolidHeart } from 'react-icons/bi';
import { createClient } from '@/lib/supabase/client';
import { ActionButton } from '../Shared/ActionButton';
import { animationCalss } from '../Home/Constants/Data';

export function LikeButton({ articleId, initialLiked, initialCount }: {
    articleId: string;
    initialLiked: boolean;
    initialCount: number;
}) {
    console.log('LikeButton: Props: ', articleId, initialLiked, initialCount)
    const [liked, setLiked] = useState(initialLiked);
    const [count, setCount] = useState(initialCount);

    const supabase = createClient();

    const toggleLike = async () => {
        const user = (await supabase.auth.getUser()).data.user;
        if (!user) return alert('You must be logged in to like.');

        if (liked) {
            await supabase.from('likes')
                .delete()
                .eq('article_id', articleId)
                .eq('user_id', user.id);
            setLiked(false);
            setCount((c) => c - 1);
        } else {
            await supabase.from('likes').insert({
                article_id: articleId,
                user_id: user.id
            });
            setLiked(true);
            setCount((c) => c + 1);
        }
    };

    return (
        <div className="flex flex-col text-center">
            <ActionButton onClick={toggleLike} className='group'>
                {liked ? <BiSolidHeart className={`${animationCalss} text-red-500 group-hover:scale-120`} /> : <BiHeart />}
            </ActionButton>
            <span>
                {count}
            </span>
        </div>
    );
}
