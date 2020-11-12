import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* createStepsSaga(action) {
    console.log('ACTION PAYLOAD', action.payload);    
    let response = yield axios({
        method: 'POST',
        url: '/api/steps',
        data: action.payload
    });
    console.log('Response', response);
    yield put({
        type: ('FETCH_LEADER_BOARD', 'FETCH_CHALLENGE_PHOTOS', 'FETCH_TOP_STEPPERS'),
        payload: response.data
    });
  };

function* stepsSaga() {
    yield takeLatest('CREATE_STEPS', createStepsSaga);

};

export default stepsSaga;