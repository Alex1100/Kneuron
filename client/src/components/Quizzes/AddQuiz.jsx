import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class AddQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const name = e.target.name;
    this.setState({ [name]: e.target.value });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const body = {
      topic_id: this.props.currentTopic.topicId,
      name: this.state.name,
    };
    try {
      const posted = await axios.post('/api/quizzes/', body);
      const added = await this.props.fetchTeacherInfo();
      this.props.history.push('/dashboard/class');
    } catch (error) {
      console.log('error with axios call line 28 AddQuiz ', error);
    }
  }

  render() {
    console.log(this.props);
    return (
      <div className="add-class-container">
        <form onSubmit={this.handleSubmit} className="add-class-form animated bounceInUp">
          <div className="add-class-input-container">
            <div className="add-class-inps">
              <label htmlFor="Name">Name</label>
              <input onChange={this.handleChange} value={this.state.name} type="text" name="name" />
            </div>
          </div>
          <input id="add-class-submit" type="submit" value="Add Quiz" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentTopic: state.currentTopic,
});

export default connect(mapStateToProps)(AddQuiz);
