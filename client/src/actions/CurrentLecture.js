exports.currentLecture = (lecture) => {
  return {
    type: 'CURRENT_LECTURE',
    lectureId: lecture[0].id,
    name: lecture[0].name,
    topics: lecture[0].topics,
  };
}
