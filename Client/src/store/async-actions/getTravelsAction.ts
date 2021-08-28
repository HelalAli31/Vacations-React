import getTravelsService from "../services/getTravelsService";
import ACTIONS from "../actions";
import store from "../index";
import getPayload from "../services/Payload/getPayload";
const { dispatch } = store;

export async function getTravelsAction(search?: any) {
  try {
    const payload = getPayload();
    const user = payload.data;
    const result = await getTravelsService(user.id,search);
    // const NDataa: Array<any> = [];
    // console.log(data);
    // Object.values(data).map((travel: any) => {
    //   if (travel.followingState) result.push(travel);
    //   else {
    //     NDataa.push(travel);
    //   }
    // });

    // const result = [...data, ...NDataa];
    dispatch({
      type: ACTIONS.travels.GET_TRAVELS,
      payload: result,
    });
  } catch (ex) {
    alert(ex);
  }
}
