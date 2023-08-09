import React, { useEffect } from "react";
import { FC } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppSelector } from "store/store";

export interface CommonLayoutProps {
  children?: React.ReactNode;
}

const CommonLayout: FC<CommonLayoutProps> = ({ children }) => {

  const isAuth = useAppSelector(store => store.isAuth)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuth) {
      navigate("/")
    }
  }, [])

  return (
    <div className="nc-CommonLayoutProps bg-neutral-50 dark:bg-neutral-900">
      <div className="border-b border-neutral-200 dark:border-neutral-700 pt-0 bg-white dark:bg-neutral-800">
        <div className="container">
          <div className="flex space-x-8 md:space-x-14 overflow-x-auto hiddenScrollbar">
            <NavLink
              to="/account"
              className={({ isActive }) =>
                `block py-5 md:py-8 border-b-2 flex-shrink-0 ${!isActive ? "border-transparent" : "border-primary-500"
                }`
              }
            >
              Profil
            </NavLink>
            <NavLink
              to="/account-items"
              className={({ isActive }) =>
                `block py-5 md:py-8 border-b-2 flex-shrink-0 ${!isActive ? "border-transparent" : "border-primary-500"
                }`
              }
            >
              Elanlarım
            </NavLink>
            <NavLink
              to="/account-savelists"
              className={({ isActive }) =>
                `block py-5 md:py-8 border-b-2 flex-shrink-0 ${!isActive ? "border-transparent" : "border-primary-500"
                }`
              }
            >
              Bəyəndiklərim
            </NavLink>
            {/* <NavLink
              to="/account-password"
              className={({ isActive }) =>
                `block py-5 md:py-8 border-b-2 flex-shrink-0 ${!isActive ? "border-transparent" : "border-primary-500"
                }`
              }
            >
              Şifrəni dəyiş
            </NavLink> */}
          </div>
        </div>
      </div>
      <div className="container pt-5 sm:pt-10 pb-20 lg:pb-32">{children}</div>
    </div>
  );
};

export default CommonLayout;
