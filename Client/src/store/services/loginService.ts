import axios from "axios";

import ACTIONS from "../actions";
import store from "../index";
const { dispatch } = store;

export async function LoginActionService(userName: string, password: string) {
  try {
    console.log("loginService");
    const BASE_URL = `http://localhost:5000`;
    const API_URL = `${BASE_URL}/auth/login`;
    const { data } = await axios.post(`${API_URL}`, { userName, password });
    console.log("======", data);
    dispatch({
      type: ACTIONS.user.GET_USERTYPE,
      payload: data.userType,
    });
    console.log("loginService");
    return data;
  } catch (er) {
    alert(er);
  }
}
