import axios from "axios";

const base_url = "http://localhost:5080/gossips/";

export default async function getCommentsByGossip(gossipId: string, params?: {
  pageSize?: string;
  pageNumber?: string;
}): Promise<CommentsListType> {
  const reqParams = params ? { params } : {};
  const response = await axios.get(`${base_url}get/${gossipId}/comments/`, reqParams);
  return response.data;
}
