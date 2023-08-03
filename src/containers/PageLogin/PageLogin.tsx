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
import InputMask from "react-input-mask";

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
    // if (!data.email) {
    //   setErrorMessage('Email daxil edin')
    //   return
    // }
    if (!data.phone) {
      setErrorMessage('Telefon daxil edin')
      return
    }
    if (!data.password) {
      setErrorMessage('Şifrə daxil edin')
      return
    }
    setIsLoading(true)
    setErrorMessage('')
    let customPhone = `+994${data.phone.substring(1).replace(new RegExp("-", 'g'), "")}`
    axios.post(apiUrl + 'user/auth/login', {
      phone: customPhone,
      password: data.password,
    }).then(res => {
      console.log("res", res.data.data);
      localStorage.setItem('access_token', res.data.data.access_token)
      localStorage.setItem('user', JSON.stringify(res.data.data.user))
      dispatch(login(res.data.data.user))
      navigate(redirectUrl ?? "/")
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
      <div className="container mb-10 lg:mb-32">
        <h2 className="my-10 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Daxil ol
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          {/* FORM */}
          <form
            className="grid grid-cols-1 gap-6"
            method="post"
            onSubmit={handleSubmit}
          >
            {/*<label className="block">*/}
            {/*  <span className="text-neutral-800 dark:text-neutral-200">*/}
            {/*    Email*/}
            {/*  </span>*/}
            {/*  <Input*/}
            {/*    type="email"*/}
            {/*    name="email"*/}
            {/*    placeholder="example@example.com"*/}
            {/*    className="mt-1"*/}
            {/*  />*/}
            {/*</label>*/}
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Telefon
              </span>
              <InputMask
                  name="phone"
                  type="text"
                  // value={this.state.phone}
                  // onChange={(e) => this.handleChange(e, "phone")}
                  placeholder="Telefon nömrəsi"
                  className="mt-2 w-100"
                  mask="099-999-99-99"
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
            {/*{*/}
            {/*  errorMessage && <p className="text-red-600">{errorMessage}</p>*/}
            {/*}*/}
            {
              errorMessage &&
              <div className="flex items-center rounded-xl text-red-600 text-sm font-bold px-1 py-1" role="alert">
                <div className="py-1">
                  <svg className="fill-current h-6 w-6 mr-4" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20">
                    <path
                      d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                  </svg>
                </div>
                <p>{errorMessage}</p>
              </div>
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
