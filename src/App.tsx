import axios from "axios";
import { Loader } from "components/Loader/Loader";
import { apiUrl } from "config";
import React, { useEffect } from "react";
import MyRouter from "routers/index";
import { changeValue, login, logout } from "store/action";
import { useAppDispatch, useAppSelector } from "store/store";

function App() {

  const dispatch = useAppDispatch();
  // const BigNumber = require('bignumber.js');
  //
  // const num1 = new BigNumber('1634139415244749444');
  // const num2 = new BigNumber('000');
  //
  // const result = num1.plus(num2);
  //
  // console.log("wwww",result.c[1]);

  console.log("")
  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      axios.get(apiUrl + "user/auth/me").then(res => {
        if (res.data.success) {
          // console.log("meee", res.data.data);
          localStorage.setItem('user', JSON.stringify(res.data.data))
          dispatch(login(res.data.data))
        }
      }).catch(err => {
        // dispatch(logout())
      })
    }
    getSharedDataList()
  }, [])

  // console.log("data")
  const getSharedDataList = () => {
    axios.get(apiUrl + 'shared/cities').then(res => {
      if (res.data.success) {
        dispatch(changeValue("staticData", "cityList", res.data.data))
      }
    }).catch(err => {
      console.log("shared/cities err", err);
    })
    axios.get(apiUrl + 'shared/categories').then(res => {
      if (res.data.success) {
        dispatch(changeValue("staticData", "categoryList", res.data.data))
      }
    }).catch(err => {
      console.log("shared/categories err", err);
    })
  }

  return (
    <div className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200 min-h-screen">
      <Loader />
      <MyRouter />
    </div>
  );
}

export default App;
