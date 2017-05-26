import React from 'react';
import Lecture from './Lecture';
import { Link } from 'react-router-dom';


const LecturesList = props => (
  <div>
    <div className="class-nav">
      <button className="addL-left"><Link to="/dashboard/addLecture">Add Lecture</Link></button>
      <button className="addL-right"><Link to="/dashboard/editLecture">Edit Lecture</Link></button>
    </div>
    <div className="cohort-holder">
      {props.lectures.map(lecture => (
        <Lecture selectedLecture={props.selectedLecture} history={props.history} fetchTeacherInfo={props.fetchTeacherInfo} lecture={lecture} handleLectureClick={props.handleLectureClick}/>
      ))}
    </div>
  </div>
)


export default LecturesList;
