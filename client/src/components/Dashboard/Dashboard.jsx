import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateProfile } from '../../actions/CurrentProfile';
import DashNav from './DashboardNavBar';
import Home from './Home';
import AddClass from '../../components/Cohorts/AddClass';
import AddLecture from '../../components/Lectures/AddLecture';
import EditClass from '../../components/Cohorts/EditClass';
import EditLecture from '../../components/Lectures/EditLecture';
import CohortsList from '../../components/Cohorts/CohortsList';
import CurrentLecture from '../../components/Lectures/CurrentLecture';
import LecturesList from '../../components/Lectures/LecturesList';
import QuizList from '../../components/Quizzes/QuizList';
import AddQuiz from '../../components/Quizzes/AddQuiz';
import LiveLecture from '../../components/Lectures/LiveLecture';
import { allLectures } from '../../actions/Lectures';
import { currentLecture } from '../../actions/CurrentLecture';
import { reduxDataSearch } from '../../actions/Search';
import EditTopic from '../../components/Topics/EditTopic';
import AddTopic from '../../components/Topics/AddTopic';
import AddQuestion from '../Questions/AddQuestion';
import SearchedDataItemsList from '../../components/SearchedContent/SearchedDataItemsList';
// import VideoChat from '../../components/VideoChat/VideoChat';
import getUserMedia from 'getusermedia';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      selectedLecture: this.props.currentLecture.lectureId || '',
      lat: 0,
      lng: 0,
      alt: 0,
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
    this.renderSearchedDataItemsList = this.renderSearchedDataItemsList.bind(this);
    this.renderLiveLecture = this.renderLiveLecture.bind(this);
    this.getUserCoordinates = this.getUserCoordinates.bind(this);
    this.getSeaLevelAmount = this.getSeaLevelAmount.bind(this);
  }

  componentDidMount() {
    this.fetchTeacherInfo();
    this.setState({ selectedLecture: this.props.currentLecture.lectureId });
    this.getUserCoordinates();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ profile: nextProps });
  }

  getUserCoordinates(){
    if('geolocation' in navigator){
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({ lat: position.coords.latitude, lng: position.coords.longitude });
      });
    }
  }

  async getSeaLevelAmount(){
    try{
      const body = {
        lat: this.state.lat.toString(),
        lng: this.state.lng.toString(),
      };
      const altitude = await axios.post('/api/teachers/elevation', body);
      console.log("GOOGLE RESPONSE IS: ", altitude);
      this.setState({ alt: altitude.data });
    } catch(error) {
      console.log("FUCK, IT DIDN'T GET BACK THE DATA!!!");
    }
  }

  async fetchTeacherInfo() {
    try {
      const profile = await axios.get(`/api/teachers/${localStorage.getItem('id_token')}`);
      console.log('fetch teacher info ran');
      this.setState({ profile: profile.data }, () => {
        this.props.updateProfile(profile);
      });
    } catch (error) {
      console.log('error with your fetch teacher shit ,', error);
    }
  }

  handleLectureClick(lectureId) {
    const { lectures } = this.props;
    this.setState({ selectedLecture: lectureId }, () => this.props.currentLecture(lectures.filter(lecture => lecture.id === this.state.selectedLecture)));
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

  renderAddTopic() {
    const { history, lectureId, name } = this.props;
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

  renderSearchedDataItemsList() {
    const { searchedResults, history, lectureId } = this.props;
    return (<SearchedDataItemsList history={history} lectureId={lectureId || ''} handleLectureClick={this.handleLectureClick} searchedContentResults={searchedResults || []} allLectures={this.props.allLectures.bind(this)} fetchTeacherInfo={this.fetchTeacherInfo} />);
  }

  handleLectureClick(lectureId) {
    const { lectures } = this.props;
    this.setState({ selectedLecture: lectureId }, () => this.props.currentLecture(lectures.filter(lecture => lecture.id === this.state.selectedLecture)));
  }

  renderQuiz() {
    const { quizzes } = this.props;
    return (<QuizList history={this.props.history} fetchTeacherInfo={this.fetchTeacherInfo} quizzes={quizzes || []} />);
  }

  renderLiveLecture() {
    const { liveLectureTopics, history } = this.props;
    return (<LiveLecture history={history} topics={liveLectureTopics || []} />);
  }

  // renderVideoChat(){
  //   return (<VideoChat />)
  // }

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
    const { dispatch, history, cohort } = this.props;
    const currentLectureRoute = `/dashboard/lectures${this.props.lectureId}`;
    console.log(this.props);
    return (
      <div className="dashboard-content" onMouseEnter={this.getSeaLevelAmount}>
        <DashNav dispatch={dispatch} history={history} cohort={cohort || []} fetchTeacherInfo={this.fetchTeacherInfo} reduxDataSearch={this.props.reduxDataSearch} />
        <Route path="/dashboard/home" component={Home} />
        <Route path="/dashboard/class" render={this.renderCohort} />
        <Route path="/dashboard/lectures" render={this.renderLecturesList} />
        <Route path="/dashboard/livelecture" render={this.renderLiveLecture} />
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
        <Route path="/dashboard/search" render={this.renderSearchedDataItemsList} />
        // <Route path="/dashboard/videoChat" render={this.renderVideoChat} />
      </div>
    );
  }
}


const mapDispatchToProps = dispatch => bindActionCreators({
  updateProfile,
  allLectures,
  currentLecture,
  reduxDataSearch,
}, dispatch);

const mapStateToProps = (state) => {
  const { email, username, userType, fName, lName, cohort, image, id } = state.profile;
  const { lectures, currentCohortId } = state.lectures;
  const { lectureId, name, topics } = state.currentLecture;
  const { liveLectureId, liveLectureName, liveLectureTopics } = state.currentLiveLecture;
  const { topicId, quizzes } = state.currentTopic;
  const { searchedResults } = state.searchedResults;
  const { quizId } = state.currentQuiz;
  return {
    id,
    email,
    username,
    userType,
    fName,
    lName,
    cohort,
    lectureId,
    lectures,
    liveLectureId,
    liveLectureName,
    liveLectureTopics,
    currentCohortId,
    name,
    topics,
    topicId,
    quizzes,
    quizId,
    searchedResults,
    image,
  };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
