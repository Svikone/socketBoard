export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN = "LOGIN";
export const LOGIN_ERROR = "LOGIN_ERROR";

export const loginSucces = (token) => {
    return {
        type: LOGIN_SUCCESS,
        payload: token
    }
}

export const setLoginData = (data) => {
    return {
        type: LOGIN,
        payload: data
    }
}

export const loginError = (error) => {
    return {
        type: LOGIN_ERROR,
        payload: error,
    }
}
