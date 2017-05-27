import React from 'react';
import Topic from './Topic';


const TopicsList = props => (
  <div className="cohort-holder">
    {props.topics.map(topic => (
      <Topic topic={topic}/>
    ))}
  </div>
);


export default TopicsList;
