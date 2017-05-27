import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
<<<<<<< HEAD:client/src/components/Dashboard/Dashboard.jsx
import { updateProfile } from '../../actions/CurrentProfile';
import DashNav from './DashboardNavBar';
import AddClass from '../../components/Cohorts/AddClass';
import AddLecture from '../../components/Lectures/AddLecture';
import EditClass from '../../components/Cohorts/EditClass';
import EditLecture from '../../components/Lectures/EditLecture';
import CohortsList from '../../components/Cohorts/CohortsList';
import CurrentLecture from '../../components/Lectures/CurrentLecture';
import LecturesList from '../../components/Lectures/LecturesList';
import QuizList from '../../components/Quizzes/QuizList';
import AddQuiz from '../../components/Quizzes/AddQuiz';
import AddQuestion from '../../components/Questions/AddQuestion';
import TopicsList from '../../components/Topics/TopicsList';
import { allLectures } from '../../actions/Lectures';
import { currentLecture } from '../../actions/CurrentLecture';
import EditTopic from '../../components/Topics/EditTopic';
import AddTopic from '../../components/Topics/AddTopic';



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
    this.renderAddLecture = this.renderAddLecture.bind(this);
    this.renderAddTopic = this.renderAddTopic.bind(this);
    this.renderAddQuiz = this.renderAddQuiz.bind(this);
    this.renderAddQuestion = this.renderAddQuestion.bind(this);
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


  renderQuiz() {
    const { quizzes } = this.props;
    return (<QuizList history={this.props.history} fetchTeacherInfo={this.fetchTeacherInfo} quizzes={quizzes || []} />);
  }
  renderAddQuiz() {
    return (<AddQuiz history={this.props.history} fetchTeacherInfo={this.fetchTeacherInfo} />);
  }
  renderAddQuestion() {
    const { quizId } = this.props;
    return (<AddQuestion history={this.props.history} fetchTeacherInfo={this.fetchTeacherInfo} quizId={quizId} />);
  }

  renderAddClass() {
    return (<AddClass history={this.props.history} fetchTeacherInfo={this.fetchTeacherInfo} />);
  }

  renderAddLecture() {
    const { currentCohortId } = this.props;
    return (<AddLecture history={this.props.history} cohortId={currentCohortId} fetchTeacherInfo={this.fetchTeacherInfo} />);
  }

  renderAddTopic(){
    const { history, lectureId, name } = this.props;
    console.log(lectureId + " for " + name);
    return (<AddTopic history={history} lectureId={lectureId} name={name} fetchTeacherInfo={this.fetchTeacherInfo} />);
  }

  renderLecturesList() {
    const { lectures, history, lectureId } = this.props;
    return (<LecturesList lectures={lectures || []} history={history} fetchTeacherInfo={this.fetchTeacherInfo} selectedLecture={lectureId} handleLectureClick={this.handleLectureClick} />);
  }

  renderCurrentLecture() {
    const { lectureId, name, topics, history, location } = this.props;
    return (<CurrentLecture location={location} lectureId={lectureId || ''} history={history} fetchTeacherInfo={this.fetchTeacherInfo} name={name || ''} topics={topics || []} />);
  }

  handleLectureClick(lectureId) {
    const { lectures } = this.props;
    this.setState({ selectedLecture: lectureId }, () => this.props.currentLecture(lectures.filter(lecture => lecture.id === this.state.selectedLecture)));
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
        <Route path="/dashboard/addLecture" render={this.renderAddLecture} />
        <Route path="/dashboard/editLecture" component={EditLecture} />
        <Route path="/dashboard/addTopic" render={this.renderAddTopic} />
        <Route path="/dashboard/editTopic" component={EditTopic} />
        <Route path="/dashboard/addQuestion" render={this.renderAddQuestion} />
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
  const { lectures, currentCohortId } = state.lectures;
  const { lectureId, name, topics } = state.currentLecture;
  const { topicId, quizzes } = state.currentTopic;
  const { quizId } = state.currentQuiz;
  return {
    email,
    username,
    userType,
    fName,
    lName,
    cohort,
    lectureId,
    lectures,
    currentCohortId,
    name,
    topics,
    topicId,
    quizzes,
    quizId,
  };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
