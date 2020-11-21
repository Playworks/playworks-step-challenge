const teamsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_CAPTAINS_SEARCH':
      return action.payload;
    case 'SET_TEAMS_SEARCH':
      let teamsAndCaptains = [...state];
      for(let team of action.payload){
        teamsAndCaptains.push(team)
      }
      return teamsAndCaptains;
    default:
      return state;
  }
}

export default teamsReducer;