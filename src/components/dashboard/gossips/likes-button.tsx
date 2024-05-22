'use client'

import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Heart } from '@phosphor-icons/react/dist/ssr/Heart';
import { Box } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import gossips from '@/lib/requests/gossips';

export interface Props {
    gossipId: string;
    likes: string[];
}

export function LikesButton({ gossipId, likes }: Props): React.JSX.Element {

    const router = useRouter();
    const { data: session } = useSession()
    const userId = session?.user.id
    const isLiked = userId && likes.includes(userId)

    const handleOnClick = async () => {
        isLiked
            ? await gossips.unlike(gossipId, session)
            : await gossips.like(gossipId, session)
        router.refresh()
    }

    return (
        <Box onClick={handleOnClick} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <Heart
                fontSize="var(--icon-fontSize-sm)"
                fill={isLiked ? 'red' : undefined}
                weight={isLiked ? 'fill' : undefined} />
            <Typography color="text.secondary" display="inline" variant="body2" sx={{ ml: 1 }}>
                {likes.length} likes
            </Typography>
        </Box>
    );
}
