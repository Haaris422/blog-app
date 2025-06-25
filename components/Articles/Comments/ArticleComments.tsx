'use client';
import { Divider } from "../../Shared/Divider";
import { useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { Comment } from "./Comments";
import { AddComment } from "./AddComment";

export function ArticleComments({ article_id, user, user_id, comments }: {
    article_id: string;
    user_id: string;
    comments: UserCommentsProps[];
    user: User | null
}) {
    console.log('ArticleComments: comments: ', comments);
    const [comment, setComment] = useState('');
    const [commentList, setCommentList] = useState(comments);
    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        setComment(e.target.value);
    }
    async function onSubmit() {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('comments')
        .insert({
            article_id,
            user_id,
            content: comment,
            parent_id: null
        })
        .select(`
            *,
            user:profiles!comments_user_id_fkey (
                avatar_url,
                full_name,
                role
            )
        `);

    if (error || !data || data.length === 0) {
        console.log('ArticleComments: onSubmit: error: ', error);
        return alert('ERROR WHILE UPLOADING');
    }

    setCommentList(prev => [...prev, data[0]]);
    setComment('');
    console.log('ArticleComments: onSubmit: success: ', data, commentList);
    return alert('Comment Added!');
}


    const commentMap = useMemo(() => {
    const map = new Map<string | null, UserCommentsProps[]>();
    commentList.forEach(comment => {
            const parentId = comment.parent_id ?? null;
            if (!map.has(parentId)) map.set(parentId, []);
            map.get(parentId)!.push(comment);
        });
        return map;
    }, [commentList]);
    const topLevelComments = commentMap.get(null) || [];


    return (
        <section id='comments' className="w-full p-6 bg-gray-800 text-white">
            <h1 className="text-2xl ">Comments</h1>
            <Divider variant="horizontal" />
            {user ?
                <AddComment comment={comment} onChange={onChange} onSubmit={onSubmit} />
                :
                <div className="w-full mt-4">
                    <p className="text-center">
                        You must be Logged in to add a comment.
                    </p>
                </div>}
            <div className="p-6">
                {topLevelComments.length > 0 ? (
                    topLevelComments.map((comment) => (
                        <Comment
                            key={comment.id}
                            user_id={user_id}
                            item={comment}
                            commentMap={commentMap}
                            setCommentList={setCommentList}
                        />

                    ))
                ) : (
                    <p>Be The 1st to Comment!</p>
                )}
            </div>

        </section>
    )
}