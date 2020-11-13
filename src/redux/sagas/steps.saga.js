import { put, takeLatest, all } from 'redux-saga/effects';
import axios from 'axios';


function* createStepsSaga(action) {
    console.log('ACTION PAYLOAD', action.payload);    
    let response = yield axios({
        method: 'POST',
        url: '/api/steps',
        data: action.payload
    });
    console.log('Response', response);
    yield all([
        put({ type: 'FETCH_LEADER_BOARD' }),
        put({ type: 'FETCH_CHALLENGE_PHOTOS' }),
        put({ type: 'FETCH_TOP_STEPPERS' }),
    ]);
  };

function* stepsSaga() {
    yield takeLatest('CREATE_STEPS', createStepsSaga);

};

export default stepsSaga;