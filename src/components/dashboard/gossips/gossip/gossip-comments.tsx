type Props = {
    promise: Promise<CommentType[]>
}

export default async function GossipComments({ promise }: Props) {
    const comments = await promise

    const content = comments.map(comment => {
        return (
            <article key={comment.id}>
                <h2>{comment.content}</h2>
                <br />
            </article>
        )
    })

    return content
}