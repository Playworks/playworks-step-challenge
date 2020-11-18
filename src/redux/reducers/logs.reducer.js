// Reducer listens for SET_LEADER_BOARD and returns that payload expected to be all the top teams ordered by steps
// and that will be accessed via redux.

const userLogs = (state = [], action) => {
    switch (action.type) {
      case 'SET_LOGS':
        return action.payload;
      case 'RESET_LOGS':
        return state;
      default:
        return state;
    }
  }
  
  export default userLogs;