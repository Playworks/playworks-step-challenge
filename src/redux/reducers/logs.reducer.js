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