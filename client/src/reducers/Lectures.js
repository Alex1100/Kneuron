const Lectures = (state = {}, action) => {
  switch (action.type) {
    case 'ALL_LECTURES' :
      return {
        lectures: action.lectures,
        currentCohortId: action.currentCohortId,
      }

    default:
      return state;
  }
};

export default Lectures;
