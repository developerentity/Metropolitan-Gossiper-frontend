type IGossip = {
  id: string;
  title: string;
  content: string;
  author: string;
  comments: string[];
  likes: string[];
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
};
