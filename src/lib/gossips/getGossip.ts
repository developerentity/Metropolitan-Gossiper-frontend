import axios from "axios";

const base_url = "http://localhost:5080/gossips/";

export default async function getGossip(gossipId: string) {
  const response = await axios.get(`${base_url}get/${gossipId}`);
  return response.data;
}
