
export const actionTypes = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  PAGE: "PAGE",
  PER_PAGE: "PER_PAGE",
  CHANGE_VALUE: "CHANGE_VALUE",
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
    localStorage.clear();
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


export const pageChange = (data) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.PAGE,
      data: data,
    });
  };
};

export const per_pageChange = (data) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.PER_PAGE,
      data: data,
    });
  };
};
