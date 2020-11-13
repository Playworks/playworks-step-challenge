const rulesReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_RULES':
        return action.payload;
      default:
        return state;
    }
  }
  
  export default rulesReducer;