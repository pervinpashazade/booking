import { FC, useEffect, useState } from "react";
import Label from "components/Label/Label";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import CommonLayout from "./CommonLayout";
import { Helmet } from "react-helmet";
import { apiUrl, appName } from "config";
import { useNavigate } from "react-router-dom";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { logout } from "../../store/action";
import { useAppDispatch, useAppSelector } from "../../store/store";
import axios from "axios";
import { toast } from "react-toastify";

export interface AccountPageProps {
  className?: string;
}

const AccountPage: FC<AccountPageProps> = ({ className = "" }) => {

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const user = useAppSelector(store => store.user)

  const [oldPassword, setOldPassword] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [validationErrors, setValidationErrors] = useState({
    oldPassword: "",
    password: "",
    confirmPassword: "",
    response: "",
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)

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

  const handleChangePassword = () => {
    const errors = {
      oldPassword: "",
      password: "",
      confirmPassword: "",
      response: "",
    }
    if (!oldPassword) {
      errors.oldPassword = "Hazırki şifrə daxil edilməyib"
    }
    if (!password) {
      errors.password = "Şifrə daxil edilməyib"
    }
    if (!confirmPassword) {
      errors.confirmPassword = "Şifrə təsdiqi daxil edilməyib"
    }
    if (password && confirmPassword && password !== confirmPassword) {
      errors.confirmPassword = "Şifrə təsdiqi eyni deyil"
    }

    setValidationErrors(errors)

    if (Object.values(errors).filter(x => x).length) return
    setIsLoading(true)
    axios.post(`${apiUrl}user/auth/change-password`, {
      old_password: oldPassword,
      password,
      password_confirmation: confirmPassword,
    }).then(res => {
      toast.success(res.data.message)
      setOldPassword("")
      setPassword("")
      setConfirmPassword("")
    }).catch(err => {
      setValidationErrors(prevState => ({ ...prevState, response: err.response?.data?.message }))
    }).finally(() => setIsLoading(false))
  }

  return (
    <div className={`nc-AccountPage ${className}`} data-nc-id="AccountPage">
      <Helmet>
        <title>Profil | {appName}</title>
      </Helmet>
      <CommonLayout>
        <div className="space-y-6 sm:space-y-8">
          {/* HEADING */}
          <div className="grid-container grid grid-cols-5 gap-5">
            <div className="item1 col-span-4">
              <div className="flex items-center h-full">
                <h2 className="text-3xl font-semibold">Profil</h2>
              </div>
            </div>
          </div>

          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className="flex flex-col md:flex-row">
            {/* <div className="flex-shrink-0 flex items-start">
              <div className="relative rounded-full overflow-hidden flex">
                <Avatar sizeClass="w-32 h-32" />
                <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-neutral-50 cursor-pointer">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.5 5H7.5C6.83696 5 6.20107 5.26339 5.73223 5.73223C5.26339 6.20107 5 6.83696 5 7.5V20M5 20V22.5C5 23.163 5.26339 23.7989 5.73223 24.2678C6.20107 24.7366 6.83696 25 7.5 25H22.5C23.163 25 23.7989 24.7366 24.2678 24.2678C24.7366 23.7989 25 23.163 25 22.5V17.5M5 20L10.7325 14.2675C11.2013 13.7988 11.8371 13.5355 12.5 13.5355C13.1629 13.5355 13.7987 13.7988 14.2675 14.2675L17.5 17.5M25 12.5V17.5M25 17.5L23.0175 15.5175C22.5487 15.0488 21.9129 14.7855 21.25 14.7855C20.5871 14.7855 19.9513 15.0488 19.4825 15.5175L17.5 17.5M17.5 17.5L20 20M22.5 5H27.5M25 2.5V7.5M17.5 10H17.5125"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="mt-1 text-xs">Change Image</span>
                </div>
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div> */}
            <div className="flex-grow mt-0 lg:mt-8 md:mt-0 md:pl-16 max-w-3xl space-y-6">
              <div>
                <Label>Ad</Label>
                <Input readOnly className="mt-1.5" defaultValue={user?.name} />
              </div>
              {/*<div>*/}
              {/*  <Label>Soyad</Label>*/}
              {/*  <Input className="mt-1.5" defaultValue={user?.surname} />*/}
              {/*</div>*/}
              {/* ---- */}
              {/* ---- */}
              <div>
                <Label>Telefon</Label>
                <Input readOnly={true} className="mt-1.5" defaultValue={user?.phone} />
              </div>
              {/* ---- */}
              {/* ---- */}
              {/*<div>*/}
              {/*  <Label>About you</Label>*/}
              {/*  <Textarea className="mt-1.5" defaultValue="..." />*/}
              {/*</div>*/}

              {/* <div className="pt-2">
                <ButtonPrimary>Update info</ButtonPrimary>
              </div> */}

              <div className="space-y-6 sm:space-y-8">
                {/* HEADING */}
                {/* <h2 className="text-3xl font-semibold">Şifrəni dəyiş</h2> */}
                <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
                <div className=" space-y-6">
                  <div>
                    <Label>Hazırki şifrə</Label>
                    <Input
                      type="password"
                      invalid={validationErrors.oldPassword ? true : false}
                      className="mt-1.5"
                      value={oldPassword}
                      onChange={e => setOldPassword(e.target.value)}
                    />
                    {
                      validationErrors.oldPassword &&
                      <div className="flex items-center rounded-xl text-red-600 text-sm font-bold px-1 py-1 mt-2" role="alert">
                        <div className="py-1">
                          <svg className="fill-current h-6 w-6 mr-4" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20">
                            <path
                              d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                          </svg>
                        </div>
                        <p>{validationErrors.oldPassword}</p>
                      </div>
                    }
                  </div>
                  <div>
                    <Label>Yeni şifrə</Label>
                    <Input
                      type="password"
                      invalid={validationErrors.password ? true : false}
                      className="mt-1.5"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                    {
                      validationErrors.password &&
                      <div className="flex items-center rounded-xl text-red-600 text-sm font-bold px-1 py-1 mt-2" role="alert">
                        <div className="py-1">
                          <svg className="fill-current h-6 w-6 mr-4" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20">
                            <path
                              d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                          </svg>
                        </div>
                        <p>{validationErrors.password}</p>
                      </div>
                    }
                  </div>
                  <div>
                    <Label>Yeni şifrə yenidən</Label>
                    <Input
                      type="password"
                      invalid={validationErrors.confirmPassword ? true : false}
                      className="mt-1.5"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                    />
                    {
                      validationErrors.confirmPassword &&
                      <div className="flex items-center rounded-xl text-red-600 text-sm font-bold px-1 py-1 mt-2" role="alert">
                        <div className="py-1">
                          <svg className="fill-current h-6 w-6 mr-4" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20">
                            <path
                              d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                          </svg>
                        </div>
                        <p>{validationErrors.confirmPassword}</p>
                      </div>
                    }
                  </div>
                  {
                    validationErrors.response &&
                    <div className="flex items-center rounded-xl text-red-600 text-sm font-bold px-1 py-1 mt-2" role="alert">
                      <div className="py-1">
                        <svg className="fill-current h-6 w-6 mr-4" xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20">
                          <path
                            d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                        </svg>
                      </div>
                      <p>{validationErrors.response}</p>
                    </div>
                  }
                  <div className="pt-2">
                    <ButtonPrimary
                      loading={isLoading}
                      onClick={handleChangePassword}
                    >
                      Şifrəni dəyiş
                    </ButtonPrimary>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                {solutionsFoot.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    onClick={item.onClick}
                    style={{ border: "1px solid white" }}
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
            </div>
          </div>
        </div>
      </CommonLayout>
    </div>
  );
};

export default AccountPage;
