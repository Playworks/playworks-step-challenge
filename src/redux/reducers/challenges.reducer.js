// Reducer listens for SET_CHALLENGES and returns that payload expected to be all the challenges from challenges
// Table and that will be accessed via redux.

const challengesReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_CHALLENGES':
        return action.payload;
      default:
        return state;
    }
  }
  
  export default challengesReducer;