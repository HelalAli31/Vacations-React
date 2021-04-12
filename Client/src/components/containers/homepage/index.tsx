import React from "react";
import { useHistory } from "react-router-dom";
import TravelsList from "../../ui-component/TravelsList";
import "../homepage/index.css";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import getPayload from "../../../store/services/Payload/getPayload";
import getIsAdmin from "../../../store/services/Payload/isAdmin";
import { Button } from "react-bootstrap";

export default function HomePage() {
  const history = useHistory();

  const userToken = getPayload();
  const user = userToken.data;

  const isAdmin = getIsAdmin();

  const handleSignOut = () => {
    localStorage.clear();
    history.push("/");
  };

  const AddvacationBottun = () => {
    return isAdmin ? (
      <Button
        onClick={() => {
          history.push("/AddVacation");
        }}
        variant="link"
      >
        {" "}
        Add vacation
      </Button>
    ) : (
      <h1></h1>
    );
  };

  const VacationReportsButton = () => {
    return isAdmin ? (
      <Button
        onClick={() => {
          history.push("/vacationsReport");
        }}
        variant="link"
      >
        {" "}
        Vacation reports
      </Button>
    ) : (
      <h1></h1>
    );
  };

  const SignOutButton = () => {
    return (
      <Button variant="link" onClick={handleSignOut}>
        SignOut
      </Button>
    );
  };

  if (!user) return <h1>NO travels to Show,you should login first</h1>;
  return (
    <div>
      <div className="row">
        <h1 className="NavHeader col-1">{SignOutButton()}</h1>
        <h1 className="NavHeader col-2">{AddvacationBottun()}</h1>
        <h1 className="NavHeader col-2">{VacationReportsButton()}</h1>
        <h1 className="col-4 NavNameHeader"></h1>
        <div className="col-1">
          {user?.firstName} {user?.lastName}
          <h3 className="">
            {" "}
            <AccountCircleIcon />
          </h3>
        </div>
      </div>
      <div>
        <img
          className="Image"
          src="https://cdn.pixabay.com/photo/2017/08/05/18/53/mountain-2585069_1280.jpg"
        />
      </div>
      <div className="TravelsDiv">
        <TravelsList />
      </div>
    </div>
  );
}
