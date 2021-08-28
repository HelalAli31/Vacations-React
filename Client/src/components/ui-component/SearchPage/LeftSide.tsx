import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
export default function LeftSide(props: any) {
  const { travel } = props;
  return (
    <div className="p-3">
      <h5>Filter By :</h5>
      <hr />
      <div className="row">
        <input className="col-2 CheckBoxCss mt-2" type="checkbox" />
        <div className="col-6 ">5 stars</div>
      </div>
      <div className="row">
        <input className="col-2  CheckBoxCss mt-2" type="checkbox" />
        <div className="col-6">4 stars</div>
      </div>
      <div className="row">
        <input className="col-2 CheckBoxCss  mt-2" type="checkbox" />
        <div className="col-6">3 stars</div>
      </div>

      <hr />
      <div className="mt-2">
        <h5>Review Score</h5>
        <div className="row mt-1">
          <input className="col-2  mt-2 CheckBoxCss" type="checkbox" />
          <div className="col-10">Wonderful: 9+</div>
        </div>
        <div className="row mt-1">
          <input className="col-2 CheckBoxCss  mt-2" type="checkbox" />
          <div className="col-10">Wonderful: 8+</div>
        </div>
        <div className="row mt-1">
          <input className="col-2 CheckBoxCss   mt-2" type="checkbox" />
          <div className="col-10">Wonderful: 7+</div>
        </div>
      </div>
    </div>
  );
}
