import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* createTeamSaga(action){
  console.log('in Create Team Saga, this is action.payload', action.payload);
  let response = yield axios.post(`/api/teams`, action.payload);
  console.log(response);
};

function* fetchCaptainsForJoinSaga(){
  console.log('in fetchCaptainsForJoinSaga');
  let response = yield axios.get('/api/teams/searchforcaptains')
  console.log('this is response from server captains', response);
}

function* fetchTeamsForJoinSaga(){
  console.log('in fetchTeamsForJoinSaga');
  let response = yield axios.get('/api/teams/searchforteams')
  console.log('this is response from server teams', response);
}

function* teamSaga() {
  yield takeLatest('CREATE_TEAM', createTeamSaga);
  yield takeLatest('FETCH_TEAMS_FOR_JOIN', fetchTeamsForJoinSaga);
  yield takeLatest('FETCH_CAPTAINS_FOR_JOIN', fetchCaptainsForJoinSaga);
};

export default teamSaga;