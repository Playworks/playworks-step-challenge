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

function* fetchContestDetailsSaga(action) {
  console.log('action payload', action.payload);
  let contest = action.payload;
  let response = yield axios({
    method: 'GET',
    url: `/api/contestDetails/${contest}`,
    data: {
      id: contest
    }
  })
}

function* createContestSaga(action) {
  let response = yield axios({
      method: 'POST',
      url: '/api/contest',
      data: action.payload
  });
  console.log('Response', response);
  yield put({
      type: 'FETCH_CONTEST',
      payload: response.data
  })
}

function* contestSaga() {
  yield takeLatest('FETCH_CONTEST', fetchContestSaga);
  yield takeLatest('FETCH_CONTEST_DETAILS', fetchContestDetailsSaga);
  yield takeLatest('CREATE_CONTEST', createContestSaga);
};

export default contestSaga;