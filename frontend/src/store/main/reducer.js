import { FRIEND_REQUEST, FRIEND_REQUEST_ERROR, FRIEND_REQUEST_SUCCESS, POSSIBLE_FRIENDS} from "./action";

const defaultState = {
    name: "",
    friends: {}
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
        case POSSIBLE_FRIENDS:
        return {
            ...state,
            friends: action.payload,
        }
        case FRIEND_REQUEST_ERROR:
        return {
            ...state,
            // errorMessage: action.payload,
        }
    }
  return state;
};  