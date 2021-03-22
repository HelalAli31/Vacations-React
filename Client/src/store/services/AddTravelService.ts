import axios from "axios";

const BASE_URL = `http://localhost:5000`;
const API_URL = `${BASE_URL}/Admin/vacations`;
export default async function AddTravelService(vacation: any) {
  const data = await axios.post(`${API_URL}/AddVacations`, vacation, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
  if (data.data.message) alert(`error:${data.data.message}`);
  else alert(data.data);
  return data.data;
}
