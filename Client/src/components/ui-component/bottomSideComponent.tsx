import React from "react";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";

export default function BottomSideComponent() {
  return (
    <div className="SideBottom row">
      <div className="col-3"></div>
      <div className="col-3">
        {" "}
        <a className="IconsBottom" href="https://www.facebook.com/">
          {" "}
          <FacebookIcon />
        </a>
      </div>
      <div className="col-3">
        {" "}
        <a className="IconsBottom" href="https://www.instagram.com/">
          {" "}
          <InstagramIcon />
        </a>
      </div>
      <div className="col-3">
        {" "}
        <a className="IconsBottom" href="https://www.twitter.com/">
          {" "}
          <TwitterIcon />
        </a>
      </div>
    </div>
  );
}
