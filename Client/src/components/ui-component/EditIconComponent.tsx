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
  const [Name, setName] = useState(travel_name);
  const [Image, setImage] = useState(image_value);
  const [Price, setPrice] = useState(price_value);
  const [Description, setDescription] = useState(description_value);
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
      Image:
        Image ||
        "data:image/jpeg;base64,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",
      Description: Description || "",
      From: StartAt,
      To: EndAt,
    };
    console.log(EditedToObj);
    await EditTravelAction(EditedToObj, id);
    await getTravelsAction();
  };

  function validateForm() {
    return Name && Price && StartAt && EndAt;
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
