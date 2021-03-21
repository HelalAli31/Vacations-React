import axios from "axios";

const BASE_URL = `http://localhost:5000`;
const API_URL = `${BASE_URL}/Admin/vacations`;
export default async function EditTravelService(EditedToObj: any, id: number) {
  const token = localStorage.getItem("token");

  const { data } = await axios.post(
    `${API_URL}/EditTravel?id=${id}`,
    EditedToObj,
    {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }
  );
  alert(data);
  return data;
}
