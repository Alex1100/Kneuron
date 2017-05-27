exports.allLectures = (cohort) => {
  return {
    type: 'ALL_LECTURES',
    lectures: cohort.lectures,
    currentCohortId: cohort.id,
  };
}


// exports.createLecture = (lecture) => {
//   return {
//     type: 'CREATE_LECTURE',
//     lecture: lecture,
//   };
// }

// exports.deleteLecture = (lecture) => {
//   return {
//     type: 'DELETE_LECTURE',
//     lecture: [],
//   }
// }
