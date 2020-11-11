import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* createTeamSaga(action){
  console.log('in Create Team Saga, this is action.payload', action.payload);
  let response = yield axios.post(`/api/teams`, action.payload);
  console.log(response);
};

function* fetchTeamAndCaptainsSaga(){
  console.log('in fetchTeamAndCaptainsSaga');
  let response = yield axios.get(`/api/teams/search`);
  console.log(response);
}

function* teamSaga() {
  yield takeLatest('CREATE_TEAM', createTeamSaga);
  yield takeLatest('FETCH_TEAMS_AND_CAPTAINS', fetchTeamAndCaptainsSaga);
};

export default teamSaga;