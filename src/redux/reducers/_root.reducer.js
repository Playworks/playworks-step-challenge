import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import contest from './contest.reducer';
import challenges from './challenges.reducer';
import photos from './photos.reducer';
import dailyChallenges from './dailychallenge.reducer';
import challengePhotos from './challengephotos.reducer';
import leaderBoard from './leaderboard.reducer';
import topSteppers from './topsteppers.reducer';
import teamDetails from './teamdetails.reducer';
import teamPhotos from './teamphotos.reducer';
import teams from './teams.reducer';
import rules from './rules.reducer';
import faq from './faq.reducer';
import userLogs from './logs.reducer';
import currentPerson from './current.person.reducer';
import teamsOnly from './teamsOnly.reducer';
import adminContest from './adminContest.reducer';
import adminPhotos from './adminPhotos.reducer';




// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  contest, // Listens for 'SET_CONTEST'
  challenges, // Listens for 'SET_CHALLENGES'
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  teams, // Listens for 'SET_CAPTAINS_SEARCH' and/or 'SET_TEAMS_SEARCH'
  teamsOnly, // Listens for 'SET_TEAMS_ONLY'
  photos, // Listens for 'SET_PHOTOS'
  dailyChallenges, // Listens for 'SET_DAILY_CHALLENGE'
  challengePhotos, // Listens for 'SET_CHALLENGE_PHOTOS'
  leaderBoard, // Listens for 'SET_LEADER_BOARD'
  topSteppers,
  teamDetails,
  teamPhotos,
  userLogs,
  currentPerson,
  rules,
  faq,
  adminContest,
  adminPhotos
});

export default rootReducer;
