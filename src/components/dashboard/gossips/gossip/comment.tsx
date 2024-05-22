'use client'

import { Box, IconButton } from "@mui/material";
import { useSession } from "next-auth/react";
import { ArrowBendDoubleUpLeft, Trash } from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";

import gossips from "@/lib/requests/gossips";
import CommentForm from "./comment-form";

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
    const isOwner = session?.user.id === comment.author

    const handleDelete = async () => {
        await gossips.deleteComment(comment.id, session)
        router.refresh()
    }

    return (
        <div style={{ marginLeft: comment.parent ? 20 : 0, marginBottom: 20 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <p>{comment.content}</p>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    {isOwner && <IconButton
                        onClick={handleDelete}
                        aria-label="delete"
                        sx={{
                            height: 'auto',
                            alignSelf: 'flex-start',
                        }}
                    >
                        <Trash size={24} />
                    </IconButton>}
                    {!comment.parent &&
                        <IconButton
                            onClick={() => onReplyClick(comment.id)}
                            aria-label="reply"
                            sx={{
                                ml: 1,
                                height: 'auto',
                                alignSelf: 'flex-start',
                            }}
                        >
                            <ArrowBendDoubleUpLeft size={24} />
                        </IconButton>}
                </Box>
            </Box>
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
                    <CommentForm
                        label="Reply to comment thread"
                        parent={comment.id}
                        gossipId={comment.gossip}
                        handleInputClose={handleInputClose}
                    />
                </div>
            )}
        </div>
    );
};