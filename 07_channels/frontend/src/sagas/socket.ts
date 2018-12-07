import * as ioClient from 'socket.io-client';
import { all, fork, take, call, put, cancel } from 'redux-saga/effects';
import { actionIds } from '../common';
import { eventChannel } from 'redux-saga';

function connect() {
  // Real life project extract this into an API module  
  const socket = ioClient.connect('http://localhost:1337/', null);
  
  // We need to wrap the socket connection into a promise (socket returs callback)
  return new Promise((resolve, reject) => {
    socket.on('connect', () => {
      socket.emit('messages');
      resolve({ socket });
    });

    socket.on('connect_error', err => {
      console.log('connect failed :-(');
      reject(new Error('ws:connect_failed '));
    });
  }).catch(error => ({ socket, error }));
}

function subscribe(socket) {
  return eventChannel(emit => {
    socket.on('patients', (message) => {
      console.log(message);
      //emit(onMessageReceived(mapApiSimpleMessageToMessage(message)));
    });
    socket.on('disconnect', e => {
      // TODO: handle
    });
    socket.on('error', error => {
      // TODO: handle
      console.log('Error while trying to connect, TODO: proper handle of this event');
    });

    return () => { };
  });
}

function* read(socket) {
  const channel = yield call(subscribe, socket);
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}

function* handleIO(socket) {
  yield fork(read, socket);
  // TODO in the future we could add here a write fork
}


function* flow() {
	while(true) {
		yield take(actionIds.START_SOCKET_SUBSCRIPTION);
		const {socket, error} = yield call(connect);
		if(socket) {
      console.log('connection to socket succeeded');
      const ioTask = yield fork(handleIO, socket);
      yield take(actionIds.STOP_SOCKET_SUBSCRIPTION);
      yield cancel(ioTask);      
		} else {
			console.log('error connecting');
    }
    socket.disconnect();    
	}
}

export function *socketRootSaga() {
	yield all([
		fork(flow),
	])
}


