import React from "react";
import { useHistory } from "react-router-dom";
import EditModalComponent from "../../ui-component/EditIconComponent";
import TravelsList from "../../ui-component/TravelsList";
import { BsPeopleCircle } from "react-icons/bs";
import "../homepage/index.css";
export default function HomePage() {
  let LocalStorageUser: any = localStorage.getItem("user");
  const user = JSON.parse(LocalStorageUser);
  const history = useHistory();

  const handleSignOut = () => {
    localStorage.clear();
    history.push("/");
  };

  const handleAddVacation = () => {
    history.push("/AddVacation");
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
          <button
            className="SignOutButton"
            type="button"
            onClick={handleSignOut}
          >
            Sign out
          </button>
        </div>

        <div className="title">
          <h1>You Deserve a </h1>
          <h1>VACATION</h1>
        </div>

        <img
          className="Image"
          src="https://images.all-free-download.com/images/graphiclarge/hat_and_flipflops_on_the_beach_204117.jpg"
        />

        <div className="AddVacationButton">
          <button type="button" onClick={handleAddVacation}>
            Add vacation
          </button>
        </div>

        <div className="TravelsDiv">
          <TravelsList />
        </div>
      </div>
    </div>
  );
}
