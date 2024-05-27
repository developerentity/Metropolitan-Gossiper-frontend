'use client'

import * as React from 'react';
import { Heart } from '@phosphor-icons/react/dist/ssr/Heart';
import { Chip } from '@mui/material';
import { useSession } from 'next-auth/react';

import gossips from '@/lib/requests/gossips';

export interface Props {
    likedItemId: string;
}

export function LikesButton({ likedItemId }: Props): React.JSX.Element {

    const { data: session } = useSession()
    const userId = session?.user.id
    const [likes, setLikes] = React.useState<string[]>([])
    const [trigger, setTrigger] = React.useState(false)
    const [disabled, setDisabled] = React.useState(false)
    const isLiked = userId && likes.includes(userId)

    const refreshLikes = React.useCallback(async () => {
        const res = await gossips.getLikes(likedItemId)
        setLikes(res)
        setDisabled(false)
    }, [])

    React.useEffect(() => {
        refreshLikes()
    }, [trigger])

    const handleOnClick = async () => {
        setDisabled(true)
        isLiked
            ? await gossips.unlike(likedItemId, session)
            : await gossips.like(likedItemId, session)
        setTimeout(() => {
            setTrigger(!trigger)
        }, 300)
    }

    return (
        <Chip
            disabled={disabled}
            onClick={handleOnClick}
            sx={{ cursor: "pointer", px: 1 }}
            label={likes.length}
            variant="outlined"
            color="primary"
            icon={<Heart
                size={16}
                fontSize="var(--icon-fontSize-sm)"
                weight={isLiked ? 'fill' : undefined} />} />
    );
}
