import React, { useEffect, useState } from "react";

import ClearIcon from "@material-ui/icons/Clear";

import { ChangeFollowStateAction } from "../../store/async-actions/ChnageFollowStatus";
import { getTravelsAction } from "../../store/async-actions/getTravelsAction";
import GetMoreInfoComponent from "./GetMoreInfoComponent";
import "./ui.css";
import { ClearTravelAction } from "../../store/async-actions/ClearTravelAction";
import EditModalComponent from "./EditIconComponent";
import FacebookIcon from "@material-ui/icons/Facebook";
import getIsAdmin from "../../store/services/Payload/isAdmin";
import getPayload from "../../store/services/Payload/getPayload";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { useSelector } from "react-redux";
import { IState } from "../../store/reducers/mainReducers";
import moment from "moment";
import { Button } from "react-bootstrap";
import ACTIONS from "../../store/actions";
import store from "../../store/index";
import SearchPage from "./SearchPage/Search";
import MainPage from "./MainPage/Main";
const { dispatch } = store;

export default function SingleTravel(props: any) {
  const { travel } = props;
  const search = useSelector((state: IState) => state.searchVacations);
  console.log(travel);

  const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
  });

  const payload = getPayload();
  const user = payload.data;
  const isAdmin = getIsAdmin();

  const token: any = localStorage.getItem("token");

  const showAdditionalInfo = () => {
    return <GetMoreInfoComponent {...travel} />;
  };

  const IconsSide = () => {
    return !isAdmin ? (
      <h4
        className="col-2 FollowIcon"
        style={{ marginLeft: "30px" }}
        onClick={handleFollow}
      >
        {travel.followingState ? (
          <span style={{ color: "red" }}>
            <FacebookIcon />
          </span>
        ) : (
          <FacebookIcon />
        )}
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

  const handleClear = async () => {
    await ClearTravelAction(travel.id);
    await getTravelsAction();
  };

  const handleFollow = async () => {
    await ChangeFollowStateAction(user.id, travel.id);
    await getTravelsAction();
  };
  const classes = useStyles();

  const searchData = () => {
    return search.distination ? <h1>{informationTravel()}</h1> : <h2>AS</h2>;
  };
  const informationTravel = () => {
    const StartTrip: any = moment(travel.From).format("DD/MM/YYYY");
    const EndTrip: any = moment(travel.To).format("DD/MM/YYYY");

    return (
      <div>
        <div className="row col-12 SearchCard p-3">
          <SearchPage travel={travel} />
        </div>
      </div>
    );
  };

  const MainCard = () => {
    return (
      <div className="CardMain">
        <MainPage travel={travel} />
      </div>
    );
  };
  const SearchCard = () => {
    return <div className=" mt-3">{informationTravel()}</div>;
  };
  return (
    <div>{search.distination ? SearchCard() : <div>{MainCard()}</div>}</div>
  );
}
