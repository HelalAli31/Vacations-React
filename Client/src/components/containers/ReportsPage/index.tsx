import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { IState } from "../../../store/reducers/mainReducers";
import { getTravelsAction } from "../../../store/async-actions/getTravelsAction";
import HomeIcon from "@material-ui/icons/Home";
import { useHistory } from "react-router";
export default function ReportsPage() {
  const history = useHistory();
  const travels = useSelector((state: IState) => state.travels);
  useEffect(() => {
    console.log(travels);
    getTravelsAction();
  }, []);

  const data: any = {
    datasets: [],
  };

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  travels.map((travel) => {
    let dataObj = {
      label: travel.WhereTo,
      fill: false,
      borderColor: `rgb(${getRandomInt(200)}, ${getRandomInt(
        200
      )}, ${getRandomInt(200)})`,
      borderWidth: 5,
      pointRadius: 2,
      data: [travel.Followers],
    };
    data.datasets.push(dataObj);
  });

  var options = {
    legend: {
      position: "bottom",

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
    },
  };

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
