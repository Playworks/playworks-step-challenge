import { all } from 'redux-saga/effects';
import challengesSaga from './challenges.saga';
import contestSaga from './contest.saga';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import teamSaga from './team.saga';
import userSaga from './user.saga';
import photosSaga from './photos.saga';
import teamLeaderBoardSaga from './leaderboard.saga';
import topSteppersSaga from './topsteppers.saga';
import stepsSaga from './steps.saga';




// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    teamSaga(), // Listens for 'CREATE_TEAM'
    contestSaga(), // Listens for 'FETCH_CONTEST'
    challengesSaga(), // Listens for 'FETCH_CHALLENGES'
    photosSaga(),
    teamLeaderBoardSaga(),
    topSteppersSaga(),
    stepsSaga()
  ]);
}
