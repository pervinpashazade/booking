import React, { FC, FormEvent, useEffect, useState } from "react";
import facebookSvg from "images/Facebook.svg";
import twitterSvg from "images/Twitter.svg";
import googleSvg from "images/Google.svg";
import { Helmet } from "react-helmet";
import Input from "shared/Input/Input";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
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

const PageLogin: FC<PageLoginProps> = ({ className = "" }) => {

  let [urlParams] = useSearchParams()
  let redirectUrl = urlParams.get("redirect");

  console.log("redirectUrl", redirectUrl);

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
      console.log("res", res.data.data);
      localStorage.setItem('access_token', res.data.data.access_token)
      localStorage.setItem('user', JSON.stringify(res.data.data.user))
      dispatch(login(res.data.data.user))
      navigate(redirectUrl ?? "/")
      // navigate(redirectUrl ? `/${redirectUrl}` : "/")
    }).catch((err: any) => {
      console.log("login error", err.response.data)
      setErrorMessage(err.response.data.message)
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
