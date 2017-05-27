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
      <button onClick={this.deleteLecture} className="delete-class"><img alt="delete" src="https://cdn3.iconfinder.com/data/icons/line/36/cancel-256.png" width="25px" height="25px" /></button>
    </div>
  );
};

export default Lecture;
