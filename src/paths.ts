export const paths = {
  home: "/",
  auth: {
    signIn: "/auth/sign-in",
    signUp: "/auth/sign-up",
    resetPassword: "/auth/reset-password",
  },
  dashboard: {
    overview: "/dashboard",
    account: "/dashboard/account",
    authors: "/dashboard/authors",
    gossips: {
      list: "/dashboard/gossips",
      create: "/dashboard/gossips/create",
      view: (id: string) => `/dashboard/gossips/${id}`,
      edit: (id: string) => `/dashboard/gossips/${id}/edit`,
    },
    settings: "/dashboard/settings",
  },
  errors: { notFound: "/errors/not-found" },
} as const;
