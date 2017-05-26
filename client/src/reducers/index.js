import { combineReducers } from 'redux';
import CurrentProfile from './currentProfileReducer';
import lectures from './lectures';
import currentLecture from './currentLecture';
import currentTopic from './currentTopicReducer';
import AuthReducer from './authReducer';


const RootReducer = combineReducers({
  profile: CurrentProfile,
  auth: AuthReducer,
  lectures,
  currentLecture,
  currentTopic,
});

export default RootReducer;
