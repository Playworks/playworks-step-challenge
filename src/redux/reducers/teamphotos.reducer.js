const teamPhotos = (state = [], action) => {
  switch (action.type) {
    case 'SET_CAPTAIN_TEAM_PHOTOS':
      return action.payload;
    case 'SET_USER_TEAM_PHOTOS':
      return action.payload;
    default:
      return state;
  }
}

export default teamPhotos;