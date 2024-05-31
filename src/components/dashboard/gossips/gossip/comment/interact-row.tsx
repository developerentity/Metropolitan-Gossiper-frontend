'use client'

import * as React from 'react';
import { Chip, Paper, Stack } from '@mui/material';
import { ArrowBendDoubleUpLeft } from '@phosphor-icons/react/dist/ssr';


import DeleteButton from '../delete-button';
import { LikesButton } from '../likes-button';
import { useSession } from 'next-auth/react';

type Props = {
    comment: CommentType
    isReplyInputShown: boolean
    onReplyCallback: () => void
    handleDelete: () => void
}

export default function InteractRow({
    comment,
    isReplyInputShown,
    onReplyCallback,
    handleDelete
}: Props) {

    const { data: session } = useSession()
    const isOwner = comment.author === session?.user.id

    return (
        <Paper>
            <Stack direction="row" spacing={1}>
                {isOwner &&
                    <DeleteButton
                        title='Attention'
                        description='Are you sure you want to remove this comment?'
                        onDeleteCallback={handleDelete} />}
                <LikesButton
                    likedItemId={comment.id}
                    itemType='Comment' />
                {!comment.parent && !isReplyInputShown &&
                    <Chip
                        onClick={onReplyCallback}
                        sx={{ cursor: "pointer", px: 1 }}
                        label='Reply'
                        variant="outlined"
                        color="primary"
                        icon={<ArrowBendDoubleUpLeft size={16} />} />}
            </Stack>
        </Paper>
    );
}



