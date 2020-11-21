import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// Function gets top 20 steppers via get request and puts data into reducer listening for 'SET_TOP_STEPPERS'
function* fetchTopSteppers(){
  let response = yield axios.get(`/api/steps/topsteppers`);
  yield put({
    type: 'SET_TOP_STEPPERS',
    payload: response.data
  });
};

function* topSteppersSaga() {
  yield takeLatest('FETCH_TOP_STEPPERS', fetchTopSteppers);
};

export default topSteppersSaga;