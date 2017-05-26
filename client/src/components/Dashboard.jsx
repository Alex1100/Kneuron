import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { updateProfile } from '../actions/currentProfile';
import DashNav from '../components/DashboardNavBar';
import AddClass from '../components/AddClass';
import EditClass from '../components/EditClass';
import CohortsList from '../components/CohortsList';
import CurrentLecture from '../components/CurrentLecture';
import LecturesList from '../components/LecturesList';
import QuizList from '../components/QuizList';
import AddQuiz from '../components/AddQuiz';

import { allLectures } from '../actions/lectures';
import { currentLecture } from '../actions/currentLecture';


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      selectedLecture: this.props.currentLecture.lectureId || '',
    };

    this.fetchTeacherInfo = this.fetchTeacherInfo.bind(this);
    this.renderCohort = this.renderCohort.bind(this);
    this.renderLecturesList = this.renderLecturesList.bind(this);
    this.renderCurrentLecture = this.renderCurrentLecture.bind(this);
    this.handleLectureClick = this.handleLectureClick.bind(this);
    this.renderAddClass = this.renderAddClass.bind(this);
    this.renderQuiz = this.renderQuiz.bind(this);
    this.renderAddQuiz = this.renderAddQuiz.bind(this);
  }

  componentDidMount() {
    this.fetchTeacherInfo();
    this.setState({ selectedLecture: this.props.currentLecture.lectureId });
  }
  componentWillReceiveProps(nextProps) {
    console.log('component received new props, here are old props , ', this.props);
    console.log('actual new props , ', nextProps);
    this.setState({ profile: nextProps });
  }

  async fetchTeacherInfo() {
    try {
      const profile = await axios.get(`/api/teachers/${localStorage.getItem('id_token')}`);
      console.log(`/api/teachers/${localStorage.getItem('id_token')}`);
      this.setState({ profile: profile.data }, () => {
        this.props.updateProfile(profile);
      });
    } catch (error) {
      console.log('error with your fetch teacher shit ,', error);
    }
  }

  renderCohort() {
    const { cohort, history } = this.props;
    return (<CohortsList
      fetchTeacherInfo={this.fetchTeacherInfo}
      history={history}
      cohorts={cohort || []}
      allLectures={this.props.allLectures.bind(this)}
      currentLecture={this.props.currentLecture.lectureId}
    />);
  }

  renderQuiz() {
    const { quizzes } = this.props;
    return (<QuizList history={this.props.history} fetchTeacherInfo={this.fetchTeacherInfo} quizzes={quizzes || []} />);
  }
  renderAddQuiz() {
    console.log(' line 76 dassshy');
    return (<AddQuiz history={this.props.history}  fetchTeacherInfo={this.fetchTeacherInfo} />);
  }

   renderAddClass() {
    return (<AddClass history={this.props.history} fetchTeacherInfo={this.fetchTeacherInfo} />);
  }

  renderLecturesList() {
    const { lectures } = this.props;
    return <LecturesList lectures={lectures || []} selectedLecture={this.state.selectedLecture} handleLectureClick={this.handleLectureClick} />;
  }

  renderCurrentLecture() {
    const { lectureId, name, topics } = this.props;
    return <CurrentLecture lectureId={lectureId || ''} name={name || ''} topics={topics || []} />;
  }

  handleLectureClick(lectureId) {
    const { lectures } = this.props;
    this.setState({ selectedLecture: lectureId }, () => this.props.currentLecture(lectures.filter(lecture => lecture.id === this.state.selectedLecture)));
  }


  render() {
    const { dispatch } = this.props;
    console.log(this.state);
    console.log('these are the props ', this.props);
    const currentLectureRoute = `/dashboard/lectures${this.props.lectureId}`;
    return (
      <div className="dashboard-content">
        <DashNav dispatch={dispatch} />
        <Route path="/dashboard/class" render={this.renderCohort} />
        <Route path="/dashboard/lectures" render={this.renderLecturesList} />
        <Route path="/dashboard/addClass" render={this.renderAddClass} />
        <Route path="/dashboard/editClass" component={EditClass} />
        <Route path="/dashboard/addQuiz" render={this.renderAddQuiz} />
        <Route path="/dashboard/quiz" render={this.renderQuiz} />
        <Route path={currentLectureRoute} render={this.renderCurrentLecture} />
      </div>
    );
  }
}


const mapDispatchToProps = dispatch => bindActionCreators({
  updateProfile,
  allLectures,
  currentLecture,
}, dispatch);

const mapStateToProps = (state) => {
  const { email, username, userType, fName, lName, cohort } = state.profile;
  const { lectures } = state.lectures;
  const { lectureId, name, topics } = state.currentLecture;
  const { topicId, quizzes } = state.currentTopic;
  return {
    email,
    username,
    userType,
    fName,
    lName,
    cohort,
    lectureId,
    lectures,
    name,
    topics,
    topicId,
    quizzes,
  };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
