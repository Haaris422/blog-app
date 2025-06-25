import { animationCalss } from "@/components/Home/Constants/Data";
import { AuthorInfo } from "@/components/Home/Shared/AuthorInfo";
import { CommentLikeButton } from "./CommentLikeButton";
import { useState } from "react";
import { AddComment } from "./AddComment";
import { createClient } from "@/lib/supabase/client";

interface CommentProps {
    item: UserCommentsProps;
    user_id: string;
    commentMap: Map<string | null, UserCommentsProps[]>;
    setCommentList: React.Dispatch<React.SetStateAction<UserCommentsProps[]>>;
}


export function Comment({ item, user_id, commentMap, setCommentList }: CommentProps) {
    const replies = commentMap.get(item.id) || [];

    const [edit, setEdit] = useState(false);
    const [replyingToId, setReplyingToId] = useState('');
    const [replying, setReplying] = useState(false);
    const [editComment, setEditComment] = useState(item.content);
    const [replyComment, setReplyComment] = useState('');
    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        setEditComment(e.target.value);
    }
    function toggleReply(parent_id: string) {
        setReplying(!replying);
        setReplyingToId(parent_id);
        setReplyComment(`@${item.user.full_name} `);
    }
    function changeReplyComm(e: React.ChangeEvent<HTMLInputElement>) {
        setReplyComment(e.target.value);
    }
    async function submitReply() {
        const supabase = await createClient();
        const { data, error } = await supabase.from('comments')
            .insert({
                article_id: item.article_id,
                user_id,
                content: replyComment,
                parent_id: replyingToId
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
            console.log('Comments: submitReply: error: ', error);
            return alert('An Error occurred while replying to the comment.');
        }

        setCommentList(prev => [...prev, data[0]]);

        setReplying(false);
        setReplyingToId('');
        setReplyComment('');
        console.log('Comments: submitReply: data: ', data);
        return alert('Replied to comment successfully!');
    }

    async function onDelete() {
        const supabase = await createClient();
        const { data: replies } = await supabase
            .from("comments")
            .select("id")
            .eq("parent_id", item.id);

        const hasReplies = replies && replies.length > 0;

        let result;
        if (hasReplies) {
            result = await supabase.from("comments")
                .update({ deleted: true })
                .eq("id", item.id);
        } else {
            result = await supabase.from("comments")
                .delete()
                .eq("id", item.id);
        }

        if (result.error) {
            console.error('Delete Error:', result.error);
            return alert('Error while deleting.');
        }
        setCommentList(prev =>
        hasReplies
            ? prev.map(c => c.id === item.id ? { ...c, content: "[deleted]", deleted: true } : c)
            : prev.filter(c => c.id !== item.id)
    );
        alert(hasReplies ? 'Comment marked as deleted' : 'Comment deleted!');
    }

    async function onSubmit() {
        const supabase = await createClient();
        const { data, error } = await supabase.from('comments')
            .update({
                article_id: item.article_id,
                user_id,
                content: editComment,
                parent_id: item.parent_id || null
            })
            .eq('id', item.id)
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
            return alert('ERROR WHILE UPDATING');
        }

        setEdit(false);
        setCommentList(prev =>
            prev.map(c => c.id === item.id ? data[0] : c)
        );

        console.log('ArticleComments: onSubmit: success: ', data);
        return alert('Comment Updated!');
    }

    return (
        <div className="bg-white mb-6 w-full text-black rounded-md pt-2 pb-6 px-6" key={item.id}>
            <AuthorInfo author={item.user} publish_date={item.created_at} />
            {!edit ? <div className="flex gap-4">
                <div className="border border-black w-full p-2 rounded-md">
                    {item.deleted ? <i className="text-gray-500">[Comment deleted]</i> : item.content}
                </div>

                <div className="flex flex-col text-center">
                    <CommentLikeButton user_id={user_id} comment_id={item.id} />
                </div>
            </div>
                :
                <div>
                    <AddComment comment={editComment} onChange={onChange} onSubmit={onSubmit} />
                </div>
            }
            <div className="mt-2 flex gap-6">
                <p onClick={() => toggleReply(item.id)}
                    className={`${animationCalss} hover:underline 
                                    hover:underline-offset-2 cursor-pointer`}>
                    {replying ? 'Cancel' : 'Reply'}
                </p>
                {user_id === item.user_id &&
                    <p onClick={() => setEdit(!edit)}
                        className={`${animationCalss} hover:underline 
                                    hover:underline-offset-2 cursor-pointer`}>
                        {edit ? 'Cancel' : 'Edit'}
                    </p>}
                {user_id === item.user_id &&
                    <p onClick={onDelete}
                        className={`${animationCalss} hover:underline hover:text-red-500 
                                    hover:underline-offset-2 cursor-pointer`}>
                        Delete
                    </p>}

            </div>
            {replying &&
                <div className="max-w-[600px]">
                    <AddComment comment={replyComment}
                        onChange={changeReplyComm} onSubmit={submitReply} />
                </div>}
            {replies?.length && replies?.length > 0 ? (
                <div className="mt-4 ml-6 border-l-2 border-gray-300 pl-4">
                    {replies.map((reply) => (
                        <Comment
                            key={reply.id}
                            user_id={user_id}
                            item={reply}
                            commentMap={commentMap}
                            setCommentList={setCommentList}
                        />
                    ))}
                </div>
            ) : null}
        </div>
    )
}