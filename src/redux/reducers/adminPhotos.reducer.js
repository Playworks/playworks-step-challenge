const adminPhotos = (state = [], action) => {
  switch (action.type) {
    case 'ADMIN_PHOTOS':
      return action.payload;
    default:
      return state;
  }
}

export default adminPhotos;