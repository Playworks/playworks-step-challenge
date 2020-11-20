
import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// Function fetches all challenges ordered by date asc then puts data in reducer listening for SET_CHALLENGES
function* fetchChallengesSaga(){
  let response = yield axios.get(`/api/challenges`);
  console.log(response.data);

  yield put({
    type: 'SET_CHALLENGES',
    payload: response.data
  });
};

// Function sends challenge creation data to server via post runs FETCH_CHALLENGES to refetch
function* createChallengesSage(action) {
  // console.log('in createChallengesSaga this is action.payload', action.payload)
  yield axios({
      method: 'POST',
      url: '/api/challenges',
      data: action.payload
  });
  // console.log('in createChallengesSaga this is response', response);
  yield put({type: 'FETCH_CHALLENGES'});
}

// Function fetches daily challenge based on date sets data into reducer listening for SET_DAILY_CHALLENGE
function* fetchDailyChallengeSaga(action){
  // console.log('ACTION PAYLOAD', action.payload);
  let response = yield axios({
    method: 'POST',
    url: `/api/dailychallenge`,
    data: action.payload
  });
  // console.log('HERE IS THE RESPONSE', response.data);
  yield put({
    type: 'SET_DAILY_CHALLENGE',
    payload: response.data
  });
};

// Function sends data to update for challenge refetches with FETCH_CHALLENGES
function* updateChallengeSaga(action) {
  console.log('action payload', action.payload);
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
}

function* challengesSaga() {
  yield takeLatest('FETCH_CHALLENGES', fetchChallengesSaga);
  yield takeLatest('CREATE_CHALLENGES', createChallengesSage);
  yield takeLatest('FETCH_DAILY_CHALLENGE', fetchDailyChallengeSaga);
  yield takeLatest('UPDATE_CHALLENGE', updateChallengeSaga);
};

export default challengesSaga;