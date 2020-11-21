import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// Function sends team creation data via post request. 
function* createTeamSaga(action){
  yield axios.post(`/api/teams`, action.payload);
};

// Function sends get request to get data for join team component, puts data into reducer listening for 'SET_CAPTAINS_SEARCH'
function* fetchCaptainsForJoinSaga(){
  let response = yield axios.get('/api/teams/searchforcaptains')
  yield put({
    type: 'SET_CAPTAINS_SEARCH',
    payload: response.data
  });
};

// functions gets all photos for captain level which have both status' of true/false for approved column
function* fetchTeamCaptainPhotosSaga(action){
  let response = yield axios({
    method: 'GET',
    url: `/api/teamDetails/captain/photos/${action.payload}`,
  });
  yield put({
    type: 'SET_CAPTAIN_TEAM_PHOTOS',
    payload: response.data
  });
};

// function sends get request to get users in order of steps taken via team id
function* fetchTeamDetailsSaga(action){
  let response = yield axios({
    method: 'GET',
    url: `/api/teamDetails/${action.payload}`,
    params: {
      id: action.payload
    }
  });
  yield put({
    type: 'SET_TEAM_DETAILS',
    payload: response.data
  });
};

// Function gets all teams by contest id and puts that data into two different reducers. 
function* fetchTeamsForJoinSaga(){
  let response = yield axios.get('/api/teams/searchforteams')
  yield put({
    type: 'SET_TEAMS_SEARCH',
    payload: response.data
  });
  yield put({
    type: 'SET_TEAMS_ONLY',
    payload: response.data
  });
};

// function gets all the photos for user level which is only approved photos.
function* fetchUserTeamPhotosSaga(action){
  let response = yield axios({
    method: 'GET',
    url: `/api/teamDetails/user/photos/${action.payload}`,
  });
  yield put({
    type:'SET_USER_TEAM_PHOTOS',
    payload: response.data
  });
};

// Function sends put request to update users team id.
function* joinTeamSaga(action){
  const user_id = action.payload.user_id;
  const selected_team_id = {selected_team_id: action.payload.selected_team_id};
  yield axios.put(`/api/teams/join/${user_id}`, selected_team_id);
};

function* teamSaga() {
  yield takeLatest('CREATE_TEAM', createTeamSaga);
  yield takeLatest('FETCH_CAPTAINS_FOR_JOIN', fetchCaptainsForJoinSaga);
  yield takeLatest('FETCH_CAPTAIN_TEAM_PHOTOS', fetchTeamCaptainPhotosSaga);
  yield takeLatest('FETCH_TEAM_DETAILS', fetchTeamDetailsSaga);
  yield takeLatest('FETCH_TEAMS_FOR_JOIN', fetchTeamsForJoinSaga);
  yield takeLatest('FETCH_USER_TEAM_PHOTOS', fetchUserTeamPhotosSaga)
  yield takeLatest('JOIN_TEAM', joinTeamSaga);
};

export default teamSaga;