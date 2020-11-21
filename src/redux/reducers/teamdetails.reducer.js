const teamDetails = (state = [], action) => {
  switch (action.type) {
    case 'SET_TEAM_DETAILS':
      return action.payload;
    default:
      return state;
  }
}

export default teamDetails;