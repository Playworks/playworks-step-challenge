const teamsOnlyReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_TEAMS_ONLY':
      return action.payload;
    default:
      return state;
  }
}

export default teamsOnlyReducer;