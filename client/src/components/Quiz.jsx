import React from 'react';

const Quiz = props => (
  <div className="cohort-entry animated bounceInUp">
    <div id="quiz-entry" className="text-center ch-entry-header">{props.quiz.name}</div>
    <button className="lecture-button">Questions</button>
  </div>
);


export default Quiz;
