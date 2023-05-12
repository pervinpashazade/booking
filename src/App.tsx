import axios from "axios";
import { Loader } from "components/Loader/Loader";
import { apiUrl } from "config";
import React, { useEffect } from "react";
import MyRouter from "routers/index";
import { changeValue } from "store/action";
import { useAppDispatch, useAppSelector } from "store/store";

function App() {

  const dispatch = useAppDispatch();

  useEffect(() => {
    getSharedDataList()
  }, [])

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
    <div className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
      <Loader />
      <MyRouter />
    </div>
  );
}

export default App;
