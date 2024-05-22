'use client'

import * as React from 'react';
import RouterLink from 'next/link';
import { Box, Button, TextField } from '@mui/material';
import { useSession } from 'next-auth/react';
import { paths } from '@/paths';
import { PenNib, PencilLine, Trash } from '@phosphor-icons/react/dist/ssr';
import { useRouter } from 'next/navigation';

import gossips from '@/lib/requests/gossips';

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

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1 }}>
                <Box>
                    <Button
                        onClick={openCommentInputHandler}
                        variant="contained"
                        startIcon={<PenNib size={24} />}>
                        {isInputOpen
                            ? content ? "Publish" : "Close"
                            : 'Comment'}
                    </Button>
                </Box>
                {isOwner &&
                    <Box >
                        <Button
                            component={RouterLink}
                            href={paths.dashboard.gossips.edit(gossip.id)}
                            startIcon={<PencilLine size={24} />}
                            variant="contained">
                            Edit
                        </Button>
                        <Button
                            onClick={deleteGossipHandler}
                            startIcon={<Trash size={24} />}
                            variant="contained"
                            sx={{ ml: 1 }}>
                            Delete
                        </Button>
                    </Box >
                }
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
        </Box>
    );
}