import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// Function sends post request with contest creation data then refetches contests
function* createContestSaga(action) {
  yield axios({
      method: 'POST',
      url: '/api/contest',
      data: action.payload
  });
  yield put({type: 'FETCH_CONTEST'});
};

// Function gets all contests with dates and puts them in contest.reducer
function* fetchContestSaga(){
  let response = yield axios.get(`/api/contest`);
  yield put({
    type: 'SET_CONTEST',
    payload: response.data
  });
};

function* contestSaga() {
  yield takeLatest('CREATE_CONTEST', createContestSaga);
  yield takeLatest('FETCH_CONTEST', fetchContestSaga);
};

export default contestSaga;