import CommentsList from "./comments-list";

type Props = {
  promise: Promise<CommentsListType>
  gossipId: string
}

export default async function CommentsComponent({ promise, gossipId }: Props) {

  const commentsData = await promise

  return (
    <CommentsList commentsData={commentsData} gossipId={gossipId} />
  );
}

