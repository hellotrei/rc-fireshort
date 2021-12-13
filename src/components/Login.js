import React, { Component } from "react";
import "./login.css";
import { connect } from "react-redux";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/styles";
import { Link, Redirect } from "react-router-dom";
import { loginUser, signupUser, sendPasswordResetLink } from "../actions";

const styles = () => ({
  errorText: { color: "#f50057", marginBottom: 5, textAlign: "center" },
});
const theme = createMuiTheme({ palette: { secondary: { main: "#fff" } } });
class Login extends Component {
  state = { email: "", password: "", password2: "", displayName: "" };

  handleNameChange = ({ target }) => {
    this.setState({ displayName: target.value });
  };

  handleEmailChange = ({ target }) => {
    this.setState({ email: target.value });
  };

  handlePasswordChange = ({ target }) => {
    this.setState({ password: target.value });
  };

  handlePasswordChange2 = ({ target }) => {
    this.setState({ password2: target.value });
  };

  handleSignIn = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    const { email, password } = this.state;

    dispatch(loginUser(email, password));
  };

  handleSignUp = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    const { displayName, email, password, password2 } = this.state;

    dispatch(signupUser(displayName, email, password, password2));
  };

  handleForgot = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    const { email } = this.state;

    dispatch(sendPasswordResetLink(email));
  };
  render() {
    const { classes, loginError, signupError, isAuthenticated, isLoading } =
      this.props;
    if (isAuthenticated) {
      return <Redirect to="/admin" />;
    } else {
      return (
        <div className="section">
          <div className="container">
            <div className="row full-height justify-content-center">
              <div className="col-12 text-center align-self-center py-5">
                <div className="section pb-5 pt-5 pt-sm-2 text-center">
                  <h6 className="mb-0 pb-3">
                    <span>Sign In </span>
                    <span>Sign Up</span>
                  </h6>
                  <input
                    className="checkbox"
                    type="checkbox"
                    id="reg-log"
                    name="reg-log"
                  />
                  <label htmlFor="reg-log"></label>
                  <div className="card-3d-wrap mx-auto">
                    <div className="card-3d-wrapper">
                      <div className="card-front">
                        <div className="center-wrap">
                          <form
                            onSubmit={this.handleSignIn}
                            className="section text-center"
                          >
                            <h4 className="mb-4 pb-3">Sign In</h4>
                            <div className="form-group">
                              <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email Address"
                                className="form-style"
                                autoComplete="off"
                                onChange={this.handleEmailChange}
                              />
                              <i className="input-icon uil uil-at"></i>
                            </div>
                            <div className="form-group mt-2">
                              <input
                                type="password"
                                name="password"
                                className="form-style"
                                placeholder="Password"
                                id="password"
                                autoComplete="off"
                                onChange={this.handlePasswordChange}
                              />
                              <i className="input-icon uil uil-lock-alt"></i>
                            </div>
                            {loginError && (
                              <Typography
                                component="p"
                                className={classes.errorText}
                              >
                                Incorrect email or password.
                              </Typography>
                            )}
                            <br />
                            <button type="submit" className="btn mt-4">
                              <MuiThemeProvider theme={theme}>
                                {isLoading && !loginError ? (
                                  <CircularProgress
                                    className={classes.loader}
                                    color="secondary"
                                  />
                                ) : (
                                  "Submit"
                                )}
                              </MuiThemeProvider>
                            </button>
                            <p className="mb-0 mt-4 text-center">
                              <Link to="/forgot" className="link">
                                <Typography component="p">
                                  Forgot Password ?{" "}
                                </Typography>
                              </Link>
                            </p>
                          </form>
                        </div>
                      </div>
                      <div className="card-back">
                        <div className="center-wrap">
                          <form
                            onSubmit={this.handleSignUp}
                            className="section text-center"
                          >
                            <h4 className="mb-4 pb-3">Sign Up</h4>
                            <div className="form-group">
                              <input
                                type="text"
                                name="fullname"
                                className="form-style"
                                placeholder="Full Name"
                                id="fullname"
                                autoComplete="off"
                                onChange={this.handleNameChange}
                              />
                              <i className="input-icon uil uil-user"></i>
                            </div>
                            <div className="form-group mt-2">
                              <input
                                type="email"
                                name="logemail"
                                className="form-style"
                                placeholder="Email Address"
                                id="logemail"
                                autoComplete="off"
                                onChange={this.handleEmailChange}
                              />
                              <i className="input-icon uil uil-at"></i>
                            </div>
                            <div className="form-group mt-2">
                              <input
                                type="password"
                                name="password"
                                className="form-style"
                                placeholder="Password"
                                id="password"
                                autoComplete="off"
                                onChange={this.handlePasswordChange}
                              />
                              <i className="input-icon uil uil-lock-alt"></i>
                            </div>
                            <div className="form-group mt-2">
                              <input
                                type="password"
                                name="password2"
                                className="form-style"
                                placeholder="Repeat Password"
                                id="password2"
                                autoComplete="off"
                                onChange={this.handlePasswordChange2}
                              />
                              <i className="input-icon uil uil-lock-alt"></i>
                            </div>
                            {signupError && (
                              <Typography
                                component="p"
                                className={classes.errorText}
                              >
                                {signupError}
                              </Typography>
                            )}
                            <button type="submit" className="btn mt-4">
                              <MuiThemeProvider theme={theme}>
                                {isLoading ? (
                                  <CircularProgress color="secondary" />
                                ) : (
                                  "Submit"
                                )}
                              </MuiThemeProvider>
                            </button>
                          </form>
                        </div>
                      </div>
                      <div className="card-forgot"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    isLoggingIn: state.auth.isLoggingIn,
    isLoading: state.auth.isLoading,
    loginError: state.auth.loginError,
    isAuthenticated: state.auth.isAuthenticated,
    isSigningUp: state.auth.isSigningUp,
    signupError: state.auth.signupError,
  };
}

export default withStyles(styles)(connect(mapStateToProps)(Login));
