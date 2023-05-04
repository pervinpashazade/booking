import { actionTypes } from "./action";

export const initialState = {
  isAuth: !!localStorage.getItem("access_token"),
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return Object.assign({}, state, {
        isAuth: true,
        user: action.data,
      });

    case actionTypes.LOGOUT:
      return Object.assign({}, state, {
        isAuth: false,
        user: null,
      });
    default:
      return state;
  }
};
