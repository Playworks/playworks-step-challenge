import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* createTeamSaga(action){
  yield axios.post(`/api/teams`, action.payload);
};

function* fetchCaptainsForJoinSaga(){
  let response = yield axios.get('/api/teams/searchforcaptains')
  yield put({
    type: 'SET_CAPTAINS_SEARCH',
    payload: response.data
  });
}

function* fetchTeamsForJoinSaga(){
  let response = yield axios.get('/api/teams/searchforteams')
  yield put({
    type: 'SET_TEAMS_SEARCH',
    payload: response.data
  });
}

function* joinTeamSaga(action){
  console.log('in joinTeamSaga this is action.payload', action.payload)
  const user_id = action.payload.user_id;
  const selected_team_id = {selected_team_id: action.payload.selected_team_id};
  yield axios.put(`/api/teams/join/${user_id}`, selected_team_id);
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
  yield takeLatest('JOIN_TEAM', joinTeamSaga);
};

export default teamSaga;