
export const actionTypes = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
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
    // localStorage.removeItem("token");
    localStorage.clear();
    dispatch({
      type: actionTypes.LOGOUT,
    });
  };
};






