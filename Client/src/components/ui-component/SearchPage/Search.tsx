import { CardMedia } from "@material-ui/core";
import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
export default function Search(props: any) {
  const { travel } = props;
  return (
    <div className="col-12 row">
      <CardMedia
        className="TravelImage2 col-3"
        image={
          travel.image
            ? travel.hotel_image
            : "https://www.google.co.il/search?q=no+image&sxsrf=ALeKk03jmnYK1_fYwLlYWrQf0Andpmpxag:1618234838769&tbm=isch&source=iu&ictx=1&fir=r_eCQ0GQ0UO8ZM%252CH0F39Afu_F6SBM%252C_&vet=1&usg=AI4_-kR66hd3w82I-zg5-JdLlcigCb22CQ&sa=X&ved=2ahUKEwja-OjF6vjvAhVLD2MBHfHNA88Q9QF6BAgQEAE#imgrc=r_eCQ0GQ0UO8ZM"
        }
        title="Contemplative Reptile"
      />
      <div className="col-5 Info">
        <span className="HotelName">{travel.hotel_name}</span>
        <h5 className="RoomType">{travel.room_type_name}</h5>
        <h5 className="BedType">{travel.room_bed_type}</h5>
        <h5 className="leftRooms">
          got only {travel.rooms_available} left at this price on our site
        </h5>
      </div>
      <div className="col-3 RightSide ">
        <span className="stars">{travel.hotel_stars}</span>
        <br />
        <Button className="SeeDetailsButton">See Details </Button>
      </div>
    </div>
  );
}
