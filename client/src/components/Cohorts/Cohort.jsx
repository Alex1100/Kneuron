import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../styles/Main.css';
import { allLectures, currentLecture } from '../../actions/Lectures';

class Cohort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: '',
      lectures: [],
    };
    this.deleteClass = this.deleteClass.bind(this);
    this.fetchLectures = this.fetchLectures.bind(this);
  }

  async deleteClass() {
    try {
      const removed = await axios.delete(`/api/cohorts/${localStorage.getItem('id_token')}/${this.props.cohort.id}`);
      if (removed) {
        this.props.fetchTeacherInfo()
          .then(() => {
            this.props.history.push('/dashboard/class');
          })
          .catch((err) => {
            console.log('error with deleting class , ERR: ', err);
          });
      }
    } catch (error) {
      console.log(error);
    }
  }

  fetchLectures(){
      console.log("HERE ARE THE LECTURES OF A COHORT: ", this.props.cohort.lectures)
      console.log('this is all lectures inside lecture action', this.props.allLectures(this.props.cohort))
      this.setState({ lectures: []}, () => {
        this.props.allLectures(this.props.cohort);
      });
      console.log("IT WENT THROUGH AND STATE FOR LECTURES INSIDE COHORT COMP IS: ", this.state.lectures);
  }

  render() {
    console.log(this.props);
    const currentLectureRoute = `/dashboard/lectures${this.props.currentLecture}`;
    console.log(currentLectureRoute, 'this is the current lecture route ');
    return (
      <div className="cohort-entry animated bounceInUp" >
        <div className="ch-entry-header">{this.props.cohort.subject}</div>
        <h3>{this.props.cohort.time}</h3>
        <button className="lecture-button" onClick={this.fetchLectures}><Link to="/dashboard/lectures">Lectures</Link></button>
        <button onClick={this.deleteClass} className="delete-class"><img alt="delete" src="https://cdn3.iconfinder.com/data/icons/line/36/cancel-256.png" width="25px" height="25px" /></button>
      </div>
    );
  }
}

export default connect(null, { allLectures })(Cohort);
