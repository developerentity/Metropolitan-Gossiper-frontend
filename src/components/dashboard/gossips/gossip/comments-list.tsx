'use client'

import { useState } from "react";
import { Comment } from "./comment";
import CommentForm from "./comment-form";

type Props = {
    commentsData: CommentsListType
    gossipId: string
}

export default function CommentsList({ commentsData, gossipId }: Props) {

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
            <Comment
                key={comment.id}
                comment={comment}
                replies={replies[comment.id]}
                onReplyClick={(id) => setReplyTo(replyTo === id ? null : id)}
                showReplyInput={replyTo === comment.id}
                handleInputClose={handleInputClose}
            />
        ));

    return (
        <div>
            {!replyTo && (
                <CommentForm
                    label="Leave your comment there"
                    gossipId={gossipId}
                    parent={null}
                    handleInputClose={handleInputClose} />
            )}
            {renderComments(topLevelComments)}
        </div>
    );
}

