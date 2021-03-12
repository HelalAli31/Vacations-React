import { render } from "@testing-library/react";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import EditIcon from "@material-ui/icons/Edit";
import { EditTravelAction } from "../../store/async-actions/EditTravelAction";
import moment from "moment";
import { Form } from "react-bootstrap";

function MyVerticallyCenteredModal(props: any) {
  const { TravelName, id } = props;
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

  const handleEdit = () => {
    const EditedToObj = {
      WhereTo: Name,
      Price: Price,
      Image: Image,
      Description: Description,
      From: StartAt,
      To: EndAt,
    };
    console.log(EditedToObj);
    EditTravelAction(EditedToObj, id);
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
          Edit {TravelName} Travel
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          {" "}
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
  const { WhereTo, id } = props;
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button
        style={{ backgroundColor: "black", border: "none" }}
        onClick={() => setModalShow(true)}
      >
        <EditIcon />
      </Button>

      <MyVerticallyCenteredModal
        TravelName={WhereTo}
        id={id}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}