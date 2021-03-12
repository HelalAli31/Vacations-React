import ChangeFollowStateService from "../services/ChangeFollowStateService";
import { getTravelsAction } from "./getTravelsAction";

export async function ChangeFollowStateAction(
  user_id: string,
  travel_id: string,
  FollowState:boolean
) {
  try {
    const result = await ChangeFollowStateService(user_id, travel_id,FollowState);
  } catch (ex) {
    alert(ex);
  }
}
