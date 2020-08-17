import { FRIEND_REQUEST, FRIEND_REQUEST_ERROR, FRIEND_REQUEST_SUCCESS, GET_USER_SUCCESS, POSSIBLE_FRIENDS, ADDING_TO_FRIENDS, GET_USER, BOARD} from "./action";

const defaultState = {
    name: "",
    friends: {},
    value: "",
    friendWhoAppliedId: "",
    user: {},
    nameBoard: ""
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
            }
        case POSSIBLE_FRIENDS:
        return {
            ...state,
            friends: action.payload,
        }
        case ADDING_TO_FRIENDS:
        return {
            ...state,
            value: action.payload,
            friendWhoAppliedId: action.friendWhoAppliedId,
            }
        case FRIEND_REQUEST_ERROR:
        return {
            ...state,
        }
        case GET_USER:
        return {
            ...state,
        }
        case GET_USER_SUCCESS:
        return {
            ...state,
            user: action.payload
            }
        case BOARD:
        return {
            ...state,
            nameBoard: action.payload
        }
    }
  return state;
};  