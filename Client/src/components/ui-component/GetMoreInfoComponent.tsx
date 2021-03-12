import React from "react";
import moment from "moment";
export default function GetMoreInfoComponent(props: any) {
  const { Followers, From, To, Description } = props;
  return (
    <div>
      <br />
      <h3>following: {Followers}</h3>
      <h4>From: {moment(From).format("DD-MMM yyyy")}</h4>
      <h4>To: {moment(To).format("DD-MMM yyyy")}</h4>
      <h5>** {Description} **</h5>
    </div>
  );
}
