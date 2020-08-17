import { takeEvery, put, call } from 'redux-saga/effects';
import { LOGIN, loginSucces, loginError } from '../store/auth/login/actions';
import httpServices from '../services/http.service';
import io from 'socket.io-client';
import environment from '../environment/environment';
import { FRIEND_REQUEST, FRIEND_REQUEST_SUCCESS, possibleFriends, ADDING_TO_FRIENDS, GET_USER, getUserSuccess, BOARD } from '../store/main/action';
import { store } from '../App';

function* loginWorker(user) {
    try {
        const token = yield call(httpServices.post, "user/login", user.payload)
        console.log(token.data.token)
        localStorage.setItem('token', token.data.token);
        yield put(loginSucces(token.data.token))
    } 
    catch (error) {
        yield put(loginError(error.response.data.message))
    }
}

function* getUserWorker() {
    try {
      const data = yield call(httpServices.get, "user/get",)
      console.log(data)
      yield put(getUserSuccess(data.data.user))
    } 
    catch (error) {
    }
}

function* boardWorker(board) {
  try {
      const data = yield call(httpServices.post, "board/create",board.payload)
      // yield put(getUserSuccess(data.data.user))
      console.log(data)
    } 
    catch (error) {
    }
}

const socket = io(environment.apiUrl, {
    query: {
      token: localStorage.getItem('token'),
    },
  });

function* friendRequestWorker(data) {
  yield socket.emit('friendRequest', {nameFriend: data.payload.name });
}

function* friendRequestSuccessWorker() {
  yield socket.on('friendInvitesList', (response) => {
    if (response.possibleАriends) {
      store.dispatch(possibleFriends(response))
    }
  });
}

function* addingToFriendsWorker(data) {
  yield socket.emit('addingToFriends', {idFriend: data.friendWhoAppliedId, status: data.payload});
  
}
  

export function* watchLoadData() {
  yield takeEvery(FRIEND_REQUEST, friendRequestWorker)
  yield takeEvery(LOGIN, loginWorker)
  yield takeEvery(FRIEND_REQUEST_SUCCESS, friendRequestSuccessWorker)
  yield takeEvery(ADDING_TO_FRIENDS, addingToFriendsWorker)
  yield takeEvery(GET_USER, getUserWorker)
  yield takeEvery(BOARD, boardWorker)
}




