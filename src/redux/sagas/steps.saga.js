import { put, takeLatest, all } from 'redux-saga/effects';
import axios from 'axios';

// function sends post request with user id, date and steps to be inserted into db
// refetches with yield all
function* createStepsSaga(action) {
    // console.log('ACTION PAYLOAD', action.payload);    
    let response = yield axios({
        method: 'POST',
        url: '/api/steps',
        data: action.payload
    });
    // console.log('Response', response);
    yield all([
        put({ type: 'FETCH_LEADER_BOARD' }),
        put({ type: 'FETCH_CHALLENGE_PHOTOS' }),
        put({ type: 'FETCH_TOP_STEPPERS' }),
    ]);
  };

// function sends post request with user id and date 
function* subtractStepsSaga(action) {
    // console.log('ACTION PAYLOAD', action.payload);    
    let response = yield axios({
        method: 'POST',
        url: '/api/subtractsteps',
        data: action.payload
    });
    // console.log('Response', response);
  };

function* stepsSaga() {
    yield takeLatest('CREATE_STEPS', createStepsSaga);
    yield takeLatest('SUBTRACT_STEPS', subtractStepsSaga);
};

export default stepsSaga;