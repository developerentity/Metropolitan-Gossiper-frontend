'use client'

import { Box } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import gossips from "@/lib/requests/gossips";
import ThreadInput from "./thread-input";
import InteractRow from "./interact-row";

type Props = {
    comment: CommentType,
    replies: CommentType[],
    onReplyClick: (id: string) => void
    showReplyInput: boolean
    handleInputClose: () => void
}

export function Comment({
    comment,
    replies,
    onReplyClick,
    showReplyInput,
    handleInputClose
}: Props) {

    const router = useRouter();
    const { data: session } = useSession()

    const handleDelete = async () => {
        await gossips.deleteComment(comment.id, session)
        router.refresh()
    }

    return (
        <div style={{
            marginLeft: comment.parent ? 20 : 0,
            marginBottom: 20
        }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <p>{comment.content}</p>
            </Box>
            <InteractRow
                comment={comment}
                isReplyInputShown={showReplyInput}
                onReplyCallback={() => onReplyClick(comment.id)}
                handleDelete={handleDelete} />
            {replies?.length > 0 && (
                <div>
                    {replies.map(reply => (
                        <Comment
                            key={reply.id}
                            comment={reply}
                            replies={[]}
                            showReplyInput={false}
                            onReplyClick={() => { }}
                            handleInputClose={() => { }} />
                    ))}
                </div>
            )}

            {showReplyInput && (
                <div style={{ marginTop: 10 }}>
                    <ThreadInput
                        parent={comment.id}
                        gossipId={comment.gossip}
                        handleInputClose={handleInputClose}
                    />
                </div>
            )}
        </div>
    );
};