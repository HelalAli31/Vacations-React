import axios from "axios";

const BASE_URL = `http://localhost:5000`;
const API_URL = `${BASE_URL}/vacations/Followers`;
export default async function ChangeFollowStateService(
  user_id: string,
  travel_id: string,
  FollowState: boolean
) {
  console.log(user_id, travel_id);
  const { data } = await axios.post(
    `${API_URL}`,
    {
      user_id,
      travel_id,
      FollowState,
    },
    {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }
  );
  return data;
}
