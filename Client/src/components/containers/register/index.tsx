import React, { useState } from "react";
import { Form, Col, Button } from "react-bootstrap";
import { registerUser } from "../../../store/async-actions/register";

export interface IUserDetails {
  firstName: string;
  lastName: string;
  userName: string;
  userType: string;
  password: string;
}

export function Register() {
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

  function sendUserDetails() {
    registerUser(userDetails);
    console.log(userDetails);
  }
  return (
    <div>
      <h1> {registrationHeader} </h1>
      <div>
        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>userName</Form.Label>
              <Form.Control
                name="userName"
                onChange={(event) => {
                  onChangeUserDetails(event?.target.name, event?.target.value);
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

          <Button variant="primary" onClick={sendUserDetails} type="button">
            regist
          </Button>
        </Form>
      </div>
    </div>
  );
}
