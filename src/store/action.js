
export const actionTypes = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  CHANGE_VALUE: "CHANGE_VALUE",
  SET_DATA: "SET_DATA",
};

export const parseJwt = (jwttoken) => {
  var base64Url = jwttoken.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};

export const login = (data) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.LOGIN,
      data: data,
    });
  };
};

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("user")
    dispatch({
      type: actionTypes.LOGOUT,
    });
  };
};

export const changeValue = (section, field, value, subKey) => {
  // console.log("action section", section);
  // console.log("action field", field);
  // console.log("action value", value);
  return (dispatch) => {
    dispatch({
      type: actionTypes.CHANGE_VALUE,
      section: section,
      field: field,
      value: value,
      subKey: subKey
    });
  }
}

export const setData = (section, value) => {

  // console.log("section", section);
  // console.log("value", value);

  return (dispatch) => {
    dispatch({
      type: actionTypes.SET_DATA,
      section,
      value,
    });
  };
};
