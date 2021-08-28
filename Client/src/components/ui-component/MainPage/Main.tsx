import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import "../../ui-component/ui.css";
import store from "../../../store/index";
import ACTIONS from "../../../store/actions";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const { dispatch } = store;
export default function MainPage(props: any) {
  const { travel } = props;
  const GoToCity = (e: any) => {
    dispatch({
      type: ACTIONS.searchVacations,
      payload: { distination: travel.city },
    });
  };
  return (
    <div>
      <Card onClick={GoToCity}>
        <CardActionArea>
          <CardMedia
            className="TravelImage"
            image={
              travel.image
                ? travel.image
                : "https://www.google.co.il/search?q=no+image&sxsrf=ALeKk03jmnYK1_fYwLlYWrQf0Andpmpxag:1618234838769&tbm=isch&source=iu&ictx=1&fir=r_eCQ0GQ0UO8ZM%252CH0F39Afu_F6SBM%252C_&vet=1&usg=AI4_-kR66hd3w82I-zg5-JdLlcigCb22CQ&sa=X&ved=2ahUKEwja-OjF6vjvAhVLD2MBHfHNA88Q9QF6BAgQEAE#imgrc=r_eCQ0GQ0UO8ZM"
            }
            title="Contemplative Reptile"
          />
          <CardContent style={{ textAlign: "left" }}>
            <h5>{travel.city}</h5>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
            ></Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}
