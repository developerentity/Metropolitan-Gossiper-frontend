/**
 * Should be synchronized with backend
 */
type AuthorType = {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  email: string;
  about: string;
  gossips: string[];
  createdAt: Date;
};
