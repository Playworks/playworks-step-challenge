import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchContestSaga(){
  let response = yield axios.get(`/api/contest`);
  console.log(response.data);

  yield put({
    type: 'SET_CONTEST',
    payload: response.data
  });
};

function* contestSaga() {
  yield takeLatest('FETCH_CONTEST', fetchContestSaga);
};

export default contestSaga;