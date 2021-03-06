import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Input, ProgressBar, Row } from 'react-materialize';
import { signUp } from '../../actions/UserActions';

/**
 * SignUpForm - Renders the sign up form.
 */
class SignUpForm extends React.Component {
  /**
   * Creates and initializes an instance of SignUpForm.
   * @param {Object} props - The data passed to this component from its parent.
   */
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      password: ''
    };

    this.updateFirstName = this.updateFirstName.bind(this);
    this.updateLastName = this.updateLastName.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.attemptSignUp = this.attemptSignUp.bind(this);
  }

  /**
   * Updates the value of firstName in this Component's state.
   * @param {JqueryEvent} event - Info about the event that occurred on the
   * DOM element this is attached to.
   * @return {null} - Returns nothing.
   */
  updateFirstName(event) {
    event.preventDefault();
    this.setState({
      firstName: event.target.value
    });
  }

  /**
   * Updates the value of lastName in this Component's state.
   * @param {JqueryEvent} event - Info about the event that occurred on the
   * DOM element this is attached to.
   * @return {null} - Returns nothing.
   */
  updateLastName(event) {
    event.preventDefault();
    this.setState({
      lastName: event.target.value
    });
  }

  /**
   * Updates the value of username in this Component's state.
   * @param {JqueryEvent} event - Info about the event that occurred on the
   * DOM element this is attached to.
   * @return {null} - Returns nothing.
   */
  updateUsername(event) {
    event.preventDefault();
    this.setState({
      username: event.target.value
    });
  }

  /**
   * Updates the value of password in this Component's state.
   * @param {JqueryEvent} event - Info about the event that occurred on the
   * DOM element this is attached to.
   * @return {null} - Returns nothing.
   */
  updatePassword(event) {
    event.preventDefault();
    this.setState({
      password: event.target.value
    });
  }

  /**
   * Attempts to create a new account using the supplied credentials.
   * @param {JqueryEvent} event - Info about the event that occurred on the
   * DOM element this is attached to.
   * @return {null} - Returns nothing.
   */
  attemptSignUp(event) {
    // TODO: Validate form input here and, if appropriate, show an error.
    event.preventDefault();
    this.props.dispatch(signUp(
      this.state.firstName,
      this.state.lastName,
      this.state.username,
      this.state.password
    ));
  }

  /**
   * @return {Component|null} - Returns the React Component to be rendered or
   * null if nothing is to be rendered.
   */
  render() {
    const nameTooltip = 'Please enter a name that has two or more non-whitespace characters.';
    const userNameTooltip = 'Please enter your email address.';
    const passwordTootip = 'An acceptable password must be at least eight characters long and contain one uppercase letter, one lower case letter, a number and a symbol (e.g $, *, #, @ etc).';

    return (
      <div id="sign-up-form">
        <h6 className="red-text text-lighten-2">**All fields are required.</h6>
        <form>
          <div
            className={
              this.props.user.status === 'signUpFailed' ?
              'msg-container red lighten-2' :
              'hide msg-container red lighten-2'
            }
          >
            <p className="error-msg white-text center">
              {this.props.user.statusMessage}
            </p>
          </div>
          <Row>
            <Input
              id="update-first-name"
              s={6}
              label="First name"
              className="tooltipped"
              data-position="top"
              data-delay="50"
              data-tooltip={nameTooltip}
              onChange={this.updateFirstName}
            >
              <Icon>face</Icon>
            </Input>
            <Input
              id="update-last-name"
              s={6}
              label="Last name"
              className="tooltipped"
              data-position="top"
              data-delay="50"
              data-tooltip={nameTooltip}
              onChange={this.updateLastName}
            >
              <Icon>face</Icon>
            </Input>
            <Input
              id="update-username"
              s={12}
              label="Email"
              type="email"
              validate
              className="tooltipped"
              data-position="top"
              data-delay="50"
              data-tooltip={userNameTooltip}
              onChange={this.updateUsername}
            >
              <Icon>account_circle</Icon>
            </Input>
            <Input
              id="update-password"
              s={12}
              label="Password"
              type="password"
              className="tooltipped"
              data-position="top"
              data-delay="50"
              data-tooltip={passwordTootip}
              onChange={this.updatePassword}
            >
              <Icon>lock</Icon>
            </Input>
            <Button
              id="sign-up-btn"
              className={this.props.user.isLoggingIn ? 'disabled' : ''}
              waves="light"
              onClick={this.attemptSignUp}
            >
              Sign up
              <Icon left>send</Icon>
            </Button>
          </Row>
        </form>
        <div
          className={
            this.props.user.isLoggingIn ?
            'progress-bar-container col s12' :
            'hide progress-bar-container col s12'
          }
        >
          <ProgressBar />
        </div>
      </div>
    );
  }
}

SignUpForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired
};

export default SignUpForm;
