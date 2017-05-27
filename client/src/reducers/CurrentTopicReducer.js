const CurrentTopic = (state = {}, action) => {
  switch (action.type) {
    case 'CURRENT_TOPIC' :
      return {
        topicId: action.lectureId,
        name: action.name,
        quizzes: action.quizzes,
      };
    default:
      return state;
  }
};

export default CurrentTopic;

