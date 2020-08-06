import { takeEvery, put, call } from 'redux-saga/effects';
import { LOGIN, loginSucces, loginError } from '../store/auth/login/actions';
import httpServices from '../services/http.service';
import io from 'socket.io-client';
import environment from '../environment/environment';
import { eventChannel } from 'redux-saga';
import { all, apply, fork, take } from 'redux-saga/effects';

function* loginWorker(user) {
    try {
        const token = yield call(httpServices.post, "user/login", user.payload)
        console.log(token)
        localStorage.setItem('token', token.data.token);
        yield put(loginSucces(token.data.token))
    } 
    catch (error) {
        yield put(loginError(error.response.data.message))
    }
}

export function* watchLoadData() {
    yield takeEvery(LOGIN, loginWorker)
}

const socket = io(environment.apiUrl, {
    query: {
      token: localStorage.getItem('token'),
    },
  });

function* WorkergameAwaitEnemy() {
    // const dispatch = yield put(actions.getDispatch());
    try {
      socket.on('addToFriends', (response) => {
        // dispatch(actions.gameAwaitEnemySuccess());
        if (response.success) {
        //   history.push(`/lobby/${response.gameId}`);
        }
      });
      yield socket.emit('addToFriends', {nameFriend: "ao" });
    } catch (e) {
    }
  }
