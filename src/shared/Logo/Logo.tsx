import React from "react";
import { Link } from "react-router-dom";
import LogoSvgLight from "./LogoSvgLight";
import LogoSvg from "./LogoSvg";
import { changeValue, setData } from "store/action";
import { useAppDispatch, useAppSelector } from "store/store";
import axios from "axios";
import { apiUrl } from "config";

export interface LogoProps {
  img?: string;
  imgLight?: string;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({
  className = "w-24",
}) => {

  const dispatch = useAppDispatch()
  const { per_page } = useAppSelector(store => store.searchParams)

  const getData = () => {
    dispatch(setData("preLoader", true))
    axios.get(apiUrl + "vendor/announcement", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
      },
      params: {
        "page": 1,
        "per_page": per_page,
        "filter[city_id]": "",
        "filter[price_from]": "",
        "filter[price_to]": "",
      }
    })
      .then(res => {
        dispatch(changeValue("data", "list", res.data.data.data))
        dispatch(changeValue("data", "total_data", res.data.data.total))
        dispatch(setData("searchParams", {
          page: 1,
          per_page: 12,
          city: null,
          price_from: 0,
          price_to: 5000
        }))
      })
      .finally(() => {
        dispatch(setData("preLoader", false))
      })
  }

  return (
    <Link
      to="/"
      className={`ttnc-logo inline-block text-primary-6000 focus:outline-none focus:ring-0 ${className}`}
      onClick={getData}
    >
      <div className="hidden dark:block">
        <LogoSvgLight />
      </div>
      <div className="block dark:hidden">
        <LogoSvg />
      </div>
    </Link>
  );
};

export default Logo;
