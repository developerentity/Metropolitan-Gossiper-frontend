import { getDataByUrl } from "@/lib/requests";
import { Session } from "next-auth";

const base_url = `${process.env.BACKEND_URL}/gossips`;

async function getAll(params: {
  pageNumber?: number;
  authorId?: string;
  pageSize?: number;
  titleFilter?: string;
  sortField?: string;
  sortOrder?: string;
}) {
  return getDataByUrl(`${base_url}get`);
}

async function getOne(gossipId: string) {
  return getDataByUrl(`${base_url}/get/${gossipId}`);
}

export default {
  getAll,
  getOne,
};
