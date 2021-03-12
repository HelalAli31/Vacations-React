import React from "react";
import { useHistory } from "react-router-dom";
import TravelsList from "../../ui-component/TravelsList";

import "../homepage/index.css";
export default function HomePage() {
  let LocalStorageUser: any = localStorage.getItem("user");
  const user = JSON.parse(LocalStorageUser);
  const history = useHistory();

  const handleSignOut = () => {
    localStorage.clear();
    history.push("/");
  };

  if (!user) return <h1>NO travels to Show</h1>;
  return (
    <div className="mainDiv">
      <div>
        {" "}
        <h1 className="name">
          Hello~{user.firstName} {user.lastName}
        </h1>
        <button className="SignOutButton" type="button" onClick={handleSignOut}>
          Sign out
        </button>
      </div>
      <div className="TravelsDiv">
        <TravelsList />
      </div>
    </div>
  );
}
