type IGossip = {
  id: string;
  title: string;
  content: string;
  author: string;
  comments: string[];
  likes: string[];
  imageUrl?: string;
  createdAt: string;
};

type GossipsListType = {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  items: IGossip[];
};
