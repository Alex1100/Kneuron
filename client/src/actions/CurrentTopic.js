exports.currentTopic = topic => ({
  type: 'CURRENT_TOPIC',
  lectureId: topic.id,
  name: topic.name,
  quizzes: topic.quizzes,
});

