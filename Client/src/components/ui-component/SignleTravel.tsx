import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";

import ClearIcon from "@material-ui/icons/Clear";

import { ChangeFollowStateAction } from "../../store/async-actions/ChnageFollowStatus";
import { getTravelsAction } from "../../store/async-actions/getTravelsAction";
import GetMoreInfoComponent from "./GetMoreInfoComponent";
import "./ui.css";
import { ClearTravelAction } from "../../store/async-actions/ClearTravelAction";
import EditModalComponent from "./EditIconComponent";

export default function SingleTravel(props: any) {
  const { travel } = props;

  const [FollowState, setFollowState] = useState(true);

  let LocalStorageUser: any = localStorage.getItem("user");
  const user = JSON.parse(LocalStorageUser);

  const token: any = localStorage.getItem("token");
  if (token) console.log("SPT", token);

  const [isAdditionalInfoOpened, setAdditionalInfo] = useState(false);

  const additionalInfoAction = () => {
    setAdditionalInfo(!isAdditionalInfoOpened);
  };
  const showAdditionalInfo = () => {
    return isAdditionalInfoOpened ? <GetMoreInfoComponent {...travel} /> : null;
  };

  const IconsSide = () => {
    return user.userType === "user" ? (
      <h4 className="col-2 FollowIcon" onClick={handleFollow}>
        F
      </h4>
    ) : (
      <h3>{EditAndDeleteIcons()}</h3>
    );
  };

  const EditAndDeleteIcons = () => {
    return (
      <div>
        <div>
          {" "}
          <h3 style={{ cursor: "pointer" }} onClick={handleClear}>
            <ClearIcon />
          </h3>
          <h3>
            {" "}
            <EditModalComponent {...travel} />
          </h3>
        </div>
      </div>
    );
  };

  const handleClear = async () => {
    await ClearTravelAction(travel.id);
    await getTravelsAction();
  };

  const handleFollow = async () => {
    setFollowState(!FollowState);
    await ChangeFollowStateAction(user.id, travel.id, FollowState);
    await getTravelsAction();
  };

  return (
    <div key={travel.id} className="cardDiv">
      <div className="row">
        <h3 className="col-9">{travel.WhereTo}</h3>
        {IconsSide()}
      </div>

      <Image
        src={travel.Image}
        rounded
        style={{ width: "200px", height: "150px" }}
      />
      <h2>{travel.Price}$</h2>
      <button
        className={"btn btn-primary col-6"}
        onClick={additionalInfoAction}
      >
        {" "}
        More Info{" "}
      </button>
      {showAdditionalInfo()}
    </div>
  );
}
