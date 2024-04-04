import {
  getDataByUrl,
  postDataByUrl,
  updateDataByUrl,
  deleteDataByUrl,
  ID,
} from "@/requests";

// COMPANY //

export const getCompanyData = () => getDataByUrl("/company/");

export const getCompanyModules = () => getDataByUrl("/company/module/");

export const updateCompanyData = (id: ID, data: any) =>
  updateDataByUrl(`/company/${id}/`, data);

export const updateCompanyModuleData = (id: ID, data: any) =>
  updateDataByUrl(`/company/module/${id}/`, data);

// ACCOUNT //

export const signIn = (data: any) =>
  postDataByUrl("/account/auth/login/", data);

export const signUp = (data: any, invitation?: string | null) =>
  postDataByUrl(
    "/account/auth/register/",
    data,
    invitation ? { invitation } : {}
  );

export const getAccountData = () => getDataByUrl("/account/");

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
  postDataByUrl("/account/setlang/", { language });
