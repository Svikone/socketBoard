export const FRIEND_REQUEST = "FRIEND_REQUEST";
export const FRIEND_REQUEST_SUCCESS = "FRIEND_REQUEST_SUCCESS";
export const FRIEND_REQUEST_ERROR = "FRIEND_REQUEST_ERROR";
export const POSSIBLE_FRIENDS = "POSSIBLE_FRIENDS";

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
