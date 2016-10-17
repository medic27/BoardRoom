import React from 'react';

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    const state = this.state;
    return (
      <div
        className="login-form"
        style={{ display: this.props.display }}
      >
        <input
          type="text"
          placeholder="username"
          onChange={this.handleUsernameChange}
        />
        <input
          type="password"
          placeholder="password"
          onChange={this.handlePasswordChange}
        />
        <button
          onClick={() => this.props.onSubmit(state.username, state.password)}
        >Log in!</button>
      </div>
    );
  }
}
