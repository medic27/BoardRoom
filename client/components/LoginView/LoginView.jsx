import React from 'react';
import Axios from 'axios';
import jwtDecode from 'jwt-decode';

import store from '../../store';
import actions from '../../actions';

import LoginButton from './LoginButton.jsx';
import SignupButton from './SignupButton.jsx';
import LoginForm from './LoginForm.jsx';
import SignupForm from './SignupForm.jsx';

export default class LoginView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signupFormVisible: false,
      loginFormVisible: false,
    };
  }

  componentWillMount() {
    const token = localStorage.getItem('token');
    if (token) {
      const { username, firstName, lastName } = jwtDecode(token);
      store.dispatch(actions.login(username, firstName, lastName));
      this.toLandingView();
    }
  }

  toLandingView() {
    this.props.history.push('/dashboard');
  }

  handleLoginFormSubmit(username, password) {
    Axios.post('/login', {
      username,
      password,
    }).then((response) => {
      const token = response.data.token;
      const { firstName, lastName } = response.data.user;
      if (token) {
        localStorage.setItem('token', token);
        store.dispatch(actions.login(username, firstName, lastName));
        this.toLandingView();
      } else {
        // tell the user their name or pass was wrong
      }
    }).catch((error) => {
      if (error) throw error;
    });
  }

  handleSignupFormSubmit(username, password, firstName, lastName) {
    Axios.post('/signup', {
      username,
      password,
      firstName,
      lastName,
    }).then((response) => {
      const token = response.data.token;
      if (token) {
        localStorage.setItem('token', token);
        store.dispatch(actions.login(username, firstName, lastName));
        this.toLandingView();
      } else {
        // tell the user something
      }
    }).catch((error) => {
      throw error;
    });
  }

  showForm(formName) {
    const loginFormVisibility = formName === 'login';
    this.setState({
      loginFormVisible: loginFormVisibility,
      signupFormVisible: !loginFormVisibility,
    });
  }

  render() {
    return (
      <main className="login-view">
        <div id="banner">
          <h1 id="title">BoardRoom</h1>
          <h2>We are a platform for interactive
          whiteboarding and video chat. It is as easy as
          making an account and making a room. Give it a try!</h2>
        </div>
        <div id="user-interface">
          <div id="ui-buttons">
            <SignupButton
              onClick={this.showForm.bind(this, 'signup')}
            />
            <LoginButton
              onClick={this.showForm.bind(this, 'login')}
            />
          </div>
          <div id="ui-forms">
            <SignupForm
              onSubmit={this.handleSignupFormSubmit.bind(this)}
              display={this.state.signupFormVisible ? 'block' : 'none'}
            />
            <LoginForm
              onSubmit={this.handleLoginFormSubmit.bind(this)}
              display={this.state.loginFormVisible ? 'block' : 'none'}
            />
          </div>
        </div>
      </main>
    );
  }
}
