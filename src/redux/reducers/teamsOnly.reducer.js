// Reducer listens for SET_TEAMS_ONLY this logic returns an array of all captains and teams in the respective contest

const teamsOnlyReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_TEAMS_ONLY':
      return action.payload;
    default:
      return state;
  }
}

export default teamsOnlyReducer;