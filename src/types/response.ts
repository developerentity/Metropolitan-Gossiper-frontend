export type ItemsListViewModel<T> = {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  items: T[];
};
