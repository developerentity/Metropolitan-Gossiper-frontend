import CommentsList from "./comments-list";

type Props = {
  promise: Promise<CommentsListType>
}

export default async function CommentsComponent({ promise }: Props) {

  const commentsData = await promise

  return (
    <CommentsList commentsData={commentsData} />
  );
}

