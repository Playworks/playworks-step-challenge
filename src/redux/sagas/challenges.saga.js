import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// Function sends challenge creation data to server via post runs FETCH_CHALLENGES to refetch
function* createChallengesSage(action) {
  yield axios({
      method: 'POST',
      url: '/api/challenges',
      data: action.payload
  });
  yield put({type: 'FETCH_CHALLENGES'});
};

// Function fetches all challenges ordered by date asc then puts data in reducer listening for SET_CHALLENGES
function* fetchChallengesSaga(){
  let response = yield axios.get(`/api/challenges`);
  yield put({
    type: 'SET_CHALLENGES',
    payload: response.data
  });
};

// Function fetches daily challenge based on date sets data into reducer listening for SET_DAILY_CHALLENGE
function* fetchDailyChallengeSaga(action){
  let response = yield axios({
    method: 'POST',
    url: `/api/dailychallenge`,
    data: action.payload
  });
  yield put({
    type: 'SET_DAILY_CHALLENGE',
    payload: response.data
  });
};

// Function sends data to update for challenge refetches with FETCH_CHALLENGES
function* updateChallengeSaga(action) {
  let challengeId = action.payload.id;
  let challengeTitle = action.payload.title;
  let challengedDescription = action.payload.description;
  let challengeDate = action.payload.date;
  yield axios({
    method: 'PUT',
    url: '/api/challenges',
    data: {
      id: challengeId,
      name: challengeTitle,
      description: challengedDescription,
      date: challengeDate
    }
  });
  yield put({type: 'FETCH_CHALLENGES'});
};

function* challengesSaga() {
  yield takeLatest('CREATE_CHALLENGES', createChallengesSage);
  yield takeLatest('FETCH_CHALLENGES', fetchChallengesSaga);
  yield takeLatest('FETCH_DAILY_CHALLENGE', fetchDailyChallengeSaga);
  yield takeLatest('UPDATE_CHALLENGE', updateChallengeSaga);
};

export default challengesSaga;