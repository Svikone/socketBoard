import { takeEvery, put, call } from 'redux-saga/effects';
import *as authActions from '../store/auth/login/actions';
import httpServices from '../services/http.service';
import io from 'socket.io-client';
import environment from '../environment/environment';
import *as actions from '../store/main/action';
import { store } from '../App';

function* loginWorker(user) {
  try {
    const token = yield call(httpServices.post, "user/login", user.payload)
    localStorage.setItem('token', token.data.token);
    yield put(authActions.loginSucces(token.data.token))
  } 
  catch (error) {
    yield put(authActions.loginError(error.response.data.message))
  }
}

function* getUserWorker() {
  try {
    const data = yield call(httpServices.get, "user/get",)
    yield put(actions.getUserSuccess(data.data.user))
  } 
  catch (error) {
  }
}

function* boardWorker(board) {
  try {
    const data = yield call(httpServices.post, "board/create",board.payload)
    // yield put(actions.getUserSuccess(data.data.user))
    console.log(data)
  } 
  catch (error) {
  }
}

function* getBoardWorker() {
  try {
    const data = yield call(httpServices.get, "board/get")
    yield put(actions.getBoardSuccess(data.data.board))
  } 
  catch (error) {
  }
}

function* createTaskWorker(task) {
  try {
    const data = yield call(httpServices.post, "board/task/create", task.payload)
    // yield put(actions.getBoardSuccess(data.data.board))
  } 
  catch (error) {
  }
}

function* getTaskWorker(board_id) {
  try {
    const data = yield call(httpServices.get, `board/task/get/${board_id.payload}`)
    yield put(actions.getTaskSuccess(data.data.tasks))
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
      store.dispatch(actions.possibleFriends(response))
    }
  });
}

function* addingToFriendsWorker(data) {
  yield socket.emit('addingToFriends', {idFriend: data.friendWhoAppliedId, status: data.payload});
}

function* addingToFriendsSuccessdWorker() {
  yield socket.on('addingToFriendsSuccess', (response) => {
    if (response) {
      store.dispatch(actions.getUser())
    }
  });
}




  

export function* watchLoadData() {
  yield takeEvery(actions.FRIEND_REQUEST, friendRequestWorker)
  yield takeEvery(authActions.LOGIN, loginWorker)
  yield takeEvery(actions.FRIEND_REQUEST_SUCCESS, friendRequestSuccessWorker)
  yield takeEvery(actions.ADDING_TO_FRIENDS, addingToFriendsWorker)
  yield takeEvery(actions.GET_USER, getUserWorker)
  yield takeEvery(actions.BOARD, boardWorker)
  yield takeEvery(actions.GET_BOARD, getBoardWorker)
  yield takeEvery(actions.ADDING_TO_FRIENDS_SUCCESS, addingToFriendsSuccessdWorker)
  yield takeEvery(actions.CREATE_TASK, createTaskWorker)
  yield takeEvery(actions.GET_TASK, getTaskWorker)

}




