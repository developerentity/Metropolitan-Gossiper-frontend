import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "@/redux/store";
import gossips from "@/requests/gossips";
import { setErrors } from "./errors";

interface IGossip {
  id: string;
  title: string;
  content: string;
  author: string;
  comments: string[];
  likes: string[];
  imageUrl?: string;
}

interface GossipsInitialState {
  gossips: IGossip[];
  totalItems: number;
  totalPages: number;
  page: number;
  pageSize: number | null;
  sortField: string | null;
  sortOrder: "asc" | "desc" | null;
}

const initialState: GossipsInitialState = {
  gossips: [],
  totalItems: 0,
  totalPages: 0,
  page: 1,
  pageSize: null,
  sortField: null,
  sortOrder: null,
};

const slice = createSlice({
  name: "gossipsSlice",
  initialState,
  reducers: {
    setGossips(state, action: PayloadAction<IGossip[]>) {
      state.gossips = action.payload;
    },
    setTotalItems(state, action: PayloadAction<number>) {
      state.totalItems = action.payload;
    },
    setTotalPages(state, action: PayloadAction<number>) {
      state.totalPages = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setPageSize(state, action: PayloadAction<number>) {
      state.pageSize = action.payload;
    },
    setSortField(state, action: PayloadAction<string>) {
      state.sortField = action.payload;
    },
    setSortOrder(state, action: PayloadAction<"asc" | "desc" | null>) {
      state.sortOrder = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
const { setGossips, setTotalItems, setTotalPages } = slice.actions;
export const { setPage, setPageSize, setSortOrder } = slice.actions;

export const getGossips = async (
  titleFilter: null | string,
  authorId?: string
) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const currentState = getState().gossips;
      const response = await gossips.getAll({
        titleFilter,
        authorId,
        page: currentState.page,
        pageSize: currentState.pageSize,
        sortOrder: currentState.sortField,
        sortField: currentState.sortOrder,
      });
      dispatch(setGossips(response.gossips));
      dispatch(setTotalItems(response.totalItems));
      dispatch(setTotalPages(response.totalPages));
    } catch (error: any) {
      const { errors } = getState();
      dispatch(setErrors([...errors.messages, error]));
    }
  };
};
