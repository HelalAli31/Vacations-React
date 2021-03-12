import axios from "axios";

const BASE_URL = `http://localhost:5000`;
const API_URL = `${BASE_URL}/vacations`;
export default async function ClearTravelService(id: string) {
  const token = localStorage.getItem("token");
  const { data } = await axios.post(
    `${API_URL}/DeleteTravel`,
    { id },
    {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }
  );
  console.log("Delete:", data);
  return data;
}
