import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "@/utils/localStorageAccess";
import { rootReducer } from "./rootReducer";

// ----------------------------------------------------------------------

const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadFromLocalStorage(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

const { dispatch } = store;

export { store, dispatch };

store.subscribe(() => saveToLocalStorage(store.getState()));
