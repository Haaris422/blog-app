import { ActionButton } from "@/components/Shared/ActionButton";
import { BiSend } from "react-icons/bi";

interface AddCommentProps {
    comment: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: () => void;
}


export function AddComment({comment, onChange, onSubmit}:AddCommentProps) {
    return (
        <div className="w-full flex gap-4 mt-4">
            <input type='text' name='comment'
                value={comment} onChange={onChange}
                className="bg-white border border-black text-black p-2 w-full rounded-md h-[50px]" />
            <ActionButton onClick={onSubmit} className="rounded-md" alt={true}>
                <BiSend className="text-3xl" />
            </ActionButton>
        </div>
    )
}