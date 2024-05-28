'use client'

import * as React from 'react';
import { Heart } from '@phosphor-icons/react/dist/ssr/Heart';
import { Chip } from '@mui/material';
import { useSession } from 'next-auth/react';

import gossips from '@/lib/requests/gossips';

export interface Props {
    likedItemId: string;
    itemType: "Gossip" | "Comment"
}

export function LikesButton({ likedItemId, itemType }: Props): React.JSX.Element {

    const { data: session } = useSession()
    const [likes, setLikes] = React.useState<string[]>([])
    const [disabled, setDisabled] = React.useState(false)
    const userId = session?.user.id
    const isLiked = userId && likes.includes(userId)

    const getLikes = React.useCallback(async () => {
        const res = await gossips.getLikes(likedItemId, itemType)
        res && setLikes(res)
    }, [])

    React.useEffect(() => {
        getLikes()
    }, [])

    const handleOnClick = async () => {
        setDisabled(true)
        let res: string[] | null = []
        isLiked
            ? res = await gossips.unlike(likedItemId, itemType, session)
            : res = await gossips.like(likedItemId, itemType, session)
        res && setLikes(res)
        setDisabled(false)
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
