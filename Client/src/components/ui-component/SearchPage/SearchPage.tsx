import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getTravelsAction } from "../../../store/async-actions/getTravelsAction";
import { IState } from "../../../store/reducers/mainReducers";
import Search from "./Search";
export default function SearchPage(props: any) {
  const { travel } = props;
  const search = useSelector((state: IState) => state.searchVacations);
  const travels = useSelector((state: IState) => state.travels);
  useEffect(() => {
    getTravelsAction(search);
  }, [search]);
  return <div>{/* <Search travel={} /> */}</div>;
}
