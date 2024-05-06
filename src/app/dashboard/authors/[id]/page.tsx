import { getServerSession } from "next-auth"

import { authOptions } from "@/app/api/auth/[...nextauth]/route"


type Props = {
    params: { id: string }
}

// USAGE EXAMPLE !!!
export default async function AuthorPage({ params }: Props) {
    const session = await getServerSession(authOptions)

    const response = await fetch(`http://localhost:5080/users/get/${params.id}`, {
        method: "GET",
        headers: {
            "authorization": `Bearer ${session?.backendTokens.accessToken}`,
            "content-type": "application/json"
        }
    })

    const data = await response.json()

    return (
        <div>
            USER PAGE
            {data.user.email}
        </ div>
    )
}