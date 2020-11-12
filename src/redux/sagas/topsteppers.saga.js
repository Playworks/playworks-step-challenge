import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchTopSteppers(){
  let response = yield axios.get(`/api/steps/topsteppers`);
  console.log(response.data);

  yield put({
    type: 'SET_TOP_STEPPERS',
    payload: response.data
  });
};

function* topSteppersSaga() {
  yield takeLatest('FETCH_TOP_STEPPERS', fetchTopSteppers);
};

export default topSteppersSaga;