import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import axios from "axios";

import "../login/index.css";

import { useHistory } from "react-router-dom";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  function validateForm() {
    return userName.length > 0 && password.length > 0;
  }

  const handlebutton = async () => {
    const BASE_URL = `http://localhost:5000`;
    const API_URL = `${BASE_URL}/auth/login`;
    const { data } = await axios.post(`${API_URL}`, { userName, password });
    console.log("======", data);
    if (data.firstName) {
      localStorage.setItem("user", JSON.stringify(data));

      history.push("/Home");
    } else alert(data);
    data.token
      ? localStorage.setItem("token", JSON.stringify(data.token))
      : console.log("no token");
  };

  return (
    <div className="Login">
      <h1>Login</h1>
      <br />
      <Form>
        <Form.Group>
          <div className="row">
            {" "}
            <h4 className="col-5">UserName:</h4>
            <div className="col-7">
              <Form.Control
                autoFocus
                type="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
          </div>
        </Form.Group>

        <Form.Group>
          <div className="row">
            {" "}
            <h4 className="col-5">Password:</h4>
            <div className="col-7">
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </Form.Group>
        <Button
          block
          size="lg"
          type="button"
          disabled={!validateForm()}
          onClick={handlebutton}
        >
          Login
        </Button>
      </Form>
    </div>
  );
}
