import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
        fName: 'jason',
        lName: 'kim',
        username: 'jasonk',
    };
    console.log('what is this?', this);
    this.userNameChange = this.userNameChange.bind(this);
    this.fNameChange = this.fNameChange.bind(this);
    this.lNameChange = this.lNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  // componentDidMount() {
  // }

  userNameChange(e) {
    this.setState({
      username: e.target.value,
    });
  }


  fNameChange(e) {
    this.setState({
      fName: e.target.value,
    });
  }

  lNameChange(e) {
    this.setState({
      lName: e.target.value,
    });
  }


        // email: req.body.email,
        // password: hasher(req.body.password),
        // fName: req.body.fName,
        // lName: req.body.lName,
        // username: req.body.username,

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.fName)
    console.log(this.state.lName)
    console.log(this.state.username)
    const body = {
      fName: this.state.fName,
      lName: this.state.lName,
      username: this.state.username,
    };
    axios.put(`/api/teachers/${localStorage.getItem('id_token')}`, body)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log('Err: ', err);
      })
  }

  render() {
    console.log('this is props from redux profile!', this.props);
    return (
      <div>
        <h1> Edit Your Profile Here: </h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>UserName</label>
            <input placeholder="UserName" onChange={(e) => { this.userNameChange(e); }} />
          </div>
          <div>
            <label>First Name</label>
            <input placeholder="first Name" onChange={(e) => { this.fNameChange(e); }} />
          </div>
          <div>
            <label>Last Name</label>
            <input placeholder="Last Name" onChange={(e) => { this.lNameChange(e); }} />
          </div>
          <h1><button type='submit'>Submit</button></h1>
        </form>
      </div>
    );
  }
}


// const mapStateToProps = state => {
//   console.log('state in editProfile', state)
//   return {
//     profile: state.profile
//   }
// }

// const mapStateToProps = state => ({
//   profile: state.profile,
// });
// export default withRouter(connect(mapStateToProps)(EditProfile));
export default EditProfile;
