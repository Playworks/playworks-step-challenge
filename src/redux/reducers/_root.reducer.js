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




// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  contest, // will contain all contests with id
  challenges, // will contain all challenges with id
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  challenges, // will contain all challenges
  teams, // currently will contain teams and captains for join team.js
  photos,
  dailyChallenges,
  challengePhotos,
  leaderBoard,
  topSteppers,
  teamDetails,
  teamPhotos,
  userLogs,
  currentPerson,
  rules,
  faq,
  userLogs
});

export default rootReducer;
