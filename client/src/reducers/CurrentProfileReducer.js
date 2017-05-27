const currentProfile = (state = {}, action) => {
  switch (action.type) {
    case 'CURRENT_PROFILE' :
      return {
        email: action.email,
        username: action.username,
        fName: action.fName,
        lName: action.lName,
        userType: action.userType,
        cohort: action.cohort,
      }

    default:
      return state;
  }
};

export default currentProfile;
