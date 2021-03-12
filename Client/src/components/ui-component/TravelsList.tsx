import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getTravelsAction } from "../../store/async-actions/getTravelsAction";
import { IState } from "../../store/reducers/mainReducers";
import { Image } from "react-bootstrap";
import AdditionalInfo from "./AdditionalInfo";
import SingleTravel from "./SignleTravel";

export default function TravelsList() {
  const travels = useSelector((state: IState) => state.travels);

  useEffect(() => {
    getTravelsAction();
  }, []);

  return (
    <div className="container">
      <div className="row">
        {travels.map((travel) => {
          return (
            <div className="col-3" key={travel.id}>
              <SingleTravel travel={travel} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
