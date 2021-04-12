import axios from "axios";

const BASE_URL = `http://localhost:5000`;
const API_URL = `${BASE_URL}/Admin/vacations`;
export default async function ClearTravelService(id: string) {
  try {
    const { data } = await axios.post(
      `${API_URL}/DeleteTravel`,
      { id },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    if (data) alert(data);
  } catch (error) {
    alert(error);
  }
}
