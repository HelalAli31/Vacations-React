import { render } from "@testing-library/react";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { EditTravelAction } from "../../store/async-actions/EditTravelAction";
import moment from "moment";
import EditIcon from "@material-ui/icons/Edit";

import { Form } from "react-bootstrap";
import { getTravelsAction } from "../../store/async-actions/getTravelsAction";

function MyVerticallyCenteredModal(props: any) {
  const {
    travel_name,
    id,
    description_value,
    image_value,
    price_value,
  } = props;
  const [Name, setName] = useState("");
  const [Image, setImage] = useState("");
  const [Price, setPrice] = useState("");
  const [Description, setDescription] = useState("");
  const [StartAt, setStartAt] = useState("");
  const [EndAt, setEndAt] = useState("");

  const formObj: any = {
    Name: setName,
    Price: setPrice,
    Image: setImage,
    Description: setDescription,
    StartAt: setStartAt,
    EndAt: setEndAt,
    Id: id,
  };

  const handleOnchange = (e: any) => {
    const setterFunction: any = formObj[e.target.name];
    if (typeof setterFunction !== "function") return;
    setterFunction(e.target.value);
  };

  const handleEdit = async () => {
    const EditedToObj = {
      WhereTo: Name,
      Price: Price,
      Image: Image,
      Description: Description,
      From: StartAt,
      To: EndAt,
    };
    console.log(EditedToObj);
    await EditTravelAction(EditedToObj, id);
    await getTravelsAction();
  };

  function validateForm() {
    let Datebool = false;
    const s = moment(StartAt).startOf("hour").fromNow();
    const e = moment(EndAt).startOf("hour").fromNow();
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
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit {travel_name} Travel
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          {" "}
          <div className="form-group">
            <label>Travel Name:</label>
            <input
              defaultValue={travel_name}
              className="form-control"
              name="Name"
              aria-describedby="emailHelp"
              onChange={handleOnchange}
            />
          </div>
          <div className="form-group">
            <label>Image:</label>
            <input
              defaultValue={image_value}
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
              defaultValue={price_value}
              aria-describedby="emailHelp"
              onChange={handleOnchange}
            />
          </div>
          <div className="form-group">
            <label>Desciption:</label>
            <input
              name="Description"
              defaultValue={description_value}
              className="form-control"
              aria-describedby="emailHelp"
              style={{ height: "100px" }}
              onChange={handleOnchange}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleEdit} disabled={!validateForm()}>
          Edit
        </Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default function EditModalComponent(props: any) {
  const { WhereTo, id, Description, Image, Price } = props;
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button
        style={{ backgroundColor: "white", color: "black", border: "none" }}
        onClick={() => setModalShow(true)}
      >
        <EditIcon />
      </Button>

      <MyVerticallyCenteredModal
        travel_name={WhereTo}
        description_value={Description}
        image_value={Image}
        price_value={Price}
        id={id}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
