/**
 * Should be synchronized with backend
 */
type AuthorType = {
  id: string;
  role: string;
  firstName: string;
  lastName: string;
  avatarUrl: string | undefined;
  email: string;
  about: string;
  gossips: string[];
  createdAt: Date;
};
