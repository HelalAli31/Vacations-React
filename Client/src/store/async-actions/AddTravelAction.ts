import AddTravelService from "../services/AddTravelService";

export async function AddTravelAction(vacation: any) {
  try {
    const result = await AddTravelService(vacation);
  } catch (ex) {
    alert(ex);
  }
}
