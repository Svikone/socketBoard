export const FRIEND_REQUEST = "FRIEND_REQUEST";
export const FRIEND_REQUEST_SUCCESS = "FRIEND_REQUEST_SUCCESS";
export const FRIEND_REQUEST_ERROR = "FRIEND_REQUEST_ERROR";
export const POSSIBLE_FRIENDS = "POSSIBLE_FRIENDS";
export const ADDING_TO_FRIENDS = "ADDING_TO_FRIENDS";
export const GET_USER = "GET_USER";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const BOARD="BOARD"

export const friendRequest = (name) => {
    return {
        type: FRIEND_REQUEST,
        payload: name
    }
}

export const friendRequestSucces = () => {
    return {
        type: FRIEND_REQUEST_SUCCESS,
        // payload: data
    }
}

export const possibleFriends = (friends) => {
    return {
        type: POSSIBLE_FRIENDS,
        payload: friends,
    }
}

export const friendRequestError = (error) => {
    return {
        type: FRIEND_REQUEST_ERROR,
        payload: error,
    }
}

export const addingToFriends = (value, id) => {
    return {
        type: ADDING_TO_FRIENDS,
        payload: value,
        friendWhoAppliedId: id
    }
}

export const getUser = () => {
    return {
        type: GET_USER,
    }
}

export const getUserSuccess = (user) => {
    return {
        type: GET_USER_SUCCESS,
        payload: user,
    }
}

export const createBoard = (nameBoard) => {
    return {
        type: BOARD,
        payload: nameBoard,
    }
}
