import { DataTypes, ICategoryProps, ICityProps, IPaginationProps, IStayProps, IUserProps } from "data/types";
import { actionTypes } from "./action";

interface initialStateProps {
  data: {
    type: DataTypes,
    list: Array<IStayProps | IStayProps>
    total_data: number
  }
  isAuth: boolean
  user: IUserProps | null
  room: IStayProps,
  room_errors: { [key: string]: string }
  searchParams: {
    city: any,
    price_from: any,
    price_to: any,
    page: string,
    per_page: string
  },
  preLoader: boolean,
  staticData: {
    cityList: Array<ICityProps>,
    categoryList: Array<ICategoryProps>
  }
  account: {
    active_items: {
      data: Array<IStayProps>,
      pagination: IPaginationProps
    },
    wishlist: {
      data: Array<IStayProps>,
      pagination: IPaginationProps
    }
  },
}

function getItemFromLocaleStorage(key: string) {
  const userStr = localStorage.getItem(key)!;
  return JSON.parse(userStr);
}

export const initialState: initialStateProps = {
  data: {
    type: DataTypes.room,
    list: [],
    total_data: 0,
  },
  // @ts-ignore
  isAuth: !!localStorage.getItem("access_token") && JSON.parse(localStorage.getItem("user"))?.phone_verified,
  // user: getItemFromLocaleStorage("user"),
  user: null,
  account: {
    active_items: {
      data: [],
      pagination: {
        page: 1,
        per_page: 10,
        total: 0,
      }
    },
    wishlist: {
      data: [],
      pagination: {
        page: 1,
        per_page: 10,
        total: 0,
      }
    }
  },
  // @ts-ignore
  room: {},
  room_errors: {},
  searchParams: {
    city: null,
    price_from: 0,
    price_to: 5000,
    page: "1",
    per_page: "12"
  },
  preLoader: false,
  staticData: {
    cityList: [],
    categoryList: [],
  }
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return Object.assign({}, state, {
        isAuth: action.data.phone_verified,
        user: action.data,
        account: {
          active_items: {
            data: [],
            pagination: {
              page: 1,
              per_page: 10,
              total: 0,
            }
          },
          wishlist: {
            data: [],
            pagination: {
              page: 1,
              per_page: 10,
              total: 0,
            }
          }
        },
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

    case actionTypes.SET_DATA:
      return Object.assign({}, state, {
        [action.section]: action.value,
      });

    default:
      return state;
  }
};
