import React, { Component } from 'react';
import Lecture from './Lecture';


const LecturesList = props => (
  <div>
    <div className="cohort-holder">
      {props.lectures.map(lecture => (
        <Lecture selectedLecture={props.selectedLecture} lecture={lecture} handleLectureClick={props.handleLectureClick}/>
      ))}
    </div>
  </div>
)


export default LecturesList;
