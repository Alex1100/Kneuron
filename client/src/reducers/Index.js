import { combineReducers } from 'redux';
import CurrentProfile from './CurrentProfileReducer';
import lectures from './Lectures';
import currentLecture from './CurrentLecture';
import currentTopic from './CurrentTopicReducer';
import currentQuiz from './CurrentQuizReducer';
import AuthReducer from './AuthReducer';


const RootReducer = combineReducers({
  profile: CurrentProfile,
  auth: AuthReducer,
  lectures,
  currentLecture,
  currentTopic,
  currentQuiz,
});

export default RootReducer;
