import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";

import ClearIcon from "@material-ui/icons/Clear";

import { ChangeFollowStateAction } from "../../store/async-actions/ChnageFollowStatus";
import { getTravelsAction } from "../../store/async-actions/getTravelsAction";
import GetMoreInfoComponent from "./GetMoreInfoComponent";
import "./ui.css";
import { ClearTravelAction } from "../../store/async-actions/ClearTravelAction";
import EditModalComponent from "./EditIconComponent";
import { useSelector } from "react-redux";
import { IState } from "../../store/reducers/mainReducers";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import FacebookIcon from "@material-ui/icons/Facebook";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

export default function SingleTravel(props: any) {
  const { travel } = props;
  const userTypeStore = useSelector((state: IState) => state.userType);
  console.log("userTypeStore", userTypeStore);

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
    return userTypeStore === "user" ? (
      <h4
        className="col-2 FollowIcon"
        style={{ marginLeft: "30px" }}
        onClick={handleFollow}
      >
        <FacebookIcon />
      </h4>
    ) : (
      <div className="row">{EditAndDeleteIcons()}</div>
    );
  };

  const EditAndDeleteIcons = () => {
    return (
      <div className="row">
        <h3
          className="col-1"
          style={{ marginLeft: "60px", cursor: "pointer" }}
          onClick={handleClear}
        >
          <ClearIcon />
        </h3>
        <h3 className="col-1" style={{ cursor: "pointer", color: "red" }}>
          <EditModalComponent {...travel} />
        </h3>
      </div>
    );
  };

  const IconMoreInfoComponent = () => {
    return isAdditionalInfoOpened ? (
      <span className="MoreInfoButton">
        <ArrowUpwardIcon />
      </span>
    ) : (
      <span className="MoreInfoButton">
        <ArrowDownwardIcon />
      </span>
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
    <div className="hh">
      <div className=" TravelCard card ">
        <div className="row">
          <h2 className="col-6 TravelName">{travel.WhereTo}</h2>
          <h3 className="col-6"> {IconsSide()}</h3>
        </div>
        <div>
          <div className="row">
            <Image
              className="col-12"
              src={travel.Image}
              rounded
              style={{ width: "300px", height: "250px" }}
            />
          </div>

          <div>
            <h2>{travel.Price}$</h2>
          </div>
          <div>
            <h1 onClick={additionalInfoAction} style={{ cursor: "pointer" }}>
              {IconMoreInfoComponent()}
            </h1>
            {showAdditionalInfo()}
          </div>
        </div>
      </div>
    </div>
  );
}
