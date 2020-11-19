// Reducer listens for SET_LEADER_BOARD and returns that payload expected to be all the top teams ordered by steps
// and that will be accessed via redux.

const teamPhotos = (state = [], action) => {
    switch (action.type) {
      case 'SET_CAPTAIN_TEAM_PHOTOS':
        console.log('TEAM PHOTOS PAYLOAD', action.payload);
        return action.payload;
      case 'SET_USER_TEAM_PHOTOS':
        return action.payload;
      default:
        return state;
    }
  }
  
  export default teamPhotos;