import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "@/lib/redux/store";
// import { enqueueSnackbar } from './notifications';

const initialState: any = {
  messages: [],
};

const slice = createSlice({
  name: "errors",
  initialState,
  reducers: {
    setErrors(state, action) {
      state.messages = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { setErrors } = slice.actions;

// Actions
export const setRequestError =
  (err: any) => (dispatch: AppDispatch, getState: () => RootState) => {
    if (err.data) {
      const message = Object.values(err.data).join("\n");
      console.error("error: " + message);
      // dispatch(
      //   enqueueSnackbar({
      //     message,
      //     options: { variant: 'error' }
      //   })
      // );
    }
    const { errors } = getState();
    dispatch(slice.actions.setErrors([...errors.messages, err.error]));
  };
