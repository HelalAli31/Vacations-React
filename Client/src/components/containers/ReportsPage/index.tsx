import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { IState } from "../../../store/reducers/mainReducers";
import { getTravelsAction } from "../../../store/async-actions/getTravelsAction";
import HomeIcon from "@material-ui/icons/Home";
import { useHistory } from "react-router";
import { rgbToHex } from "@material-ui/core";
import getIsAdmin from "../../../store/services/Payload/isAdmin";
export default function ReportsPage() {
  const history = useHistory();
  const travels = useSelector((state: IState) => state.travels);

  const isAdmin = getIsAdmin();
  useEffect(() => {
    getTravelsAction();
  }, []);

  const data: any = {
    datasets: [],
  };

  // function getRandomInt(max: number) {
  //   return Math.floor(Math.random() * Math.floor(max));
  // }
  travels.map((travel) => {
    if (travel.Followers > 0) {
      let dataObj = {
        label: travel.WhereTo,
        fill: false,
        borderColor: "grey",
        backgroundColor: "grey",
        borderWidth: 5,
        pointRadius: 2,
        data: [travel.Followers],
      };
      data.datasets.push(dataObj);
    }
  });

  var options = {
    legend: {
      position: "bottom",
      barsOffset: 0,
      offsetY: 25,

      labels: {
        boxWidth: 20,
      },
    },

    scales: {
      xAxes: [
        {
          ticks: { display: true },
        },
      ],
      yAxes: [
        {
          ticks: { min: 0, stepSize: 1 },
        },
      ],
    },
  };
  if (!isAdmin) return <h1>CANT SHOW THIS PAGE BEFORE REGISTERING</h1>;

  return (
    <div className="container">
      <button
        className="HomeButtonbtn"
        onClick={() => {
          history.push("/home");
        }}
      >
        <h1 style={{ marginRight: "50px" }}>
          {" "}
          <HomeIcon />
        </h1>
      </button>
      <Bar data={data} options={options} />
    </div>
  );
}
