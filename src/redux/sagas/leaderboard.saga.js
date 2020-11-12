import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchLeaderBoard(){
  let response = yield axios.get(`/api/steps/teamleaderboard`);
  console.log(response.data);

  yield put({
    type: 'SET_LEADER_BOARD',
    payload: response.data
  });
};

function* leaderBoardSaga() {
  yield takeLatest('FETCH_LEADER_BOARD', fetchLeaderBoard);
};

export default leaderBoardSaga;