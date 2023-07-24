import React, { FC } from "react";
import Logo from "shared/Logo/Logo";
import Navigation from "shared/Navigation/Navigation";
import SearchDropdown from "./SearchDropdown";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import MenuBar from "shared/MenuBar/MenuBar";
import SwitchDarkMode from "shared/SwitchDarkMode/SwitchDarkMode";
import HeroSearchForm2MobileFactory from "components/HeroSearchForm2Mobile/HeroSearchForm2MobileFactory";
import { useAppSelector } from "../../store/store";
import AvatarDropdown from "./AvatarDropdown";
import { Link } from "react-router-dom";

export interface MainNav1Props {
  className?: string;
}

const MainNav1: FC<MainNav1Props> = ({ className = "" }) => {

  const isAuth = useAppSelector(store => store.isAuth)

  return (
    <div className={`nc-MainNav1 relative z-10 ${className}`}>
      <div className="px-4 lg:container py-4 lg:py-5 relative flex justify-between items-center">
        <div className="hidden md:flex justify-start flex-1 items-center space-x-4 sm:space-x-10">
          <Logo />
          {/* <Navigation /> */}
        </div>

        {/*<div className="lg:hidden flex-[3] max-w-lg !mx-auto md:px-3">*/}
        {/*  <HeroSearchForm2MobileFactory />*/}
        {/*</div>*/}

        <div className="hidden md:flex flex-shrink-0 items-center justify-end flex-1 lg:flex-none text-neutral-700 dark:text-neutral-100">
          <div className="hidden xl:flex items-center space-x-0.5">
            {
              !isAuth ?
                <Link
                  to="/login"
                  className="
                text-opacity-90
                group px-4 py-2 border border-neutral-300 hover:border-neutral-400 dark:border-neutral-700 rounded-full inline-flex items-center text-sm text-gray-700 dark:text-neutral-300 font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                >
                  Yeni elan
                </Link>
                :
                <ButtonPrimary href="/new/step/1" sizeClass="px-4 py-2 sm:px-5">Yeni elan</ButtonPrimary>
            }
            <SwitchDarkMode />
            {/* <SearchDropdown /> */}
            <div className="px-1" />
            {
              !isAuth ?
                <ButtonPrimary href="/login">Daxil ol</ButtonPrimary>
                : <AvatarDropdown />
            }
          </div>
          <div className="flex xl:hidden items-center">
            <SwitchDarkMode />
            <div className="px-0.5" />
            <MenuBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNav1;
