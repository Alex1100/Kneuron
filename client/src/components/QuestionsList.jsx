import React from 'react';
import QuestionEntry from './QuestionEntry';

const QuestionsList = props => (
  <div>
    {props.questions.map(question => (
      <QuestionEntry name={question.name} choices={question.choices} />
    ))}
  </div>
);


export default QuestionsList;
