'use client'

import * as React from 'react';
import { Button, TextField } from '@mui/material';
import gossips from '@/lib/requests/gossips';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type Props = {
    label: string,
    gossipId: string,
    parent: string | null,
    handleInputClose: () => void
}

export default function CommentForm({ label, parent, gossipId, handleInputClose }: Props) {

    const { data: session } = useSession()
    const router = useRouter();
    const [content, setContent] = React.useState('')
    const [disabled, setDisabled] = React.useState(true)


    React.useEffect(() => {
        if (content !== '') {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [content])

    const publishComment = async () => {
        await gossips.createComment(gossipId, { parent, content }, session)
        router.refresh()
        setContent('')
        handleInputClose()
    }

    const handleSubmit = async () =>
        parent
            ? content ? publishComment() : handleInputClose()
            : publishComment()


    return (
        <form>
            <TextField
                value={content}
                onChange={(e) => setContent(e.target.value)}
                fullWidth
                label={label}
                multiline
                rows={5}
                variant="outlined"
                InputProps={{ style: { height: 140 }, }}
                sx={{ '& .MuiOutlinedInput-root': { resize: 'none', }, }}
            />

            <Button
                onClick={handleSubmit}
                variant="contained"
                disabled={!parent ? disabled : false}
                sx={{ mt: 1 }}
            >
                {parent
                    ? content ? "Publish" : "Close"
                    : "Publish"
                }
            </Button>
        </form>
    );
}