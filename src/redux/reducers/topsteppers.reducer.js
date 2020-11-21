const topSteppers = (state = [], action) => {
  switch (action.type) {
    case 'SET_TOP_STEPPERS':
      return action.payload;
    default:
      return state;
  }
}

export default topSteppers;