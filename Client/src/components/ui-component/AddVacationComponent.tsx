import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { getTravelsAction } from "../../store/async-actions/getTravelsAction";
import { AddTravelAction } from "../../store/async-actions/AddTravelAction";
import { useHistory } from "react-router";

import "./ui.css";
import { BsFillHouseFill } from "react-icons/bs";

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
    let Datebool = true;
    for (let i = 0; i < 3; i++) {
      let Start = EndAt.split("-")[i];
      let End = StartAt.split("-")[i];
      if (Start > End) return false;
    }
    return (
      Name.length > 0 &&
      Price.length > 0 &&
      Image.length > 0 &&
      Description.length > 0 &&
      StartAt.length > 0 &&
      EndAt.length > 0
      //   Datebool
    );
  }

  return (
    <div className="AddVacationClass">
      <button
        className="HomeButton"
        onClick={() => {
          history.push("/home");
        }}
      >
        <BsFillHouseFill />
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
              <label>Image:</label>
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
          <Button onClick={handleAddVacation} disabled={!validateForm()}>
            Add
          </Button>
          <Button onClick={props.onHide}>Close</Button>
        </div>
      </div>
    </div>
  );
}
