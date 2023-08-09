import {
  HeartIcon, HomeIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { PathName } from "routers/types";
// import MenuBar from "shared/MenuBar/MenuBar";
import { useAppDispatch, useAppSelector } from "store/store";
import { PlusIcon } from "@heroicons/react/24/solid";
// import { PlusCircleIcon, PlusSmallIcon } from "@heroicons/react/20/solid";
import { MoonIcon } from "@heroicons/react/24/solid";
import { SunIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { changeValue, setData } from "store/action";
import { apiUrl } from "config";

// let WIN_PREV_POSITION = window.pageYOffset;

interface NavItem {
  name: string;
  link?: PathName | string;
  icon: any;
  onClick?: Function
}

const FooterNav = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  //

  const location = useLocation();

  const isAuth = useAppSelector(store => store.isAuth)
  const { per_page } = useAppSelector(store => store.searchParams)
  const dispatch = useAppDispatch()

  const NAV: NavItem[] = [
    {
      name: "Əsas",
      link: "/",
      icon: HomeIcon,
      onClick: () => getData()
    },
    {
      name: "Dizayn",
      icon: <span
        onClick={_toogleDarkMode}
        className={``}
      >
        <span className="sr-only">Enable dark mode</span>
        {isDarkMode ? (
          <MoonIcon className="w-7 h-7" aria-hidden="true" />
        ) : (
          <SunIcon className="w-7 h-7" aria-hidden="true" />
        )}
      </span>
    },
    {
      name: "Yeni elan",
      // link: "/account-savelists",
      link: !isAuth ? "/login?redirect=/account-savelists" : "/new/step/1",
      icon: PlusIcon,
    },
    {
      name: "Seçilmişlər",
      // link: "/account-savelists",
      link: !isAuth ? "/login?redirect=/account-savelists" : "/account-savelists",
      icon: HeartIcon,
    },
    {
      name: !isAuth ? "Daxil ol" : "Profil",
      link: !isAuth ? "/login" : "/account",
      icon: UserCircleIcon,
    },
    // {
    //   name: "Menu",
    //   icon: MenuBar,
    // },
  ];

  // useEffect(() => {
  //   window.addEventListener("scroll", handleEvent);
  // }, []);

  // const handleEvent = () => {
  //   window.requestAnimationFrame(showHideHeaderMenu);
  // };

  // const showHideHeaderMenu = () => {
  //   let currentScrollPos = window.pageYOffset;
  //   if (!containerRef.current) return;

  //   // SHOW _ HIDE MAIN MENU
  //   if (currentScrollPos > WIN_PREV_POSITION) {
  //     if (
  //       isInViewport(containerRef.current) &&
  //       currentScrollPos - WIN_PREV_POSITION < 80
  //     ) {
  //       return;
  //     }

  //     containerRef.current.classList.add("FooterNav--hide");
  //   } else {
  //     if (
  //       !isInViewport(containerRef.current) &&
  //       WIN_PREV_POSITION - currentScrollPos < 80
  //     ) {
  //       return;
  //     }
  //     containerRef.current.classList.remove("FooterNav--hide");
  //   }

  //   WIN_PREV_POSITION = currentScrollPos;
  // };

  const toDark = () => {
    setIsDarkMode(true);
    const root = document.querySelector("html");
    if (!root) return;
    !root.classList.contains("dark") && root.classList.add("dark");
    localStorage.theme = "dark";
    document.body.style.backgroundColor = "#101827"
  };

  const toLight = () => {
    setIsDarkMode(false);
    const root = document.querySelector("html");
    if (!root) return;
    root.classList.remove("dark");
    localStorage.theme = "light";
    document.body.style.backgroundColor = "#fff"
  };

  function _toogleDarkMode() {
    if (localStorage.theme === "light") {
      toDark();
    } else {
      toLight();
    }
  }

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
    <div
      ref={containerRef}
      className="FooterNav p-2 bg-white dark:bg-neutral-800 fixed top-auto bottom-0 inset-x-0 z-30 border-t border-neutral-300 dark:border-neutral-700 transition-transform duration-300 ease-in-out"
    >
      <div className="grid grid-cols-5 w-full max-w-lg flex justify-around mx-auto text-sm text-center bottom-menu">
        {/* MENU */}
        {
          NAV.map((item, index) => {
            const active = location.pathname === item.link;
            return item.link ? (
              <Link
                key={index}
                to={item.link}
                // @ts-ignore
                onClick={item.onClick && item.onClick}
                className={`flex flex-col items-center justify-between text-neutral-500 dark:text-neutral-300/90 ${active ? "text-neutral-900 dark:text-neutral-100" : ""
                  }`}
              >
                <item.icon
                  className={`w-6 h-6 ${active ? "text-red-600" : ""}`}
                />
                <span className="text-[11px] leading-none mt-1">{item.name}</span>
              </Link>
            ) : (
              <div
                key={index}
                className={`flex flex-col items-center justify-between text-neutral-500 dark:text-neutral-300/90 ${active ? "text-neutral-900 dark:text-neutral-100" : ""
                  }`}
              >
                {/*<item.icon iconClassName="w-6 h-6" className={``} />*/}
                {item.icon}
                <span className="text-[11px] leading-none mt-1">{item.name}</span>
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

export default FooterNav;
