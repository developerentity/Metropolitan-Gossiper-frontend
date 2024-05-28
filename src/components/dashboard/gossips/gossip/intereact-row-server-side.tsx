import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import InteractRow from "./interact-row";

type Props = {
    promise: Promise<IGossip>
}

export default async function InteractRowServerSide({ promise }: Props) {

    const session = await getServerSession(authOptions)
    const gossip = await promise

    return (
        <InteractRow gossip={gossip} session={session} />
    );
}

