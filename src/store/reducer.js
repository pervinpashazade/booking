import { actionTypes } from "./action";

export const initialState = {
  isAuth: !!localStorage.getItem("access_token"),
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
  room: {}
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

    case actionTypes.CHANGE_VALUE:

      if (action.value !== undefined) {

        if (!action.subKey) {
          return Object.assign({}, state, {
            [action.section]: {
              ...state[action.section],
              [action.field]: action.value,
            }
          })
        } else {
          return Object.assign({}, state, {
            [action.section]: {
              ...state[action.section],
              [action.field]: {
                ...state[action.section][action.field],
                [action.subKey]: action.value,
              }
            }
          })
        }

      } else {
        return Object.assign({}, state, {
          [action.section]: {
            ...state[action.section],
            update: Date.now()
          }
        })
      }

    default:
      return state;
  }
};
