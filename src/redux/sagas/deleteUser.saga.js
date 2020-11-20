import {takeLatest} from 'redux-saga/effects';
import axios from 'axios';

// Function sends user id to delete to delete route.
function* deleteUser(action){
    console.log('in deleteUser action.payload is', action.payload);
    let user_id_to_delete = action.payload;
    yield axios({
        method: 'DELETE',
        url: `/api/user/${user_id_to_delete}`
    });
};

function* deleteUserSaga() {
  yield takeLatest('DELETE_USER', deleteUser);
};

export default deleteUserSaga;