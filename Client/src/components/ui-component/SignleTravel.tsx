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

export default function SingleTravel(props: any) {
  const { travel } = props;

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
  if (token) console.log("SPT", token);

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

  return (
    <div className="CardMain">
      <Card className={classes.root}>
        <div className="row">
          <h3 className="TravelName col-9 ">{travel.WhereTo}</h3>
          <span className="col-2">{IconsSide()}</span>
        </div>
        <CardActionArea>
          <CardMedia
            className="TravelImage"
            image={
              travel.Image
                ? travel.Image
                : "https://www.google.co.il/search?q=no+image&sxsrf=ALeKk03jmnYK1_fYwLlYWrQf0Andpmpxag:1618234838769&tbm=isch&source=iu&ictx=1&fir=r_eCQ0GQ0UO8ZM%252CH0F39Afu_F6SBM%252C_&vet=1&usg=AI4_-kR66hd3w82I-zg5-JdLlcigCb22CQ&sa=X&ved=2ahUKEwja-OjF6vjvAhVLD2MBHfHNA88Q9QF6BAgQEAE#imgrc=r_eCQ0GQ0UO8ZM"
            }
            title="Contemplative Reptile"
          />
          <CardContent style={{ textAlign: "left" }}>
            <h2>{travel.Price} $</h2>
            <Typography variant="body2" color="textSecondary" component="p">
              <div>{showAdditionalInfo()}</div>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}
