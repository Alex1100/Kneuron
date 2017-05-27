import React from 'react';
import { Link } from 'react-router-dom';


const Lecture = (props) => {
  const currentLectureRoute = `/dashboard/lectures${props.selectedLecture}`;
  return (
    <div
      className="cohort-entry animated bounceInUp"
      onMouseEnter={() => props.handleLectureClick(props.lecture.id)}
    >
      <div
        id="lecture-entry"
        className="ch-entry-header">{props.lecture.name}</div>
      <button className="lecture-button">
        <Link
          to={currentLectureRoute}
          selectedLecture={props.selectedLecture || props.lecture.id}
        >
          See Topics
        </Link>
      </button>
    </div>
  );
};

export default Lecture;
