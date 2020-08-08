import { FRIEND_REQUEST, FRIEND_REQUEST_ERROR, FRIEND_REQUEST_SUCCESS} from "./action";

const defaultState = {
    name: ""
}

export const mainReducer = (state = defaultState, action) => {
    switch(action.type) {
        case FRIEND_REQUEST:
        return {
            ...state,
            name: action.payload
            }
        case FRIEND_REQUEST_SUCCESS:
        return {
            ...state,
            // token: action.payload
            }
        case FRIEND_REQUEST_ERROR:
        return {
            ...state,
            // errorMessage: action.payload,
        }
    }
  return state;
};  