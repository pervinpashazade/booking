import React, { FC, FormEvent, useEffect, useState } from "react";
import facebookSvg from "images/Facebook.svg";
import twitterSvg from "images/Twitter.svg";
import googleSvg from "images/Google.svg";
import { Helmet } from "react-helmet";
import Input from "shared/Input/Input";
import { Link, useNavigate } from "react-router-dom";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import axios from "axios";
import { apiUrl, appName } from "config";
import { IErrorResponse } from "data/types";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { login } from "../../store/action";

export interface PageLoginProps {
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

const PageLogin: FC<PageLoginProps> = ({ className = "" }) => {

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

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
    if (!data.email) {
      setErrorMessage('Email daxil edin')
      return
    }
    if (!data.password) {
      setErrorMessage('Şifrə daxil edin')
      return
    }
    setIsLoading(true)
    setErrorMessage('')
    axios.post(apiUrl + 'user/auth/login', data).then(res => {
      console.log("res", res.data);
      localStorage.setItem('access_token', res.data.access_token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      dispatch(login(res.data.user))
      navigate('/')
    }).catch((err: IErrorResponse) => {
      console.log("login error", err.response.data.error)
      setErrorMessage(err.response.data.error)
    }).finally(() => {
      setIsLoading(false)
    })
  }

  return (
    <div className={`nc-PageLogin ${className}`} data-nc-id="PageLogin">
      <Helmet>
        <title>Daxil ol | {appName}</title>
      </Helmet>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Daxil ol
        </h2>
        <div className="max-w-md mx-auto space-y-6">
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
            className="grid grid-cols-1 gap-6"
            method="post"
            onSubmit={handleSubmit}
          >
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
                <Link to="/forgot-pass" className="text-sm">
                  Şifrəni unutmusan?
                </Link>
              </span>
              <Input
                type="password"
                name="password"
                className="mt-1"
                placeholder="******"
              />
            </label>
            {
              errorMessage &&
              <p className="text-red-600">{errorMessage}</p>
            }
            <ButtonPrimary type="submit" loading={isLoading}>Davam et</ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Hesabın yoxdur? {` `}
            <Link to="/signup">Qeydiyyat</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageLogin;
