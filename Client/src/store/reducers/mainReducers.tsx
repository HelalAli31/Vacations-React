import ACTIONS from "../actions";

export interface IState {
  travels: Array<any>;
}

const initialState: IState = { travels: [] };
function mainReducer(state = initialState, action: any) {
  switch (action.type) {
    case ACTIONS.travels.GET_TRAVELS: {
      console.log("asd", action.payload);
      return {
        ...state,
        travels: [...action.payload],
      };
    }

    default: {
      return state;
    }
  }
}

export default mainReducer;
