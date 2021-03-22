import React from "react";
import { useHistory } from "react-router-dom";
import EditModalComponent from "../../ui-component/EditIconComponent";
import TravelsList from "../../ui-component/TravelsList";
import { BsPeopleCircle } from "react-icons/bs";
import "../homepage/index.css";

import ACTIONS from "../../../store/actions";
import store from "../../../store/index";
const { dispatch } = store;
export default function HomePage() {
  let LocalStorageUser: any = localStorage.getItem("user");
  const user = JSON.parse(LocalStorageUser);
  const history = useHistory();

  dispatch({
    type: ACTIONS.user.GET_USERTYPE,
    payload: user.userType,
  });

  const handleSignOut = () => {
    localStorage.clear();
    history.push("/");
  };

  const handleAddVacation = () => {
    history.push("/AddVacation");
  };

  const handlevacationsReport = () => {
    history.push("/vacationsReport");
  };

  const AddvacationBottun = () => {
    return user.userType === "admin" ? (
      <div>
        <button
          className="glow-on-hover"
          type="button"
          onClick={handleAddVacation}
        >
          Add vacation
        </button>
        <button
          className="glow-on-hover"
          type="button"
          onClick={handlevacationsReport}
        >
          Vacations Report
        </button>
      </div>
    ) : null;
  };

  if (!user) return <h1>NO travels to Show</h1>;
  return (
    <div>
      {" "}
      <div className="mainDiv">
        <div>
          {" "}
          <h1 className="name">
            Hello~{user.firstName} {user.lastName} <BsPeopleCircle />
          </h1>
          <div className="SignOutButton">
            <div className="box-1">
              <div className="btn btn-one" onClick={handleSignOut}>
                <span>Sign Out</span>
              </div>
            </div>
          </div>
        </div>

        <div className="title">
          <h1>You Deserve a </h1>
          <h1>VACATION</h1>
        </div>

        <img
          className="Image"
          src="https://cdn.pixabay.com/photo/2017/08/05/18/53/mountain-2585069_1280.jpg"
        />

        <div className="AddVacationButton">{AddvacationBottun()}</div>

        <div className="TravelsDiv">
          <TravelsList />
        </div>
      </div>
    </div>
  );
}
