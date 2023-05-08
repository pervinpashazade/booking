// import { actionTypes } from "./action";

// export const initialState = {
//   isAuth: !!localStorage.getItem("access_token"),
//   user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
//   room: {}
// };

// export default (state = initialState, action) => {
//   switch (action.type) {
//     case actionTypes.LOGIN:
//       return Object.assign({}, state, {
//         isAuth: true,
//         user: action.data,
//       });

//     case actionTypes.LOGOUT:
//       return Object.assign({}, state, {
//         isAuth: false,
//         user: null,
//       });

//     case actionTypes.CHANGE_VALUE:

//       if (action.value !== undefined) {

//         if (!action.subKey) {
//           return Object.assign({}, state, {
//             [action.section]: {
//               ...state[action.section],
//               [action.field]: action.value,
//             }
//           })
//         } else {
//           return Object.assign({}, state, {
//             [action.section]: {
//               ...state[action.section],
//               [action.field]: {
//                 ...state[action.section][action.field],
//                 [action.subKey]: action.value,
//               }
//             }
//           })
//         }

//       } else {
//         return Object.assign({}, state, {
//           [action.section]: {
//             ...state[action.section],
//             update: Date.now()
//           }
//         })
//       }

//     default:
//       return state;
//   }
// };

import { IStayProps, IUserProps } from "data/types";
import { actionTypes } from "./action";

interface initialStateProps {
  isAuth: boolean
  user: IUserProps
  room: IStayProps
}

function getItemFromLocaleStorage(key: string) {
  const userStr = localStorage.getItem(key)!;
  return JSON.parse(userStr);
}

export const initialState: initialStateProps = {
  isAuth: !!localStorage.getItem("access_token"),
  user: getItemFromLocaleStorage("user"),
  // @ts-ignore
  room: {},
  page: 1,
  per_page: 16,
};

export default (state = initialState, action: any) => {
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
              // @ts-ignore
              ...state[action.section],
              [action.field]: action.value,
            }
          })
        } else {
          return Object.assign({}, state, {
            [action.section]: {
              // @ts-ignore
              ...state[action.section],
              [action.field]: {
                // @ts-ignore
                ...state[action.section][action.field],
                [action.subKey]: action.value,
              }
            }
          })
        }

      } else {
        return Object.assign({}, state, {
          [action.section]: {
            // @ts-ignore
            ...state[action.section],
            update: Date.now()
          }
        })
      }

    case actionTypes.PAGE:
      return Object.assign({}, state, {
        page: action.data,
      });
    case actionTypes.PER_PAGE:
      return Object.assign({}, state, {
        per_page: action.data,
      });

    default:
      return state;
  }
};
