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
        <div className="MainContent row">
          <div className="col-6">
            <div className="Text ">
              {" "}
              <div className="FirstText">
                <span>Welcome to our</span>
                <br />
                <span>Pretty Login</span>
                <br />
              </div>
              <div className="SecontText">
                It's great to have you in our website!
              </div>
              <br />
              <div className="FormControl">
                <div>Email:</div>
                <input
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="FormControl">
                <div>password:</div>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="ButtonsForm row">
                <button className="col-5 fButton" onClick={handlebutton}>
                  Login
                </button>
                <button className="col-5 ml-2 sButton">Create Account</button>
              </div>
            </div>
          </div>
          <div className="col-5">
            <img src="https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MjB8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60" />
          </div>
        </div>
      </div>
    </div>
  );
}
