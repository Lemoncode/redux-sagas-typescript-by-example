import * as ioClient from 'socket.io-client';
import { all, fork, take, call } from 'redux-saga/effects';
import { actionIds } from '../common';

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

function* flow() {
	while(true) {
		yield take(actionIds.START_SOCKET_SUBSCRIPTION);
		const {socket, error} = yield call(connect);
		if(socket) {
			console.log('connection to socket succeeded');
		} else {
			console.log('error connecting');
		}
	}
}

export function *socketRootSaga() {
	yield all([
		fork(flow),
	])
}


