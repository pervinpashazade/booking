import { DataTypes, ICategoryProps, ICityProps, IPaginationProps, IStayProps, IUserProps } from "data/types";
import { actionTypes } from "./action";

interface initialStateProps {
  data: {
    type: DataTypes,
    list: Array<IStayProps | IStayProps>
  }
  isAuth: boolean
  user: IUserProps
  room: IStayProps,
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
    list: []
  },
  isAuth: !!localStorage.getItem("access_token"),
  user: getItemFromLocaleStorage("user"),
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
  searchParams: {
    city: null,
    price_from: 10,
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

    case actionTypes.SET_DATA:
      return Object.assign({}, state, {
        [action.section]: action.value,
      });

    default:
      return state;
  }
};
