import *as actions from "./action";

const defaultState = {
    name: "",
    friends: [],
    value: "",
    friendWhoAppliedId: "",
    user: {},
    nameBoard: "",
    board: {},
    task: {},
    board_id: "",
    tasks: []
}

export const mainReducer = (state = defaultState, action) => {
    switch(action.type) {
        case actions.FRIEND_REQUEST:
        return {
            ...state,
            name: action.payload
            }
        case actions.FRIEND_REQUEST_SUCCESS:
        return {
            ...state,
            }
        case actions.POSSIBLE_FRIENDS:
        return {
            ...state,
            friends: action.payload.possibleАriends,
        }
        case actions.ADDING_TO_FRIENDS:
        return {
            ...state,
            value: action.payload,
            friendWhoAppliedId: action.friendWhoAppliedId,
            }
        case actions.FRIEND_REQUEST_ERROR:
        return {
            ...state,
        }
        case actions.GET_USER:
        return {
            ...state,
        }
        case actions.GET_USER_SUCCESS:
        return {
            ...state,
            user: action.payload,
            friends: action.payload.expectedFriend
            }
        case actions.BOARD:
        return {
            ...state,
            nameBoard: action.payload
        }
        case actions.GET_BOARD:
        return {
            ...state,
        }
        case actions.GET_BOARD_SUCCESS:
        return {
            ...state,
            board: action.payload
        }
        case actions.ADDING_TO_FRIENDS_SUCCESS:
        return {
            ...state,
        }
        case actions.CREATE_TASK:
        return {
            ...state,
            task: action.payload
        } 
        case actions.GET_TASK:
        return {
            ...state,
            board_id: action.payload 
        }
        case actions.GET_TASK_SUCCESS:
        return {
            ...state,
            tasks: action.payload 
        }
    }
  return state;
};  