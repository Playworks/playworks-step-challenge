const currentPerson = (state = [], action) => {
    switch (action.type) {
      case 'SET_CURRENT_PERSON':
        return action.payload;
      default:
        return state;
    }
  }
  
  export default currentPerson;