import { combineReducers } from "redux";
import { loginReducer } from "./auth/login/reducer";
import { mainReducer } from "./main/reducer";

export default combineReducers({
    login: loginReducer,
    main: mainReducer
});