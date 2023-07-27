import React, { FC, FormEvent, useState } from "react";
import facebookSvg from "images/Facebook.svg";
import twitterSvg from "images/Twitter.svg";
import googleSvg from "images/Google.svg";
import { Helmet } from "react-helmet";
import Input from "shared/Input/Input";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { Link } from "react-router-dom";
import { apiUrl, appName } from "config";
import axios from "axios";
import { IErrorResponse } from "data/types";

export interface PageForgotPassProps {
  className?: string;
}

const PageForgotPassword: FC<PageForgotPassProps> = ({ className = "" }) => {

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true)
    setErrorMessage('')
    axios.post(apiUrl + 'user/auth/forgot-password', {
      email: "test@gmail.com",
    }).then(res => {
      console.log("res", res.data);
    }).catch((err: IErrorResponse) => {
      console.log("login error", err.response.data.error)
      setErrorMessage(err.response.data.error)
    }).finally(() => {
      setIsLoading(false)
    })
  }

  return (
    <div className={`nc-PageSignUp  ${className}`} data-nc-id="PageSignUp">
      <Helmet>
        <title>Şifrə bərpası | {appName}</title>
      </Helmet>
      <div className="container mb-10 lg:mb-32">
        <h2 className="my-10 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Şifrə bərpası
        </h2>
        <div className="max-w-md mx-auto space-y-6 ">
          {/* FORM */}
          <form
            method="post"
            className="grid grid-cols-1 gap-6"
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
            {
              errorMessage &&
              <p className="text-red-600">{errorMessage}</p>
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

export default PageForgotPassword;
