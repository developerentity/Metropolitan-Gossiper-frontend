import { getDataByUrl } from ".";

const base_url = "http://localhost:5080/gossips/";

const getAll = () => getDataByUrl(base_url);
const getOne = (gossipId: string) => getDataByUrl(base_url, { gossipId });

export default {
  getAll,
  getOne,
};
