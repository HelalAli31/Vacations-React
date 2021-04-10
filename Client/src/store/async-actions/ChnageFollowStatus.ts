import ChangeFollowStateService from "../services/ChangeFollowStateService";
import { getTravelsAction } from "./getTravelsAction";

export async function ChangeFollowStateAction(
  user_id: string,
  travel_id: string
) {
  try {
    const result = await ChangeFollowStateService(user_id, travel_id);
  } catch (ex) {
    alert(ex);
  }
}
