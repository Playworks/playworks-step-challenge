const contestReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_CONTEST':
      return action.payload;
    default:
      return state;
  }
}

export default contestReducer;