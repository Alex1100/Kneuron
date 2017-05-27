const CurrentLecture = (state = {}, action) => {
  switch (action.type) {
    case 'CURRENT_LECTURE' :
      return {
        lectureId: action.lectureId,
        name: action.name,
        topics: action.topics,
      }

    default:
      return state;
  }
};

export default CurrentLecture;
