import {
  deleteDataByUrl,
  getDataByUrl,
  postDataByUrl,
  updateDataByUrl,
} from "@/lib/requests";
import type { Session } from "next-auth";

const base_url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/gossips`;
const likes_url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/likes`;

async function create(data: FormData, session: Session | null) {
  return postDataByUrl(`${base_url}/create`, data, session, true);
}

async function read(params: {
  pageNumber?: number;
  authorId?: string;
  pageSize?: number;
  titleFilter?: string;
  sortField?: string;
  sortOrder?: string;
}) {
  return getDataByUrl(`${base_url}/get`, params);
}

async function readOne(gossipId: string) {
  return getDataByUrl(`${base_url}/get/${gossipId}`);
}

async function readComments(
  gossipId: string,
  params?: {
    pageSize?: string;
    pageNumber?: string;
  }
): Promise<CommentsListType> {
  const reqParams = params ? { params } : {};
  return getDataByUrl(`${base_url}/get/${gossipId}/comments`, reqParams);
}

async function edit(id: string, data: FormData, session: Session | null) {
  return updateDataByUrl(`${base_url}/update/${id}`, data, session, true);
}

async function remove(id: string, session: Session | null) {
  return deleteDataByUrl(`${base_url}/delete/${id}`, session);
}

async function like(gossipId: string, session: Session | null) {
  return postDataByUrl(`${likes_url}/gossip/${gossipId}/like`, {}, session);
}

async function unlike(gossipId: string, session: Session | null) {
  return deleteDataByUrl(`${likes_url}/gossip/${gossipId}/unlike`, session);
}

export default {
  create,
  read,
  readOne,
  readComments,
  edit,
  remove,
  like,
  unlike,
};
