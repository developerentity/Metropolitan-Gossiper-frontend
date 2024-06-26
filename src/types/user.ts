export interface User {
  id: string;
  name?: string;
  avatarUrl?: string;
  email?: string;

  [key: string]: unknown;
}
