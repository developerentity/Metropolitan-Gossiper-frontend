import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "@/redux/store";
import gossips from "@/requests/gossips";
// import { enqueueSnackbar } from './notifications';

interface IGossip {
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
  currentPage: number;
  pageSize: number;
  pageNumber: number;
  sortField: string;
  sortOrder: "asc" | "desc" | "";
}

const initialState: GossipsInitialState = {
  gossips: [],
  totalItems: 0,
  totalPages: 0,
  currentPage: 0,
  pageSize: 0,
  pageNumber: 0,
  sortField: "",
  sortOrder: "",
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
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setPageSize(state, action: PayloadAction<number>) {
      state.pageSize = action.payload;
    },
    setPageNumber(state, action: PayloadAction<number>) {
      state.pageNumber = action.payload;
    },
    setSortField(state, action: PayloadAction<string>) {
      state.sortField = action.payload;
    },
    setSortOrder(state, action: PayloadAction<"asc" | "desc" | "">) {
      state.sortOrder = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// export const getGossips = () => {
//   return async (dispatch: AppDispatch) => {
//     try {
//       const response = await dispatch(setPokemonList(response.data.results));
//     } catch (error: any) {
//       // dispatch(showSnackbar(error.message))
//       return;
//     }
//   };
// };

// Actions
// export const setRequestError =
//   (err: any) => (dispatch: AppDispatch, getState: () => RootState) => {
//     if (err.data) {
//       const message = Object.values(err.data).join("\n");
//       console.error("error: " + message);
//       // dispatch(
//       //   enqueueSnackbar({
//       //     message,
//       //     options: { variant: 'error' }
//       //   })
//       // );
//     }
//     const { errors } = getState();
//     dispatch(slice.actions.setErrors([...errors.messages, err.error]));
//   };
