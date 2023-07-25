import {FC, useEffect, useState} from "react";
import Label from "components/Label/Label";
import Avatar from "shared/Avatar/Avatar";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import Select from "shared/Select/Select";
import Textarea from "shared/Textarea/Textarea";
import CommonLayout from "./CommonLayout";
import { Helmet } from "react-helmet";
import {apiUrl, appName} from "config";
import {IUserProps} from "../../data/types";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {ArrowRightOnRectangleIcon} from "@heroicons/react/24/outline";
import {logout} from "../../store/action";
import { useAppDispatch } from "../../store/store";


export interface AccountPageProps {
  className?: string;
}

const AccountPage: FC<AccountPageProps> = ({ className = "" }) => {

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [list, setList] = useState<IUserProps>({})

  useEffect(() => {
    axios.get(apiUrl + "user/auth/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
      },
    }).then(res => {
      if (res.data.success) {
        setList(res.data.data)
      }
    }).catch(err => {
      console.log("account vendor/announcement error", err);
      navigate("/")
    }).finally(() => {

    })
  }, [])

  const solutionsFoot = [
    // {
    //   name: "Help",
    //   href: "##",
    //   icon: LifebuoyIcon,
    // },
    {
      name: "Çıxış",
      href: "##",
      icon: ArrowRightOnRectangleIcon,
      onClick: (e: any) => {
        e.preventDefault()
        dispatch(logout())
        navigate('/')
      }
    },
  ];

  return (
    <div className={`nc-AccountPage ${className}`} data-nc-id="AccountPage">
      <Helmet>
        <title>Profil | {appName}</title>
      </Helmet>
      <CommonLayout>
        <div className="space-y-6 sm:space-y-8">
          {/* HEADING */}
          <h2 className="text-3xl font-semibold">Profil</h2>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className="flex flex-col md:flex-row">
            {/*<div className="flex-shrink-0 flex items-start">*/}
            {/*  <div className="relative rounded-full overflow-hidden flex">*/}
            {/*    <Avatar sizeClass="w-32 h-32" />*/}
            {/*    <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-neutral-50 cursor-pointer">*/}
            {/*      <svg*/}
            {/*        width="30"*/}
            {/*        height="30"*/}
            {/*        viewBox="0 0 30 30"*/}
            {/*        fill="none"*/}
            {/*        xmlns="http://www.w3.org/2000/svg"*/}
            {/*      >*/}
            {/*        <path*/}
            {/*          d="M17.5 5H7.5C6.83696 5 6.20107 5.26339 5.73223 5.73223C5.26339 6.20107 5 6.83696 5 7.5V20M5 20V22.5C5 23.163 5.26339 23.7989 5.73223 24.2678C6.20107 24.7366 6.83696 25 7.5 25H22.5C23.163 25 23.7989 24.7366 24.2678 24.2678C24.7366 23.7989 25 23.163 25 22.5V17.5M5 20L10.7325 14.2675C11.2013 13.7988 11.8371 13.5355 12.5 13.5355C13.1629 13.5355 13.7987 13.7988 14.2675 14.2675L17.5 17.5M25 12.5V17.5M25 17.5L23.0175 15.5175C22.5487 15.0488 21.9129 14.7855 21.25 14.7855C20.5871 14.7855 19.9513 15.0488 19.4825 15.5175L17.5 17.5M17.5 17.5L20 20M22.5 5H27.5M25 2.5V7.5M17.5 10H17.5125"*/}
            {/*          stroke="currentColor"*/}
            {/*          strokeWidth={1.5}*/}
            {/*          strokeLinecap="round"*/}
            {/*          strokeLinejoin="round"*/}
            {/*        />*/}
            {/*      </svg>*/}

            {/*      <span className="mt-1 text-xs">Change Image</span>*/}
            {/*    </div>*/}
            {/*    <input*/}
            {/*      type="file"*/}
            {/*      className="absolute inset-0 opacity-0 cursor-pointer"*/}
            {/*    />*/}
            {/*  </div>*/}
            {/*</div>*/}
            <div className="flex-grow mt-0 lg:mt-8 md:mt-0 md:pl-16 max-w-3xl space-y-6">
              <div>
                <Label>Ad</Label>
                <Input className="mt-1.5" defaultValue={list.name} />
              </div>
              <div>
                <Label>Soyad</Label>
                <Input className="mt-1.5" defaultValue={list.surname} />
              </div>
              {/* ---- */}
              {/* ---- */}
              <div>
                <Label>Email</Label>
                <Input className="mt-1.5" defaultValue={list.email} />
              </div>
              {/* ---- */}
              {/* ---- */}
              {/*<div>*/}
              {/*  <Label>About you</Label>*/}
              {/*  <Textarea className="mt-1.5" defaultValue="..." />*/}
              {/*</div>*/}
              <div className="flex justify-center">
                {solutionsFoot.map((item, index) => (
                    <a
                        key={index}
                        href={item.href}
                        onClick={item.onClick}
                        style={{border:"1px solid white"}}
                        className="flex items-center px-8 py-3 -m-3 transition duration-150 mt-5 ease-in-out rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    >
                      <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                        <item.icon aria-hidden="true" className="w-6 h-6" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium ">{item.name}</p>
                      </div>
                    </a>
                ))}
              </div>
              {/* <div className="pt-2">
                <ButtonPrimary>Update info</ButtonPrimary>
              </div> */}
            </div>
          </div>
        </div>
      </CommonLayout>
    </div>
  );
};

export default AccountPage;
