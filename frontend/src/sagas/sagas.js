import { takeEvery, put, call } from 'redux-saga/effects';
import { LOGIN, loginSucces, loginError } from '../store/auth/login/actions';
import httpServices from '../services/http.service';
import io from 'socket.io-client';
import environment from '../environment/environment';
import { FRIEND_REQUEST, FRIEND_REQUEST_SUCCESS, possibleFriends } from '../store/main/action';
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
  

export function* watchLoadData() {
  yield takeEvery(FRIEND_REQUEST, friendRequestWorker)
  yield takeEvery(LOGIN, loginWorker)
  yield takeEvery(FRIEND_REQUEST_SUCCESS, friendRequestSuccessWorker)
}




