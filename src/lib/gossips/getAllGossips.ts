import axios from "axios";

const base_url = "http://localhost:5080/gossips/";

export type ResponseGossipsListType = {
  totalItems: number;
  totalPages: number;
  gossips: IGossip[];
};

export default async function getAllGossips(params: {
  pageNumber?: number;
  authorId?: string;
  pageSize?: number;
  titleFilter?: string;
  sortField?: string;
  sortOrder?: string;
}): Promise<GossipsListType> {
  const reqParams = params ? { params } : {};
  const response = await axios.get(`${base_url}get/`, reqParams);
  return response.data;
}
