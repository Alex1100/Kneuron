import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { currentTopic } from '../../actions/CurrentTopic';

// props.topic.quizzes

class Topic extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    console.log(this.props, ' this is from topics');
    return (
      <div className="cohort-entry animated bounceInUp">
        <div id="topic-entry" className="ch-entry-header">{this.props.topic.name}</div>
        <button className="lecture-button"><Link onClick={() => this.props.currentTopic(this.props.topic)} to="/dashboard/quiz">Quizzes</Link>
        </button>
      </div>
    );
  }
}


export default connect(null, { currentTopic })(Topic);
