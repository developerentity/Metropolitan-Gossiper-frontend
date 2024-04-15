import { getDataByUrl } from ".";

const base_url = "http://localhost:5080/gossips/";

const getAll = (params: {
  pageNumber: number;
  authorId: string | undefined;
  pageSize: number;
  titleFilter: string | null;
  sortField: string | null;
  sortOrder: string | null;
}) => getDataByUrl(`${base_url}get/`, params);

const getOne = (gossipId: string) =>
  getDataByUrl(`${base_url}/get/${gossipId}/`);

export default {
  getAll,
  getOne,
};
