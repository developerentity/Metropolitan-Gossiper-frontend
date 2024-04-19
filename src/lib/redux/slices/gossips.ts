import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/lib/redux/store";
import gossips from "@/requests/gossips";
import { ItemsListViewModel } from "@/types/response";

interface GossipsInitialState {
  gossips: IGossip[];
  totalItems: number;
  totalPages: number;

  pageNumber: number;
  pageSize: number;
  sortField: string | null;
  sortOrder: "asc" | "desc" | null;
  titleFilter: string | null;
  authorId: string | null;

  loading: boolean;
  error: null | string | undefined;
}

interface FetchGossipsPayload {
  authorId?: string;
}

export const fetchGossips = createAsyncThunk(
  "gossips/fetchGossips",
  async (payload: FetchGossipsPayload, { getState }) => {
    const state: RootState = getState() as RootState;
    const { pageNumber, pageSize, sortField, sortOrder, titleFilter } =
      state.gossips;

    const response: ItemsListViewModel<IGossip> = await gossips.getAll({
      authorId: payload.authorId,
      titleFilter,
      pageNumber,
      pageSize,
      sortOrder,
      sortField,
    });

    return response;
  }
);

const initialState: GossipsInitialState = {
  gossips: [],
  totalItems: 0,
  totalPages: 0,

  pageNumber: 1,
  pageSize: 10,
  sortField: null,
  sortOrder: null,
  titleFilter: null,
  authorId: null,

  loading: false,
  error: null,
};

const slice = createSlice({
  name: "gossipsSlice",
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.pageNumber = action.payload;
    },
    setPageSize(state, action: PayloadAction<number>) {
      state.pageSize = action.payload;
      state.pageNumber = 1;
    },
    setSortField(state, action: PayloadAction<string>) {
      state.sortField = action.payload;
      state.pageNumber = 1;
    },
    setSortOrder(state, action: PayloadAction<"asc" | "desc" | null>) {
      state.sortOrder = action.payload;
      state.pageNumber = 1;
    },
    setTitleFilter(state, action: PayloadAction<string>) {
      state.titleFilter = action.payload;
      state.pageNumber = 1;
    },
    setAuthorId(state, action: PayloadAction<string>) {
      state.authorId = action.payload;
      state.pageNumber = 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGossips.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchGossips.fulfilled, (state, action) => {
      state.loading = false;
      state.totalItems = action.payload.totalItems;
      state.totalPages = action.payload.totalPages;
      state.gossips = action.payload.items;
    });
    builder.addCase(fetchGossips.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
  setPage,
  setPageSize,
  setSortOrder,
  setSortField,
  setTitleFilter,
  setAuthorId,
} = slice.actions;
