import {
  getDataByUrl,
  postDataByUrl,
  updateDataByUrl,
  deleteDataByUrl,
  ID,
} from "@/requests";

const base_url = "http://localhost:5080/account/";

const signIn = (data: { email: string; password: string }) =>
  postDataByUrl(`${base_url}auth/signin/`, data);

const signUp = (
  data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  },
  invitation?: string | null
) =>
  postDataByUrl(
    `${base_url}auth/signup/`,
    data,
    invitation ? { invitation } : {}
  );

const signOut = () => deleteDataByUrl(`${base_url}auth/signout/`);

const getUser = () => getDataByUrl(base_url);

const refreshToken = () => postDataByUrl(`${base_url}refresh-token/`, {});

// ----------------------------------------------------------------------

export const updateAccountData = (id: ID, data: any) =>
  updateDataByUrl(`/account/${id}/`, data);

export const patchAccountPassword = (data: any) =>
  updateDataByUrl(`/account/auth/password/change`, data);

export const resetPassword = (data: any) =>
  postDataByUrl(`/account/auth/password/reset/`, data);

export const verifyPassword = (data: any) =>
  postDataByUrl(`/account/auth/password/reset/confirm/`, data);

export const deleteAccount = (id: ID) => deleteDataByUrl(`/account/${id}`);

export const setAccountLanguage = (language: string) =>
  postDataByUrl("/account/set-lang/", { language });

export default {
  signIn,
  signUp,
  signOut,
  getUser,
  refreshToken,
};
