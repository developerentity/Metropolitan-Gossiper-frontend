import {
  deleteDataByUrl,
  getDataByUrl,
  postDataByUrl,
  updateDataByUrl,
} from "@/lib/requests";
import type { Session } from "next-auth";

const base_url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/gossips`;

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
  params: {
    pageSize?: number;
    pageNumber?: number;
  }
): Promise<CommentsListType> {
  return getDataByUrl(`${base_url}/get/${gossipId}/comments`, params);
}

async function edit(id: string, data: FormData, session: Session | null) {
  return updateDataByUrl(`${base_url}/update/${id}`, data, session, true);
}

async function remove(id: string, session: Session | null) {
  return deleteDataByUrl(`${base_url}/delete/${id}`, session);
}

async function getLikes(itemId: string): Promise<string[]> {
  return getDataByUrl(`${base_url}/get/${itemId}/likes`);
}

async function like(itemId: string, session: Session | null) {
  return await postDataByUrl(`${base_url}/${itemId}/like`, {}, session);
}

async function unlike(itemId: string, session: Session | null) {
  return deleteDataByUrl(`${base_url}/${itemId}/unlike`, session);
}

async function createComment(
  gossipId: string,
  data: { parent: string | null; content: string },
  session: Session | null
) {
  return postDataByUrl(`${base_url}/create/${gossipId}/comment`, data, session);
}

async function deleteComment(commentId: string, session: Session | null) {
  return deleteDataByUrl(`${base_url}/delete/comment/${commentId}`, session);
}

export default {
  create,
  read,
  readOne,
  readComments,
  edit,
  remove,
  getLikes,
  like,
  unlike,
  createComment,
  deleteComment,
};
