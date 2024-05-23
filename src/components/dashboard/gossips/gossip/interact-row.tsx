'use client'

import * as React from 'react';
import { Box, Chip, Stack, TextField } from '@mui/material';
import { useSession } from 'next-auth/react';
import { paths } from '@/paths';
import { PenNib, PencilLine } from '@phosphor-icons/react/dist/ssr';
import { useRouter } from 'next/navigation';

import gossips from '@/lib/requests/gossips';
import DeleteButton from '../delete-button';

type Props = {
    gossip: IGossip
}

export default function InteractRow({ gossip }: Props) {

    const { data: session } = useSession()
    const router = useRouter();
    const isOwner = gossip.author === session?.user.id

    const [isInputOpen, setIsInputOpen] = React.useState(false)
    const [content, setContent] = React.useState('')

    const deleteGossipHandler = async () => {
        await gossips.remove(gossip.id, session);
        router.replace(paths.dashboard.gossips.list);
        router.refresh()
    }

    const handlePublish = async () => {
        await gossips.createComment(gossip.id, { parent: null, content }, session)
        router.refresh()
        setContent('')
        setIsInputOpen(false)
    }

    const openCommentInputHandler = () => {
        isInputOpen
            ? content ? handlePublish() : setIsInputOpen(false)
            : setIsInputOpen(true)
    }

    const handleEdit = () =>
        router.push(paths.dashboard.gossips.edit(gossip.id))

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1 }}>
                <Box>
                    <Chip
                        onClick={openCommentInputHandler}
                        sx={{ cursor: "pointer", px: 1 }}
                        variant="outlined"
                        color="primary"
                        icon={<PenNib size={16} />}
                        label={isInputOpen
                            ? content ? "Publish" : "Close"
                            : 'Comment'} />
                </Box>
                {isOwner &&
                    <Stack direction={"row"} spacing={1}>
                        <Chip
                            onClick={handleEdit}
                            sx={{ cursor: "pointer", px: 1 }}
                            label='Edit'
                            variant="outlined"
                            color="primary"
                            icon={<PencilLine size={16} />} />
                        <DeleteButton
                            onDeleteCallback={deleteGossipHandler}
                            title='Attention'
                            description='Are you sure you want to remove this gossip?' />
                    </Stack >}
            </ Box>
            {isInputOpen && <Box sx={{ p: 1 }}>
                <TextField
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    fullWidth
                    label={'Leave your comment there'}
                    multiline
                    rows={5}
                    variant="outlined"
                    InputProps={{ style: { height: 140 }, }}
                    sx={{ '& .MuiOutlinedInput-root': { resize: 'none', }, }}
                />
            </Box>}
        </Box >
    );
}