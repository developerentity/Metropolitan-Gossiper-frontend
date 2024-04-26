type Props = {
    promise: Promise<CommentsListType>
}

export default async function GossipComments({ promise }: Props) {
    const comments = await promise

    const content = comments.items.map(comment => {
        return (
            <article key={comment.id}>
                <h2>{comment.content}</h2>
                <br />
            </article>
        )
    })

    return content
}