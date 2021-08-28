import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import TravelsList from "../../ui-component/TravelsList";
import Toolbar from "../../ui-component/Toolbar";
import ToolbarOptions from "../../ui-component/ToolbarOptions";
import moment from "moment";

import "../homepage/index.css";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import getPayload from "../../../store/services/Payload/getPayload";
import getIsAdmin from "../../../store/services/Payload/isAdmin";
import { Button } from "react-bootstrap";
import { Input, TextField } from "@material-ui/core";
import { isWhiteSpaceLike } from "typescript";
import { useState } from "react";
import axios from "axios";
import { ContactSupportOutlined } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { IState } from "../../../store/reducers/mainReducers";
import ACTIONS from "../../../store/actions";
import store from "../../../store/index";
const { dispatch } = store;

export default function HomePage() {
  const countriesAPI = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=682500PcukwQUtq1UDd6XimUfAmBA5HL&q=`;
  const history = useHistory();
  const [city, setCity] = useState("");
  const [startTrip, setStartTrip] = useState("");
  const [endTrip, setEndTrip] = useState("");
  const [openCountries, setOpenCountries] = useState(true);
  const [countriesMatch, setCountriesMatch] = useState([]);
  const search = useSelector((state: IState) => state.searchVacations);

  const userToken = getPayload();
  const user = userToken.data;

  const isAdmin = getIsAdmin();

  const searchCountries = async (e: any) => {
    const searchValue = e.target.value;

    if (!searchValue) return;
    const query = `${searchValue}`;

    const response = await axios.get(countriesAPI + query);
    setCountriesMatch(response.data);
  };
  const getDestination = (value: string) => {
    if (!value) return;
    const result = value.split(",")[0];
    setCity(result);
    setOpenCountries(false);
  };

  const countriesMatchesFilter = () => {
    if (!Array.isArray(countriesMatch)) return;
    return countriesMatch.length && openCountries && city ? (
      <div className="Countries2">
        {" "}
        {countriesMatch.map((c: any) => {
          return (
            <div>
              <span>
                {" "}
                <i className="fas fa-map-marker"></i>
              </span>{" "}
              <label
                className="Countries"
                onClick={(e: any) => {
                  getDestination(e.target.innerText);
                }}
              >
                {c.EnglishName} , {c.Country.EnglishName}
              </label>
            </div>
          );
        })}
      </div>
    ) : (
      <div></div>
    );
  };

  const infoValidation = () => {
    console.log(city, startTrip, endTrip);
    if (startTrip < endTrip) console.log("true");
    if (!city || !startTrip || !endTrip || startTrip > endTrip) return false;
    else return true;
  };

  const searchTrip: any = () => {
    const validation = infoValidation();
    console.log(validation);
    if (validation) {
      dispatch({
        type: ACTIONS.searchVacations,
        payload: { distination: city, from: startTrip, to: endTrip },
      });
    }
  };

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
    <div className="Main">
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
      <div className="container">
        <div className="row">
          <div className="col-4">
            <Toolbar />
          </div>
          <h4 className="col-7 mt-2 ToolbarOptions">
            <ToolbarOptions />
          </h4>
        </div>
      </div>
      <div className="TopSide">
        {" "}
        <div>
          <img
            className="Image"
            src="https://cdn.pixabay.com/photo/2017/08/05/18/53/mountain-2585069_1280.jpg"
          />
        </div>
        <div className="SearchBody">
          <h5>search for vacation packages</h5>
          <div className="row ">
            <div className="col-5 mt-2">
              <input
                className="Input1 "
                id="Input1"
                value={city}
                placeholder=" &#xf3c5; Destination.."
                onChange={(e) => {
                  setCity(e.target.value);
                  if (!openCountries) {
                    setCity("");
                    setOpenCountries(true);
                  }
                  searchCountries(e);
                }}
              />
              <div className=" pr-5"> {countriesMatchesFilter()}</div>
            </div>
            <div className=" col-3 ml-3 ">
              <div>
                Start At <i className="fas fa-plane-departure"></i>
              </div>
              <input
                className="Input2"
                type="date"
                min={moment(Date.now()).format("YYYY-MM-DD")}
                value={startTrip}
                placeholder=" &#xf5b0;    Start At"
                onChange={(e: any) => {
                  setStartTrip(e.target.value);
                }}
              />
            </div>
            <div className=" col-3 ">
              <div>
                End At <i className="fas fa-plane-arrival"></i>
              </div>
              <input
                className="Input2"
                min={moment(startTrip).format("YYYY-MM-DD")}
                type="date"
                placeholder=" &#xf5b0;    Start At"
                onChange={(e: any) => {
                  setEndTrip(e.target.value);
                }}
              />
            </div>
            <div className="mt-4">
              <button onClick={searchTrip}>
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="TravelsDiv">
        <TravelsList />
      </div>
    </div>
  );
}
