import React, { Component } from "react";
import "./login.css";
import { connect } from "react-redux";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/styles";
import { Link, Redirect } from "react-router-dom";
import { sendPasswordResetLink } from "../actions";

const styles = () => ({
  errorText: { color: "#f50057", marginBottom: 5, textAlign: "center" },
});
const theme = createMuiTheme({ palette: { secondary: { main: "#fff" } } });
class Login extends Component {
  state = { email: "" };

  handleEmailChange = ({ target }) => {
    this.setState({ email: target.value });
  };

  handleForgot = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    const { email } = this.state;

    dispatch(sendPasswordResetLink(email));
  };
  render() {
    const {
      classes,
      sendPassResetSuccess,
      sendPassResetError,
      isAuthenticated,
      isLoading,
    } = this.props;
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
                    <span>Reset Password </span>
                  </h6>
                  <div className="card-3d-wrap mx-auto">
                    <div className="card-3d-wrapper">
                      <div className="card-front">
                        <div className="center-wrap">
                          <form
                            onSubmit={this.handleForgot}
                            className="section text-center"
                          >
                            <h4 className="mb-4 pb-3">
                              Enter Registered Email
                            </h4>
                            <div className="form-group">
                              <input
                                type="text"
                                name="email"
                                className="form-style"
                                placeholder="Email Address"
                                id="email"
                                autoComplete="off"
                                onChange={this.handleEmailChange}
                              />
                              <i className="input-icon uil uil-user"></i>
                            </div>
                            {sendPassResetError && (
                              <Typography
                                component="p"
                                className={classes.errorText}
                              >
                                {sendPassResetError}
                              </Typography>
                            )}
                            {sendPassResetSuccess && (
                              <Typography
                                component="p"
                                className={classes.successText}
                              >
                                Password reset link sent!
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
                            <p className="mb-0 mt-4 text-center">
                              <Link to="/login" className="link">
                                <Typography component="p">
                                  Back to Login ?{" "}
                                </Typography>
                              </Link>
                            </p>
                          </form>
                        </div>
                      </div>
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
    isLoading: state.auth.isLoading,
    isAuthenticated: state.auth.isAuthenticated,
    sendPassResetSuccess: state.auth.sendPassResetSuccess,
    sendPassResetError: state.auth.sendPassResetError,
  };
}

export default withStyles(styles)(connect(mapStateToProps)(Login));
