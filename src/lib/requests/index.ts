import { Session } from "next-auth";
import axios from "axios";

import { logger } from "@/lib/default-logger";

export type ID = string | number;

export const getDataByUrl = async (url: string, params?: object) => {
  try {
    const reqParams = params ? { params } : {};
    const response = await axios.get(url, reqParams);
    return response.data;
  } catch (error) {
    logger.error(error);
  }
};

export const postDataByUrl = async (
  url: string,
  data: object,
  session: Session | null,
  isHasFile?: boolean,
  params?: object
) => {
  const token = session?.backendTokens.accessToken;
  try {
    const reqParams = params ? { params } : {};
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": isHasFile ? "multipart/form-data" : "application/json",
      },
      ...reqParams,
    });
    return response.data;
  } catch (error) {
    logger.error(error);
  }
};

export const updateDataByUrl = async (
  url: string,
  data: object,
  session: Session | null,
  params?: object
) => {
  const token = session?.backendTokens.accessToken;
  try {
    const reqParams = params ? { params } : {};
    const response = await axios.patch(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      ...reqParams,
    });
    return response.data;
  } catch (error) {
    logger.error(error);
  }
};

export const putDataByUrl = async (
  url: string,
  data: object,
  session: Session | null,
  params?: object
) => {
  const token = session?.backendTokens.accessToken;
  try {
    const reqParams = params ? { params } : {};
    const response = await axios.put(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      ...reqParams,
    });
    return response.data;
  } catch (error) {
    logger.error(error);
  }
};

export const deleteDataByUrl = async (url: string, session: Session | null) => {
  const token = session?.backendTokens.accessToken;
  try {
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.status === 204;
  } catch (error) {
    logger.error(error);
  }
};
