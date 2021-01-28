import React, { Component } from 'react';

import { connect } from "react-redux";

import { createUser } from "../../redux/actions/auth";

class SignUpPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.createUser = this.createUser.bind(this);
    }

  handleChange(event) {
      const { name, value } = event.target;
      this.setState({[name]: value });
  }

  createUser = () => {
    debugger
    this.props.createUser(
      this.state.email, this.state.username,
      this.state.password
    )
    this.props.history.push("/login");
  }

  render () {
    return (
      <>
        <h1>Blog detail</h1>
        <form onSubmit={this.createUser}>
        <p>
            <label>
            Email:
            </label>
            <input
            name="email"
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
            />
        </p>
        <p>
            <label>
            Username:
            </label>
            <input
            name="username"
            type="text"
            value={this.state.title}
            onChange={this.handleChange}
            />
        </p>
        <p>
            <label>
            Password:
            </label>
            <input
            name="password"
            type="password"
            value={this.state.title}
            onChange={this.handleChange}
            />
        </p>
        <input type="submit" value="Submit" />
        </form>
      </>
    )
  }
}

const mapDispatchToProps = {
  createUser,
};

export default connect(null, mapDispatchToProps)(SignUpPage);