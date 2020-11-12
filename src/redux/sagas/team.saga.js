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

function* fetchTeamDetailsSaga(action){
  console.log('in fetchTeamDetailsSaga');
  let response = yield axios({
    method: 'GET',
    url: `/api/teamDetails/${action.payload}`,
    params: {
      id: action.payload
    }
  })
  console.log('this is response from server teams', response);
  yield put({
    type: 'SET_TEAM_DETAILS',
    payload: response.data
  })
}

function* teamSaga() {
  yield takeLatest('CREATE_TEAM', createTeamSaga);
  yield takeLatest('FETCH_TEAMS_FOR_JOIN', fetchTeamsForJoinSaga);
  yield takeLatest('FETCH_CAPTAINS_FOR_JOIN', fetchCaptainsForJoinSaga);
  yield takeLatest('FETCH_TEAM_DETAILS', fetchTeamDetailsSaga);
};

export default teamSaga;