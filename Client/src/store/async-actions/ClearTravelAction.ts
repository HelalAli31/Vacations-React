import ClearTravelService from "../services/ClearTravelService";

export async function ClearTravelAction(travel_id: string) {
  try {
    const result = await ClearTravelService(travel_id);
  } catch (ex) {
    alert(ex);
  }
}
