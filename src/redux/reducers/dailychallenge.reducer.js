const dailyChallengeReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_DAILY_CHALLENGE':
        return action.payload;
      default:
        return state;
    }
  }
  
  export default dailyChallengeReducer;