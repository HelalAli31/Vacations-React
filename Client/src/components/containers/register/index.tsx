import React, { useState } from "react";
import { Form, Col, Button } from "react-bootstrap";
import { useHistory } from "react-router";
import { registerUser } from "../../../store/async-actions/register";
import "../login/index.css";
import "./index.css";

export interface IUserDetails {
  firstName: string;
  lastName: string;
  userName: string;
  userType: string;
  password: string;
}

export function Register() {
  const history = useHistory();
  const registrationHeader: string = "Register";
  const user: IUserDetails = {
    firstName: "",
    lastName: "",
    userName: "",
    userType: "user",
    password: "",
  };
  const [userDetails, setUserDetails] = useState(user);
  const [emailValidation, setEmailValidation] = useState({
    message: "",
    isValid: true,
  });
  function onChangeUserDetails(key: string, value: string) {
    setUserDetails({ ...userDetails, [key]: value });
  }
  function validateForm() {
    return (
      userDetails.firstName.length > 0 &&
      userDetails.lastName.length > 0 &&
      userDetails.password.length > 0 &&
      userDetails.userName.length > 0
    );
  }
  function sendUserDetails() {
    registerUser(userDetails);
    console.log(userDetails);
  }
  return (
    <div className="Auth">
      <div className="AuthCard">
        <h1> {registrationHeader} </h1>
        <div>
          <Form>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>userName</Form.Label>
                <Form.Control
                  name="userName"
                  onChange={(event) => {
                    onChangeUserDetails(
                      event?.target.name,
                      event?.target.value
                    );
                  }}
                  type="email"
                  placeholder="user name"
                />
                {emailValidation.isValid ? "" : emailValidation.message}
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  onChange={(event) =>
                    onChangeUserDetails(event?.target.name, event?.target.value)
                  }
                  placeholder="Password"
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  name="firstName"
                  onChange={(event) =>
                    onChangeUserDetails(event?.target.name, event?.target.value)
                  }
                  placeholder="first name"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  name="lastName"
                  onChange={(event) =>
                    onChangeUserDetails(event?.target.name, event?.target.value)
                  }
                  placeholder="last name"
                />
              </Form.Group>
            </Form.Row>
            <Button
            className="LoginPageButton"
              style={{ marginLeft: "10px" }}
              variant="primary"
              onClick={() => {
                history.push("/login");
              }}
              type="button"
            >
              login
            </Button>
            <Button
              variant="primary"
              onClick={sendUserDetails}
              type="button"
              disabled={!validateForm()}
            >
              <div className="wrapper">
                <div className="link_wrapper">
                  <a href="#">Register</a>
                  <div className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 268.832 268.832"
                    >
                      <path d="M265.17 125.577l-80-80c-4.88-4.88-12.796-4.88-17.677 0-4.882 4.882-4.882 12.796 0 17.678l58.66 58.66H12.5c-6.903 0-12.5 5.598-12.5 12.5 0 6.903 5.597 12.5 12.5 12.5h213.654l-58.66 58.662c-4.88 4.882-4.88 12.796 0 17.678 2.44 2.44 5.64 3.66 8.84 3.66s6.398-1.22 8.84-3.66l79.997-80c4.883-4.882 4.883-12.796 0-17.678z" />
                    </svg>
                  </div>
                </div>
              </div>
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
