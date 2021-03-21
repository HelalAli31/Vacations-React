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
import TravelsList from "./TravelsList";
import { useHistory } from "react-router";

export default function Home(props: any) {
  let LocalStorageUser: any = localStorage.getItem("user");
  const user = JSON.parse(LocalStorageUser);
  const history = useHistory();

  const handleSignOut = () => {
    localStorage.clear();
    history.push("/");
  };

  const handleAddVacation = () => {
    return (
      <div>
        <div>
          <EditModalComponent whereTo="asda" />
        </div>
      </div>
    );
  };

  if (!user) return <h1>NO travels to Show</h1>;
  return (
    <div className="mainDiv">
      <div>
        {" "}
        <h1 className="name">
          Hello~{user.firstName} {user.lastName}
        </h1>
        <button className="SignOutButton" type="button" onClick={handleSignOut}>
          Sign out
        </button>
      </div>
      <div>
        <button type="button" onClick={handleAddVacation}>
          Add vacation
        </button>
      </div>

      <div className="TravelsDiv">
        <TravelsList />
      </div>
    </div>
  );
}
