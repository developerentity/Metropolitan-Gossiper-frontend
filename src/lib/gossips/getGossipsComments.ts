import axios from "axios";

const base_url = "http://localhost:5080/gossips/";

export default async function getGossipsComments(gossipId: string) {
  const reqParams = { params: { gossipId } };
  const response = await axios.get(`${base_url}get/comments`, reqParams);
  return response.data;
}
