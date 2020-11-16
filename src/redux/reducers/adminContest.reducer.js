const adminContest = (state = [], action) => {
    switch (action.type) {
      case 'ADMIN_CONTEST':
        return action.payload;
      default:
        return state;
    }
  }
  
  export default adminContest;