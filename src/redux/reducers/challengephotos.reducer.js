const challengePhotosReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_CHALLENGE_PHOTOS':
      return action.payload;
    default:
      return state;
  }
}

export default challengePhotosReducer;