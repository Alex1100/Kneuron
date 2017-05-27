import React from 'react';
import QuestionsList from '../../components/Questions/QuestionsList';


const CurrentLectureTopicsListEntry = props => (
  <div>
    <p>{props.topic.name}</p>
    /* This are the Quizzes Underneath Everything Renders Now */
      {props.topic.quizzes.map(quiz => (
        <QuestionsList questions={quiz.questions}/>
      ))}
  </div>
);


export default CurrentLectureTopicsListEntry;


