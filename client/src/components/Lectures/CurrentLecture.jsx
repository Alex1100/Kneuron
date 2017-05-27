import React, { Component } from 'react';
import TopicsList from '../Topics/TopicsList';

class CurrentLecture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lecture: [],
    };
  }


  render() {
    console.log(this.props);
    return (
      <div>
        <TopicsList topics={this.props.topics || []} />
      </div>
    );
  }
}


export default CurrentLecture;
