import React from "react";
import moment from "moment";
export default function GetMoreInfoComponent(props: any) {
  const { Followers, From, To, Description } = props;
  return (
    <div></div>
    // <div>
    //   <br />
    //   <h5>following: {Followers}</h5>
    //   <h5>From: {moment(From).format("DD-MMM yyyy")}</h5>
    //   <h5>To: {moment(To).format("DD-MMM yyyy")}</h5>
    //   <h5>** {Description} **</h5>
    // </div>
  );
}
