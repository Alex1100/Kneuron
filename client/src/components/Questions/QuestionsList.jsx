import React from 'react';
import QuestionEntry from './QuestionEntry';

const QuestionsList = props => (
  <div className="quest-holder">
    {props.questions.map(question => (
      <QuestionEntry name={question.name} choices={question.choices} />
  ))}
  </div>
);


export default QuestionsList;
