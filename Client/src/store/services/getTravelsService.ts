import axios from "axios";

const BASE_URL = `http://localhost:5000`;
const API_URL = `${BASE_URL}/vacations`;
export default async function getTravelsService(id: string) {
  console.log(localStorage.getItem("token"));
  const { data } = await axios.get(`${API_URL}?id=${id}`, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
  console.log(data);
  return data;
}
