'use client'

import * as React from 'react';
import { Button, TextField } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import gossips from '@/lib/requests/gossips';

type Props = {
    gossipId: string,
    parent: string,
    handleInputClose: () => void
}

export default function ThreadInput({ parent, gossipId, handleInputClose }: Props) {

    const { data: session } = useSession()
    const router = useRouter();
    const [content, setContent] = React.useState('')

    const publishComment = async () => {
        await gossips.createComment(gossipId, { parent, content }, session)
        router.refresh()
        setContent('')
        handleInputClose()
    }

    const handleSubmit = async () =>
        content ? publishComment() : handleInputClose()


    return (
        <form>
            <TextField
                value={content}
                onChange={(e) => setContent(e.target.value)}
                fullWidth
                label={"Continue thread there"}
                multiline
                rows={5}
                variant="outlined"
                InputProps={{ style: { height: 140 }, }}
                sx={{ '& .MuiOutlinedInput-root': { resize: 'none', }, }} />
            <Button
                onClick={handleSubmit}
                variant="contained"
                sx={{ mt: 1 }}>
                {content ? "Publish" : "Close"}
            </Button>
        </form>
    );
}