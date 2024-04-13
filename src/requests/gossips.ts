import { getDataByUrl } from ".";

const base_url = "http://localhost:5080/gossips/";

const getAll = (params: {
  page: number;
  authorId?: string;
  pageSize: number | null;
  titleFilter: string | null;
  sortField: string | null;
  sortOrder: string | null;
}) => getDataByUrl(base_url, params);

const getOne = (gossipId: string) => getDataByUrl(base_url, { gossipId });

export default {
  getAll,
  getOne,
};
