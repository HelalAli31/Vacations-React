import React from "react";
import symbol from "../../assets/symbol.jpg";

export default function Toolbar(props: any) {
  return (
    <div>
      <div className="ToolbarName row">
        <div className="col-2">
          <img width="70px" height="70px" src={symbol} />
        </div>
        <div className="col-9 CompanyDiv mt-2 ml-3">
          <h5 className="CompanyName"> HEAVEN TOURS</h5>
          <h5 className="CompanyComment">AnyWhere,AnyTime</h5>
        </div>
      </div>
    </div>
  );
}
