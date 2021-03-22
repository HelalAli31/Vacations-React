import ACTIONS from "../actions";

export interface IState {
  travels: Array<any>;
  userType: string;
}

const initialState: IState = { travels: [], userType: "" };
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
      return {
        ...state,
        userType: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}

export default mainReducer;
