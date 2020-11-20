import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// Function sends a get request to get logs by user_id, puts data into reducer listening for 'SET_LOGS'
function* getUserLogs(action) {
    // console.log('ACTION PAYLOAD', action.payload);
    let userLogsToGet = action.payload;    
    let response = yield axios({
        method: 'GET',
        url: `/api/logs/${userLogsToGet}`,
    });
    // console.log('Response', response);
    yield put({
        type: 'SET_LOGS',
        payload: response.data
    })
  };

function* logsSaga() {
    yield takeLatest('FETCH_LOGS', getUserLogs);
};

export default logsSaga;