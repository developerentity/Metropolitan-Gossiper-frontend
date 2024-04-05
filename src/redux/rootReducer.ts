import { combineReducers } from "redux";
import errorsReducer from "./slices/errors";

// ----------------------------------------------------------------------

const rootReducer = combineReducers({
  errors: errorsReducer,
});

export { rootReducer };
