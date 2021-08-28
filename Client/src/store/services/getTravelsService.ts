import axios from "axios";

const BASE_URL = `http://localhost:5000`;
const API_URL = `${BASE_URL}/vacations`;
export default async function getTravelsService(id: string, search?: any) {
  const MainURl = `${API_URL}?id=${id}`;
  // const SearchURl = `${API_URL}/searchVacation`;
  // const URL = search.distination ? SearchURl : MainURl;
  const { data } = await axios.get(MainURl, {
    headers: {
      Authorization: localStorage.getItem("token"),
      distination: search?.distination,
      from: search?.from,
      to: search?.to,
    },
  });
  console.log(data);
  return data;
}
