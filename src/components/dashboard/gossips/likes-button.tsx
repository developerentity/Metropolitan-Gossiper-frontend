'use client'

import * as React from 'react';
import { Heart } from '@phosphor-icons/react/dist/ssr/Heart';
import { Chip } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import gossips from '@/lib/requests/gossips';

export interface Props {
    likedItemId: string;
    likes: string[];
}

export function LikesButton({ likedItemId, likes }: Props): React.JSX.Element {

    const router = useRouter();
    const { data: session } = useSession()
    const userId = session?.user.id
    const isLiked = userId && likes.includes(userId)

    const handleOnClick = async () => {
        isLiked
            ? await gossips.unlike(likedItemId, session)
            : await gossips.like(likedItemId, session)
        router.refresh()
    }

    return (
        <Chip
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
