// Reducer listens for SET_CONTEST and returns that payload expected to be all the contests from contests
// Table and that will be accessed via redux.

const contestReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_CONTEST':
      return action.payload;
    default:
      return state;
  }
}

export default contestReducer;