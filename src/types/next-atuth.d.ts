import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      firstName: string;
      lastName: string;
      email: string;
      role: string;
      id: string;
    };
    backendTokens: {
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
    };
  }
}

import JWT from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      firstName: string;
      lastName: string;
      email: string;
      role: string;
      id: string;
    };
    backendTokens: {
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
    };
  }
}
