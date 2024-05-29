import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Clock as ClockIcon } from '@phosphor-icons/react/dist/ssr/Clock';
import dayjs from 'dayjs';
import { paths } from '@/paths';
import { CardMedia } from '@mui/material';
import { Metadata } from "next";
import { Suspense } from "react";

import CommentServerSide from "@/components/dashboard/gossips/gossip/comment/comment-server-side";
import gossips from '@/lib/requests/gossips';
import PaginationTrigger from '@/components/pagination-trigger';
import InteractRowServerSide from '@/components/dashboard/gossips/gossip/intereact-row-server-side';
import { ItemsListViewModel } from '@/types/response';

type Params = {
    params: { gossipId: string; },
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params: { gossipId } }: Params): Promise<Metadata> {
    const gossipsData: Promise<IGossip> = gossips.readOne(gossipId)
    const gossip = await gossipsData

    return {
        title: `${gossip.title} | Gossips | Dashboard`,
        description: `This is the page of ${gossip.title} gossip.`,
    }
}

export default async function GossipPage({ params, searchParams }: Params) {

    const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : 1
    const limit = typeof searchParams.limit === 'string' ? Number(searchParams.limit) : 10
    const gossipId = params.gossipId

    const gossipsData: Promise<IGossip> = gossips.readOne(gossipId)
    const gossip = await gossipsData

    const commentsData: Promise<ItemsListViewModel<CommentType>> =
        gossips.readComments(gossipId, { pageSize: limit, pageNumber: page })
    const { totalItems: totalComments } = await commentsData

    return (
        <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: '600px' }}>
            <CardMedia
                sx={{ height: 340 }}
                image={gossip.imageUrl || '/assets/no-image.png'}
                title="Gossip image"
                component='img'
            />
            <CardContent >
                <Stack spacing={1}>
                    <Typography variant="h5">
                        {gossip.title}
                    </Typography>
                    <Typography variant="body1">
                        {gossip.content}
                    </Typography>
                </Stack>
            </CardContent>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
                <Stack sx={{ alignItems: 'center' }} direction="row" spacing={1}>
                    <ClockIcon fontSize="var(--icon-fontSize-sm)" />
                    <Typography color="text.secondary" display="inline" variant="body2">
                        Created {dayjs(gossip.createdAt).format('MMM D, YYYY')}
                    </Typography>
                </Stack>
            </Stack>
            <Divider />
            <Suspense fallback={<h2>Loading...</h2>}>
                <InteractRowServerSide promise={gossipsData} />
            </Suspense>
            <CardContent sx={{ px: 1, py: 2 }}>
                <Suspense fallback={<h2>Loading...</h2>}>
                    <CommentServerSide promise={commentsData} />
                </Suspense>
            </CardContent>
            <PaginationTrigger
                currentPath={paths.dashboard.gossips.view(gossipId)}
                limit={limit}
                expandSize={5}
                reachedEnd={totalComments <= limit}
            />
        </Card>
    )
}