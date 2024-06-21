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
  isThisFormData?: boolean,
  params?: object
) => {
  const token = session?.backendTokens.accessToken;
  try {
    const reqParams = params ? { params } : {};
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": isThisFormData
          ? "multipart/form-data"
          : "application/json",
      },
      ...reqParams,
    });
    return response.data;
  } catch (error) {
    return { errors: _handleAxiosError(error) };
  }
};

export const updateDataByUrl = async (
  url: string,
  data: object,
  session: Session | null,
  isThisFormData?: boolean,
  params?: object
) => {
  const token = session?.backendTokens.accessToken;
  try {
    const reqParams = params ? { params } : {};
    const response = await axios.patch(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": isThisFormData
          ? "multipart/form-data"
          : "application/json",
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
  isThisFormData?: boolean,
  params?: object
) => {
  const token = session?.backendTokens.accessToken;
  try {
    const reqParams = params ? { params } : {};
    const response = await axios.put(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": isThisFormData
          ? "multipart/form-data"
          : "application/json",
      },
      ...reqParams,
    });
    return response.data;
  } catch (error) {
    logger.error(error);
  }
};

export const deleteDataByUrl = async (
  url: string,
  session: Session | null,
  params?: object
) => {
  const token = session?.backendTokens.accessToken;
  const reqParams = params ? { params } : {};
  try {
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      ...reqParams,
    });
    return response.data || response.status === 204;
  } catch (error) {
    logger.error(error);
  }
};

const _handleAxiosError = (error: unknown) => {
  logger.error(error);
  if (axios.isAxiosError(error)) {
    if (error.response && error.response.status === 400) {
      return error.response.data.errors;
    } else {
      return error.message;
    }
  } else {
    return "An unexpected error occurred";
  }
};
