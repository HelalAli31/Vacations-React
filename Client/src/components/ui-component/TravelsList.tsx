import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getTravelsAction } from "../../store/async-actions/getTravelsAction";
import { IState } from "../../store/reducers/mainReducers";
import { Image } from "react-bootstrap";
import AdditionalInfo from "./AdditionalInfo";
import SingleTravel from "./SignleTravel";
import LeftSide from "./SearchPage/LeftSide";

export default function TravelsList() {
  const travels = useSelector((state: IState) => state.travels);
  const search = useSelector((state: IState) => state.searchVacations);
  console.log(search);

  useEffect(() => {
    getTravelsAction(search);
  }, [search]);

  return (
    <div className="container">
      <div>
        {search.distination ? (
          <div className="row">
            <div className="LeftSide mt-5 mr-2 col-2">
              <LeftSide />{" "}
            </div>
            <div className="row col-9">
              {travels.map((travel) => {
                return (
                  <div className="col-12" key={travel.id}>
                    {" "}
                    <SingleTravel travel={travel} />{" "}
                  </div>
                );
              })}{" "}
            </div>
          </div>
        ) : (
          <div className="row">
            {" "}
            {travels.map((travel) => {
              return (
                <div className="col-4" key={travel.id}>
                  {" "}
                  <SingleTravel travel={travel} />{" "}
                </div>
              );
            })}{" "}
          </div>
        )}
        {/* <div className="col-2 mt-5  ">
          {search.distination ? (
            <div className="LeftSide">
              <LeftSide />{" "}
            </div>
          ) : (
            <div> </div>
          )}
        </div>
        <div className="row col-9">
          {travels.map((travel) => {
            return search.distination ? (
              <div className="col-12" key={travel.id}>
                <SingleTravel travel={travel} />
              </div>
            ) : (
              <div className="col-4" key={travel.id}>
                <SingleTravel travel={travel} />
              </div>
            );
          })}
        </div> */}
      </div>
    </div>
  );
}
