import { Loader } from "components/Loader/Loader";
import React from "react";
import MyRouter from "routers/index";
import { useAppSelector } from "store/store";

function App() {


  return (
    <div className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
      <Loader />
      <MyRouter />
    </div>
  );
}

export default App;
