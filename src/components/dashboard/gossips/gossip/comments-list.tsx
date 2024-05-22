'use client'

import { useState } from "react";
import { Paper } from "@mui/material";

import { Comment } from "./comment";

type Props = {
    commentsData: CommentsListType
}

export default function CommentsList({ commentsData }: Props) {

    const [replyTo, setReplyTo] = useState<string | null>(null);
    const handleInputClose = () => {
        setReplyTo(null)
    }

    const comments = commentsData.items

    const topLevelComments = comments.filter(comment => comment.parent === null);
    const replies = comments.reduce<Record<string, CommentType[]>>((acc, comment) => {
        if (comment.parent !== null) {
            if (!acc[comment.parent]) {
                acc[comment.parent] = [];
            }
            acc[comment.parent].push(comment);
        }
        return acc;
    }, {});

    const renderComments = (comments: CommentType[]) =>
        comments.map(comment => (
            <Paper key={comment.id} elevation={4} sx={{ px: 2 }}>
                <Comment
                    comment={comment}
                    replies={replies[comment.id]?.reverse()}
                    onReplyClick={(id) => setReplyTo(replyTo === id ? null : id)}
                    showReplyInput={replyTo === comment.id}
                    handleInputClose={handleInputClose}
                />
            </Paper>
        ));

    return (
        <div>
            {renderComments(topLevelComments)}
        </div>
    );
}

