import { combineReducers } from "redux";
import errorsReducer from "./slices/errors";
import gossipsSlice from "./slices/gossips";

// ----------------------------------------------------------------------

const rootReducer = combineReducers({
  errors: errorsReducer,
  gossips: gossipsSlice,
});

export { rootReducer };
