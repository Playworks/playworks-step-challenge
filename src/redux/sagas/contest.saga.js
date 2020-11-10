import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchContestSaga(){
  console.log('in FetchTeamSaga');
  let response = yield axios.get(`/api/contest`);
  console.log(response.data);
};

function* contestSaga() {
  yield takeLatest('FETCH_CONTEST', fetchContestSaga);
};

export default contestSaga;