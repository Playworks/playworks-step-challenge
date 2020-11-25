import { all } from 'redux-saga/effects';
import adminSaga from './admin.saga';
import challengesSaga from './challenges.saga';
import contestSaga from './contest.saga';
import deleteUserSaga from './deleteUser.saga';
import faqSaga from './faq.saga';
import loginSaga from './login.saga';
import logsSaga from './logs.saga';
import photosSaga from './photos.saga';
import registrationSaga from './registration.saga';
import rulesSaga from './rules.saga';
import stepsSaga from './steps.saga';
import teamLeaderBoardSaga from './leaderboard.saga';
import teamSaga from './team.saga';
import topSteppersSaga from './topsteppers.saga';
import userSaga from './user.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    adminSaga(),            // Listens for 'FETCH_CONTEST_DETAILS', 'FETCH_CONTEST_PHOTOS', 'ADMIN_DELETE_PHOTO'
    challengesSaga(),       // Listens for 'FETCH_CHALLENGES', 'CREATE_CHALLENGES', 'FETCH_DAILY_CHALLENGE', 'UPDATE_CHALLENGE'
    contestSaga(),          // Listens for 'FETCH_CONTEST', 'CREATE_CONTEST'
    deleteUserSaga(),       // Listens for 'DELETE_USER'
    faqSaga(),              // Listens for 'CREATE_FAQ', 'FETCH_FAQ'
    loginSaga(),            // login saga is now registered
    logsSaga(),             // Listens for 'FETCH_LOGS'
    photosSaga(),           // Listens for 'CREATE_PHOTOS', 'FETCH_PHOTOS', 'FETCH__ADMIN_PHOTOS', 'FETCH_CHALLENGE_PHOTOS', 'DELETE_PHOTOS', 'APPROVE_PHOTOS'
    registrationSaga(),
    rulesSaga(),            // Listens for 'CREATE_RULES', 'FETCH_RULES'
    stepsSaga(),            // Listens for 'CREATE_STEPS', 'SUBTRACT_STEPS'
    teamLeaderBoardSaga(),  // Listens for 'FETCH_LEADER_BOARD'
    teamSaga(),             // Listens for 'CREATE_TEAM', 'FETCH_TEAMS_FOR_JOIN', 'FETCH_CAPTAINS_FOR_JOIN', 'FETCH_TEAM_DETAILS', 'FETCH_CAPTAIN_TEAM_PHOTOS', 'FETCH_USER_TEAM_PHOTOS', 'JOIN_TEAM'
    topSteppersSaga(),      // Listens for 'FETCH_TOP_STEPPERS'
    userSaga(),
  ]);
}