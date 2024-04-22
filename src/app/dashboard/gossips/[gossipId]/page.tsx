import GossipComments from "@/components/dashboard/gossips/gossip/gossip-comments";
import getGossip from "@/lib/gossips/getGossip"
import getGossipsComments from "@/lib/gossips/getGossipsComments"
import { Metadata } from "next";
import { Suspense } from "react";

type Params = {
    params: {
        gossipId: string;
    }
}

export async function generateMetadata({ params: { gossipId } }: Params): Promise<Metadata> {
    const gossipsData: Promise<IGossip> = getGossip(gossipId)
    const gossip = await gossipsData

    return {
        title: gossip.title,
        description: `This is the page of ${gossip.title} gossip.`,
    }
}

export default async function GossipPage({ params: { gossipId } }: Params) {
    const gossipsData: Promise<IGossip> = getGossip(gossipId)
    const commentsData: Promise<CommentType[]> = getGossipsComments(gossipId)

    const gossip = await gossipsData

    return (
        <>
            <h2>
                {gossip.title}
            </h2>
            <br />
            <Suspense fallback={<h2>Loading...</h2>}>
                <GossipComments promise={commentsData} />
            </Suspense>
        </>
    )
}