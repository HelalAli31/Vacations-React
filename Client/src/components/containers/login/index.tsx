import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";

import "../login/index.css";
import { LoginActionService } from "../../../store/services/loginService";

export default function Login() {
  const history = useHistory();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return userName.length > 0 && password.length > 0;
  }

  const handlebutton = async () => {
    try {
      const result = await LoginActionService(userName, password);
      if (result.firstName) {
        localStorage.setItem("user", JSON.stringify(result));
        localStorage.setItem("token", JSON.stringify(result.token));
        history.push("/home");
      } else {
        alert(result);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="Auth">
      <div className="container AuthCard">
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
            className="box-3"
            block
            size="lg"
            type="button"
            disabled={!validateForm()}
            onClick={handlebutton}
            style={{ backgroundColor: "rgb(85, 86, 126)" }}
          >
            <div className="btn btn-three">
              <span>Login</span>
            </div>
          </Button>

          <Button
            block
            size="lg"
            type="button"
            style={{ backgroundColor: "rgb(85, 86, 126)" }}
            onClick={() => {
              history.push("/RegisterPage");
            }}
          >
            Register
          </Button>
        </Form>
      </div>
    </div>
  );
}
