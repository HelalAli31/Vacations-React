import ChangeFollowStateService from "../services/ChangeFollowStateService";
import EditTravelService from "../services/EditTravelService";

export async function EditTravelAction(EditedToObj: any, id: number) {
  try {
    const result = await EditTravelService(EditedToObj, id);
  } catch (ex) {
    alert(ex);
  }
}
