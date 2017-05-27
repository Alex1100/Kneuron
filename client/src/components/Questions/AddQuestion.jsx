import React, { Component } from 'react';
import axios from 'axios';

class AddQuestion extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      0: '',
      1: '',
      2: '',
      3: '',
      correct: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleChange(e) {
    const name = e.target.name;
    this.setState({ [name]: e.target.value });
  }
  handleSelect(e) {
    this.setState({ correct: parseInt(e.target.value, 10) });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const body = {
      quiz_id: this.props.quizId,
      name: this.state.name,
      choices: [this.state[0], this.state[1], this.state[2], this.state[3]],
      correct: this.state.correct,
    };
    console.log('this is the type that choices is : , ', typeof body.choices);
    try {
      const posted = await axios.post('/api/questions/', body);
      const added = await this.props.fetchTeacherInfo();
      this.props.history.push('/dashboard/class');
    } catch (error) {
      console.log('error with axios call line 28 AddClass ', error);
    }
  }

  render() {
    console.log(this.props);
    return (
      <div className="add-class-container">
        <form onSubmit={this.handleSubmit} id="question-form" className="add-class-form animated bounceInUp">
          <div className="add-class-input-container">
            <div className="add-class-inps">
              <label htmlFor="question">Question</label>
              <input onChange={this.handleChange} value={this.state.question} type="text" name="name" />
            </div>
            <div className="add-class-inps">
              <label htmlFor="question">Choices</label>
              <input onChange={this.handleChange} value={this.state[0]} type="text" name="0" />
              <input onChange={this.handleChange} value={this.state[1]} type="text" name="1" />
              <input onChange={this.handleChange} value={this.state[2]} type="text" name="2" />
              <input onChange={this.handleChange} value={this.state[3]} type="text" name="3" />
            </div>
            <div className="add-class-inps">
              <label htmlFor="correct">Correct Answer</label>
              <select value={this.state.correct} onChange={this.handleSelect}>
                <option value="0">0</option>
                <option value="1">1</option>
                <option selected value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
          </div>
          <input id="add-class-submit" type="submit" value="Add Question" />
        </form>
      </div>
    );
  }
}

export default AddQuestion;
