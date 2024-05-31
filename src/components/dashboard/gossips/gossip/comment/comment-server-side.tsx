import { ItemsListViewModel } from "@/types/response";
import CommentsList from "../comments-list";

type Props = {
  promise: Promise<ItemsListViewModel<CommentType>>
}

export default async function CommentServerSide({ promise }: Props) {

  const commentsData = await promise

  return (
    <CommentsList commentsData={commentsData} />
  );
}

