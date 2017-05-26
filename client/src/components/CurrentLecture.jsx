// import React, { Component } from 'react';
// import CurrentLectureTopicsList from './CurrentLectureTopicsList';
// import axios from 'axios';

// class CurrentLecture extends Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       lecture: [],
//     };

//     this.deleteCurrentLecture = this.deleteCurrentLecture.bind(this);
//   }

//   async deleteCurrentLecture() {
//     try {
//       const removed = await axios.delete(`/api/lectures/${this.props.lectureId}`);
//       if (removed) {
//         this.props.fetchTeacherInfo()
//           .then(() => {
//             this.props.history.push('/dashboard/lectures');
//           })
//           .catch((err) => {
//             console.log('error with deleting class , ERR: ', err);
//           });
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }


//   render(){
//     return(
//       <div className="cohort-entry animated bounceInUp">
//         <div className="ch-entry-header">{this.props.name}</div>
//         <p>{this.props.name}</p>
//         <button onClick={this.deleteCurrentLecture} className="delete-class"><img alt="delete" src="https://cdn3.iconfinder.com/data/icons/line/36/cancel-256.png" width="25px" height="25px" /></button>
//         <CurrentLectureTopicsList topics={this.props.topics || []}/>
//       </div>
//     );
//   }
// };


// export default CurrentLecture;
