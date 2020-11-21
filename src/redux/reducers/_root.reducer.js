import { combineReducers } from 'redux';
import adminContest from './adminContest.reducer';
import adminPhotos from './adminPhotos.reducer';
import challenges from './challenges.reducer';
import challengePhotos from './challengephotos.reducer';
import contest from './contest.reducer';
import currentPerson from './current.person.reducer';
import currentContest from './current.contest.reducer';
import dailyChallenges from './dailychallenge.reducer';
import errors from './errors.reducer';
import faq from './faq.reducer';
import leaderBoard from './leaderboard.reducer';
import photos from './photos.reducer';
import rules from './rules.reducer';
import teamDetails from './teamdetails.reducer';
import teams from './teams.reducer';
import teamsOnly from './teamsOnly.reducer';
import teamPhotos from './teamphotos.reducer';
import topSteppers from './topsteppers.reducer';
import user from './user.reducer';
import userLogs from './logs.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  adminContest,         // Listens for 'ADMIN_CONTEST'
  adminPhotos,          // Listens for 'ADMIN_PHOTOS'
  challenges,           // Listens for 'SET_CHALLENGES'
  challengePhotos,      // Listens for 'SET_CHALLENGE_PHOTOS'
  contest,              // Listens for 'SET_CONTEST'
  currentContest,       // Listens for 'SET_CURRENT_CONTEST'
  currentPerson,        // Listens for 'SET_CURRENT_PERSON'
  dailyChallenges,      // Listens for 'SET_DAILY_CHALLENGE'
  errors,               // contains registrationMessage and loginMessage
  faq,                  // Listens for 'SET_FAQ'
  leaderBoard,          // Listens for 'SET_LEADER_BOARD'
  photos,               // Listens for 'SET_PHOTOS'
  rules,                // Listens for 'SET_RULES'
  teamDetails,          // Listens for 'SET_TEAM_DETAILS'
  teams,                // Listens for 'SET_CAPTAINS_SEARCH' or 'SET_TEAMS_SEARCH'
  teamsOnly,            // Listens for 'SET_TEAMS_ONLY'
  teamPhotos,           // Listens for 'SET_CAPTAIN_TEAM_PHOTOS' or 'SET_USER_TEAM_PHOTOS'
  topSteppers,          // Listens for 'SET_TOP_STEPPERS'
  user,                 // will have an id and username if someone is logged in
  userLogs,             // Listens for 'SET_LOGS' or 'RESET_LOGS'
});

export default rootReducer;