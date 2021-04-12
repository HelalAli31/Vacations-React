import axios from "axios";
import { IUserDetails } from "../../components/containers/register";

const BASE_URL = `http://localhost:5000`;
const API_URL = `${BASE_URL}/auth/register`;
export default async function registerService(userDetails: IUserDetails) {
  const { data } = await axios.post(`${API_URL}`, userDetails);
  return data.message;
}
