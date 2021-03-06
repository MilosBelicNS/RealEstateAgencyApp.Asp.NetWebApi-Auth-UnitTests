import React, { Component } from "react";
import RegLogForms from "./RegLogForms";

class RegisterForm extends Component {
  constructor() {
    super();
    this.state = {
      showForm: false,
    };
  }

  handleClick = (event) => {
    event.preventDefault();

    this.setState((prevState) => {
      return { showForm: !prevState.showForm };
    });
  };

  render() {
    return !this.state.showForm ? (
      <div className="col-sm-2 col-sm-push-1">
        <button
          onClick={this.handleClick}
          className="btn btn-info"
          style={{ marginLeft: "600%", width: "160px" }}
        >
          Register and Login
        </button>
      </div>
    ) : (
      <RegLogForms />
    );
  }
}

export default RegisterForm;
