import getTravelsService from "../services/getTravelsService";
import ACTIONS from "../actions";
import store from "../index";
const { dispatch } = store;

export async function getTravelsAction() {
  try {
    let LocalStorageUser: any = localStorage.getItem("user");
    const user = JSON.parse(LocalStorageUser);
    const result = await getTravelsService(user.id);
    dispatch({
      type: ACTIONS.travels.GET_TRAVELS,
      payload: result,
    });
  } catch (ex) {
    alert(ex);
  }
}
