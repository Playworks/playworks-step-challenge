// Reducer listens for SET_LEADER_BOARD and returns that payload expected to be all the top teams ordered by steps
// and that will be accessed via redux.

const topSteppers = (state = [], action) => {
    switch (action.type) {
      case 'SET_TOP_STEPPERS':
        return action.payload;
      default:
        return state;
    }
  }
  
  export default topSteppers;