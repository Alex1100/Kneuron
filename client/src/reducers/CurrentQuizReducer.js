const CurrentQuizReducer = (state = {}, action) => {
  switch (action.type) {
    case 'CURRENT_QUIZ' :
      return {
        type: action.type,
        quizId: action.quizId,
      };
    default:
      return state;
  }
};

export default CurrentQuizReducer;
