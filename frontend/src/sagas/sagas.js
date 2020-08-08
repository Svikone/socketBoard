import { takeEvery, put, call } from 'redux-saga/effects';
import { LOGIN, loginSucces, loginError } from '../store/auth/login/actions';
import httpServices from '../services/http.service';
import io from 'socket.io-client';
import environment from '../environment/environment';
import { FRIEND_REQUEST, FRIEND_REQUEST_SUCCESS } from '../store/main/action';

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

function* friendRequestWorker(nameFriend) {
    // const dispatch = yield put(actions.getDispatch());
    try {
      // socket.on('friendRequest', (response) => {
      //   // dispatch(actions.gameAwaitEnemySuccess());
      //   if (response.success) {
      //     console.log(response)

      //   //   history.push(`/lobby/${response.gameId}`);
      //   }
      // });
      yield socket.emit('friendRequest', {nameFriend: "ao" });
    } catch (e) {
    }
}

function* friendRequestSuccessWorker() {
    // const dispatch = yield put(actions.getDispatch());
    try {
      socket.on('friendRequest', (response) => {
        // dispatch(actions.gameAwaitEnemySuccess());
        if (response.success) {
          console.log(response)

        //   history.push(`/lobby/${response.gameId}`);
        }
      });
    } catch (e) {
    }
}
  

export function* watchLoadData() {
  yield takeEvery(FRIEND_REQUEST, friendRequestWorker)
  yield takeEvery(LOGIN, loginWorker)
  yield takeEvery(FRIEND_REQUEST_SUCCESS, friendRequestSuccessWorker)
}


