export const FRIEND_REQUEST = "FRIEND_REQUEST";
export const FRIEND_REQUEST_SUCCESS = "FRIEND_REQUEST_SUCCESS";
export const FRIEND_REQUEST_ERROR = "FRIEND_REQUEST_ERROR";
export const POSSIBLE_FRIENDS = "POSSIBLE_FRIENDS";
export const ADDING_TO_FRIENDS = "ADDING_TO_FRIENDS";
export const GET_USER = "GET_USER";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const BOARD = "BOARD";
export const GET_BOARD = "GET_BOARD";
export const GET_BOARD_SUCCESS = "GET_BOARD_SUCCESS";
export const ADDING_TO_FRIENDS_SUCCESS = "ADDING_TO_FRIENDS_SUCCESS";
export const CREATE_TASK = "CREATE_TASK";
export const CONNECT_TO_BOARD = "CONNECT_TO_BOARD";
export const CONNECT_TO_BOARD_SUCCESS = "CONNECT_TO_BOARD_SUCCESS";
export const SOCKET_MOVE = "SOCKET_MOVE"

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

export const getBoard = () => {
    return {
        type: GET_BOARD,
    }
}

export const getBoardSuccess = (board) => {
    return {
        type: GET_BOARD_SUCCESS,
        payload: board
    }
}

export const addingToFriendsSuccess = () => {
    return {
        type: ADDING_TO_FRIENDS_SUCCESS,
    }
}

export const createTask = (task) => {
    return {
        type: CREATE_TASK,
        payload: task
    }
}

export const connectToBoard = (board_id) => {
    return {
        type: CONNECT_TO_BOARD,
        payload: board_id
    }
}

export const connectToBoardSuccess = (board) => {
    return {
        type: CONNECT_TO_BOARD_SUCCESS,
        payload: board
    }
}

export const socketMove = (board_id, tasks) => {
    return {
        type: SOCKET_MOVE,
        payload: board_id,
        tasks
    }
}

