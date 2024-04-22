import { combineReducers } from "redux";
import gossipsSlice from "./slices/gossips";

// ----------------------------------------------------------------------

const rootReducer = combineReducers({
  gossips: gossipsSlice,
});

export { rootReducer };
