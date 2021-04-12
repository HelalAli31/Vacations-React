import ACTIONS from "../actions";

export interface IState {
  travels: Array<any>;
  user: any;
}

const initialState: IState = { travels: [], user: {} };
function mainReducer(state = initialState, action: any) {
  switch (action.type) {
    case ACTIONS.travels.GET_TRAVELS: {
      console.log("mainReducer_travels", action.payload);
      return {
        ...state,
        travels: [...action.payload],
      };
    }
    case ACTIONS.user.GET_USERTYPE: {
      console.log("Payload-userType:", action.payload);
      return {
        ...state,
        user: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}

export default mainReducer;
