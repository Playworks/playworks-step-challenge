import { put, takeLatest,all } from 'redux-saga/effects';
import axios from 'axios';

function* deleteUser(action){
    console.log('payload', action.payload);
    let userToDelete = action.payload;
    yield axios({
        method: 'DELETE',
        url: `/api/user/delete`,
        data: {
            id: userToDelete
        }
    })
};

function* deleteUserSaga() {
  yield takeLatest('DELETE_USER', deleteUser);
};

export default deleteUserSaga;