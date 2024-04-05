"use client";

import account from "@/requests/account";
import type { User } from "@/types/user";

export interface SignUpParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignInWithOAuthParams {
  provider: "google" | "discord";
}

export interface SignInWithPasswordParams {
  email: string;
  password: string;
}

export interface ResetPasswordParams {
  email: string;
}

class AuthClient {
  async signUp(params: SignUpParams): Promise<{ error?: string }> {
    const data = await account.signUp({
      username: params.firstName + " " + params.lastName,
      email: params.email,
      password: params.password,
    });

    const token = data.accessToken;

    localStorage.setItem("access-token", token);

    return {};
  }

  async signInWithOAuth(_: SignInWithOAuthParams): Promise<{ error?: string }> {
    return { error: "Social authentication not implemented" };
  }

  async signInWithPassword(
    params: SignInWithPasswordParams
  ): Promise<{ error?: string }> {
    const { email, password } = params;

    const data = await account.signIn({ loginOrEmail: email, password });
    const token = data.accessToken;

    localStorage.setItem("access-token", token);

    return {};
  }

  async resetPassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: "Password reset not implemented" };
  }

  async updatePassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: "Update reset not implemented" };
  }

  async getUser(): Promise<{ data?: User | null; error?: string }> {
    const user = await account.getUser();

    const token = localStorage.getItem("access-token");

    if (!token) {
      return { data: null };
    }

    return { data: user };
  }

  async signOut(): Promise<{ error?: string }> {
    await account.signOut();
    localStorage.removeItem("access-token");

    return {};
  }
}

export const authClient = new AuthClient();
