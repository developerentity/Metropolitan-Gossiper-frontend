import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Clock as ClockIcon } from '@phosphor-icons/react/dist/ssr/Clock';
import { Heart } from '@phosphor-icons/react/dist/ssr/Heart';
import dayjs from 'dayjs';
import { Pen } from '@phosphor-icons/react/dist/ssr/Pen';
import RouterLink from 'next/link';
import { paths } from '@/paths';
import { Button } from '@mui/material';
import { Metadata } from "next";
import { Suspense } from "react";

import GossipComments from "@/components/dashboard/gossips/gossip/gossip-comments";
import gossips from '@/lib/requests/gossips';
import { deleteGossip } from '@/lib/actions/gossips';

type Params = {
    params: {
        gossipId: string;
    }
}

export async function generateMetadata({ params: { gossipId } }: Params): Promise<Metadata> {
    const gossipsData: Promise<IGossip> = gossips.readOne(gossipId)
    const gossip = await gossipsData

    return {
        title: `${gossip.title} | Gossips | Dashboard`,
        description: `This is the page of ${gossip.title} gossip.`,
    }
}

export default async function GossipPage({ params: { gossipId } }: Params) {
    const gossipsData: Promise<IGossip> = gossips.readOne(gossipId)
    const commentsData: Promise<CommentsListType> = gossips.readComments(gossipId)

    const gossip = await gossipsData

    const deleteGossipWithId = deleteGossip.bind(null, gossip.id)

    return (
        <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: '600px' }}>
            <CardContent sx={{ flex: '1 1 auto' }}>
                <Stack spacing={2}>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Avatar src={gossip.imageUrl} variant="square" />
                    </Box>
                    <Stack spacing={1}>
                        <Typography align="center" variant="h5">
                            {gossip.title}
                        </Typography>
                        <Typography align="center" variant="body1">
                            {gossip.content}
                        </Typography>
                    </Stack>
                </Stack>
            </CardContent>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
                <Stack sx={{ alignItems: 'center' }} direction="row" spacing={1}>
                    <ClockIcon fontSize="var(--icon-fontSize-sm)" />
                    <Typography color="text.secondary" display="inline" variant="body2">
                        Created {dayjs(gossip.createdAt).format('MMM D, YYYY')}
                    </Typography>
                </Stack>
                <Stack sx={{ alignItems: 'center' }} direction="row" spacing={1}>
                    <Heart fontSize="var(--icon-fontSize-sm)" />
                    <Typography color="text.secondary" display="inline" variant="body2">
                        {gossip.likes?.length} likes
                    </Typography>
                </Stack>
            </Stack>
            <Divider />
            <form action={deleteGossipWithId}>
                <Box sx={{ display: "flex", justifyContent: 'flex-end', p: 1 }}>
                    <Button
                        component={RouterLink}
                        href={paths.dashboard.gossips.edit(gossipId)}
                        startIcon={<Pen fontSize="var(--icon-fontSize-md)" />}
                        variant="contained">
                        Edit
                    </Button>
                    <Button type="submit" variant="contained" sx={{ ml: 1 }}>
                        Delete
                    </Button>
                </Box>
            </form>
            <CardContent sx={{ flex: '1 1 auto' }}>
                <Stack spacing={2}>
                    <Suspense fallback={<h2>Loading...</h2>}>
                        <GossipComments promise={commentsData} />
                    </Suspense>
                </Stack>
            </CardContent>
        </Card>
    )
}