import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* getUserLogs(action) {
    console.log('ACTION PAYLOAD', action.payload);
    let userLogsToGet = action.payload;    
    let response = yield axios({
        method: 'GET',
        url: `/api/logs/${userLogsToGet}`,
        data: {
            id: userLogsToGet
        }
    });
    console.log('Response', response);
    yield put({
        type: 'SET_LOGS',
        payload: response.data
    })
  };

function* logsSaga() {
    yield takeLatest('FETCH_LOGS', getUserLogs);

};

export default logsSaga;