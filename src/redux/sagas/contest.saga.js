import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// Function gets all contests with dates and puts them in contest.reducer
function* fetchContestSaga(){
  let response = yield axios.get(`/api/contest`);
  // console.log(response.data);
  yield put({
    type: 'SET_CONTEST',
    payload: response.data
  });
};

// Function sends post request with contest creation data then refetches contests
function* createContestSaga(action) {
  let response = yield axios({
      method: 'POST',
      url: '/api/contest',
      data: action.payload
  });
  console.log('Response', response);
  yield put({type: 'FETCH_CONTEST'});
}

function* contestSaga() {
  yield takeLatest('FETCH_CONTEST', fetchContestSaga);
  yield takeLatest('CREATE_CONTEST', createContestSaga);
};

export default contestSaga;