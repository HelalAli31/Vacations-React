import { IUserDetails } from "../../components/containers/register";
import registerService from "../services/registerService";

export async function registerUser(userDetails: IUserDetails) {
  try {
    const result = await registerService(userDetails);
    console.log("result", result);
    alert(result);
  } catch (ex) {
    alert(ex);
  }
}
