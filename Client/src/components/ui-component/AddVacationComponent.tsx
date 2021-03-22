import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { getTravelsAction } from "../../store/async-actions/getTravelsAction";
import { AddTravelAction } from "../../store/async-actions/AddTravelAction";
import { useHistory } from "react-router";
import HomeIcon from "@material-ui/icons/Home";

import "./ui.css";
import { BsFillHouseFill } from "react-icons/bs";
import moment from "moment";

export default function AddVacationModal(props: any) {
  const history = useHistory();
  const [Name, setName] = useState("");
  const [Image, setImage] = useState("");
  const [Price, setPrice] = useState("");
  const [Description, setDescription] = useState("");
  const [StartAt, setStartAt] = useState("");
  const [EndAt, setEndAt] = useState("");
  const [Id, setId] = useState("");

  const formObj: any = {
    Name: setName,
    Price: setPrice,
    Image: setImage,
    Description: setDescription,
    StartAt: setStartAt,
    EndAt: setEndAt,
    Id: setId,
  };

  const handleOnchange = (e: any) => {
    const setterFunction: any = formObj[e.target.name];
    if (typeof setterFunction !== "function") return;
    setterFunction(e.target.value);
  };

  const handleAddVacation = async () => {
    const vacation = {
      WhereTo: Name,
      Price: Price,
      Image: Image,
      Description: Description,
      From: StartAt,
      To: EndAt,
      id: Id,
    };
    console.log(vacation);
    await AddTravelAction(vacation);
    await getTravelsAction();
  };

  function validateForm() {
    let Datebool = false;
    const s = moment(StartAt).startOf("day").fromNow();
    const e = moment(EndAt).startOf("day").fromNow();
    if (s <= e && s.includes("in") && e.includes("in")) Datebool = true;
    return (
      Name.length > 0 &&
      Price.length > 0 &&
      Image.length > 0 &&
      Description.length > 0 &&
      StartAt.length > 0 &&
      EndAt.length > 0 &&
      Datebool
    );
  }

  return (
    <div className="AddVacationClass">
      <button
        className="HomeButtonbtn"
        onClick={() => {
          history.push("/home");
        }}
      >
        <h1 style={{ marginRight: "50px" }}>
          {" "}
          <HomeIcon />
        </h1>
      </button>
      <div
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="container"
      >
        <h1>
          <h1 id="contained-modal-title-vcenter">Add Travel</h1>
        </h1>
        <h4>
          <div>
            <div className="form-group">
              <label>Travel id:</label>
              <input
                className="form-control"
                name="Id"
                aria-describedby="emailHelp"
                onChange={handleOnchange}
              />
            </div>{" "}
            <div className="form-group">
              <label>Travel Name:</label>
              <input
                className="form-control"
                name="Name"
                aria-describedby="emailHelp"
                onChange={handleOnchange}
              />
            </div>
            <div className="form-group">
              <label>Image url:</label>
              <input
                className="form-control"
                name="Image"
                aria-describedby="emailHelp"
                onChange={handleOnchange}
              />
            </div>
            <div className="form-group">
              <label>Start Date:</label>

              <Form.Group controlId="dob">
                <Form.Control
                  type="date"
                  name="StartAt"
                  min={moment().format()}
                  onChange={handleOnchange}
                />
              </Form.Group>
            </div>
            <div className="form-group">
              <label>End Date:</label>
              <Form.Group controlId="dob">
                <Form.Control
                  type="date"
                  name="EndAt"
                  onChange={handleOnchange}
                />
              </Form.Group>
            </div>
            <div className="form-group">
              <label>Price:</label>
              <input
                className="form-control"
                name="Price"
                aria-describedby="emailHelp"
                onChange={handleOnchange}
              />
            </div>
            <div className="form-group">
              <label>Desciption:</label>
              <input
                name="Description"
                className="form-control"
                aria-describedby="emailHelp"
                style={{ height: "100px" }}
                onChange={handleOnchange}
              />
            </div>
          </div>
        </h4>
        <div>
          <Button
            onClick={handleAddVacation}
            disabled={!validateForm()}
            style={{ backgroundColor: "rgb(85, 86, 126)", cursor: "pointer" }}
          >
            <span>Add</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
