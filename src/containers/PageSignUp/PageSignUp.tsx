import React, { FC, FormEvent, useState } from "react";
import facebookSvg from "images/Facebook.svg";
import twitterSvg from "images/Twitter.svg";
import googleSvg from "images/Google.svg";
import { Helmet } from "react-helmet";
import Input from "shared/Input/Input";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { Link, useNavigate } from "react-router-dom";
import { apiUrl, appName } from "config";
import axios from "axios";
import { IErrorResponse } from "data/types";
import { useAppDispatch } from "store/store";
import { login } from "store/action";

export interface PageSignUpProps {
  className?: string;
}

const loginSocials = [
  {
    name: "Continue with Facebook",
    href: "#",
    icon: facebookSvg,
  },
  {
    name: "Continue with Twitter",
    href: "#",
    icon: twitterSvg,
  },
  {
    name: "Continue with Google",
    href: "#",
    icon: googleSvg,
  },
];

const PageSignUp: FC<PageSignUpProps> = ({ className = "" }) => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.target)
    const data: {
      [key: string]: string
    } = {}

    // @ts-ignore
    for (const [key, value] of formData.entries()) {
      data[key] = value
    }

    if (!data.name) {
      setErrorMessage('Ad daxil edin')
      return
    }
    if (!data.surname) {
      setErrorMessage('Soyad daxil edin')
      return
    }
    if (!data.phone) {
      setErrorMessage('Telefon daxil edin')
      return
    }
    if (!data.email) {
      setErrorMessage('Email daxil edin')
      return
    }
    if (!data.password) {
      setErrorMessage('Şifrə daxil edin')
      return
    }
    if (!data.password_confirmation) {
      setErrorMessage('Şifrə təkarı daxil edin')
      return
    }

    if (data?.password !== data?.password_confirmation) {
      setErrorMessage('Şifrə təkrarı eyni olmalıdır')
      return
    }

    setIsLoading(true)
    setErrorMessage('')

    axios.post(apiUrl + 'user/auth/register', {
      name: data.name,
      surname: data.surname,
      email: data.email,
      password: data.password,
      password_confirmation: data.password_confirmation
    }).then(res => {
      console.log("res", res.data);
      localStorage.setItem('access_token', res.data.data.access_token)
      localStorage.setItem('user', JSON.stringify(res.data.data.user))
      dispatch(login(res.data.data.user))
      navigate('/')

    }).catch((err: IErrorResponse) => {
      console.log("login error", err.response.data.message)
      setErrorMessage(err.response.data.message ?? 'Xəta baş verdi')
      setIsLoading(false)
    }).finally(() => {
      setIsLoading(false)
    })
  }
  console.log("errorMessage",errorMessage)
  return (
    <div className={`nc-PageSignUp  ${className}`} data-nc-id="PageSignUp">
      <Helmet>
        <title>Qeydiyyat | {appName}</title>
      </Helmet>
      <div className="container mb-10 lg:mb-32">
        <h2 className="my-10 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Qeydiyyat
        </h2>
        <div className="max-w-md mx-auto space-y-6 ">
          {/* <div className="grid gap-3">
            {loginSocials.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="nc-will-change-transform flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
              >
                <img
                  className="flex-shrink-0"
                  src={item.icon}
                  alt={item.name}
                />
                <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                  {item.name}
                </h3>
              </a>
            ))}
          </div> */}
          {/* OR */}
          {/* <div className="relative text-center">
            <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
              OR
            </span>
            <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
          </div> */}
          {/* FORM */}
          <form
            method="post"
            className="grid grid-cols-1 gap-6"
            onSubmit={handleSubmit}
          >
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Ad
              </span>
              <Input
                type="text"
                name="name"
                placeholder="Ad daxil edin"
                className="mt-1"
              />
            </label>
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Soyad
              </span>
              <Input
                type="text"
                name="surname"
                placeholder="Soyad daxil edin"
                className="mt-1"
              />
            </label>
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Telefon
              </span>
              <Input
                type="number"
                name="phone"
                placeholder="+994123456789"
                className="mt-1"
              />
            </label>
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Email
              </span>
              <Input
                type="email"
                name="email"
                placeholder="example@example.com"
                className="mt-1"
              />
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Şifrə
              </span>
              <Input
                type="password"
                name="password"
                className="mt-1"
                placeholder="******"
              />
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Şifrə təkrarı
              </span>
              <Input
                type="password"
                name="password_confirmation"
                className="mt-1"
                placeholder="******"
              />
            </label>
            {/*{*/}
            {/*  errorMessage &&*/}
            {/*  <p className="text-red-600">{errorMessage}</p>*/}
            {/*}*/}
            {
                errorMessage &&
                <div className="flex items-center rounded-xl text-red-600 text-sm font-bold px-1 py-1" role="alert">
                  <div className="py-1">
                    <svg className="fill-current h-6 w-6 mr-4" xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 20 20">
                      <path
                          d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/>
                    </svg>
                  </div>
                  <p>{errorMessage}</p>
                </div>
            }
            <ButtonPrimary type="submit" loading={isLoading}>Davam et</ButtonPrimary>
          </form>
          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Hesabın var? {` `}
            <Link to="/login">Daxil ol</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageSignUp;
