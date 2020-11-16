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
  yield takeLatest('CREATE_CONTEST', createContestSaga);
};

export default contestSaga;