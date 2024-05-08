import { getDataByUrl } from "@/lib/requests";
import type { Session } from "next-auth";

const base_url = `${process.env.BACKEND_URL}/users`;

async function create() {}

async function read(params: {
  pageNumber?: number;
  pageSize?: number;
  sortField?: string;
  sortOrder?: string;
}) {
  return getDataByUrl(`${base_url}/get`, params);
}

async function readOne(userId: string) {
  return getDataByUrl(`${base_url}/get/${userId}`);
}

async function update() {}

async function remove() {}

export default {
  create,
  read,
  readOne,
  update,
  remove,
};
