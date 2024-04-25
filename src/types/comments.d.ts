type CommentType = {
  id: string;
  content: string;
  author: string;
  gossip: string;
  parent: string | null;
  likes: string[];
};

type CommentsListType = {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  items: CommentType[];
};
