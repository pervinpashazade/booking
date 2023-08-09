import React, {FC, FormEvent, Fragment, useState} from "react";
import facebookSvg from "images/Facebook.svg";
import twitterSvg from "images/Twitter.svg";
import googleSvg from "images/Google.svg";
import { Helmet } from "react-helmet";
import Input from "shared/Input/Input";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import {Link, useNavigate} from "react-router-dom";
import { apiUrl, appName } from "config";
import axios from "axios";
import { IErrorResponse } from "data/types";
import {Dialog, Transition} from "@headlessui/react";
import InputMask from "react-input-mask";
import {login} from "../../store/action";

export interface PageForgotPassProps {
  className?: string;
}

const PageForgotPassword: FC<PageForgotPassProps> = ({ className = "" }) => {

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLoadingVerify, setIsLoadingVerify] = useState<boolean>(false)
  const [phone, setPhone] = useState<any>("")

  const [errorMessage, setErrorMessage] = useState<string>('')
  let [isOpen, setIsOpen] = useState(false)
  const [forgetPasswordToken, setForgetPasswordToken] = useState<any>("")
  const navigate = useNavigate()

  const closeModal=()=> {
    setIsOpen(false)
  }

  const openModal=()=> {
    setIsOpen(true)
  }

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
    if (!data.phone) {
      setErrorMessage('Telefon daxil edin')
      return
    }
    setIsLoading(true)
    setErrorMessage('')
    const numberPattern = /\d+/g,
        // @ts-ignore
        num = phone && phone.split(/[ ,\n]+/).map(i => {
          // @ts-ignore
          return i.match(numberPattern).join('').slice(0, 3) === "994" ? i.match(numberPattern).join('') : "994" + i.match(numberPattern).join('')
        });
    // @ts-ignore
    const customPhone = `+${phone.match(numberPattern).join('')}`;
    axios.post(apiUrl + 'user/auth/forgot-password', {
      phone: customPhone,
    }).then(res => {
      console.log("res", res.data);
        console.log("modallllll")
        openModal()
        setPhone(data.phone)
    }).catch((err: IErrorResponse) => {
      console.log("login error", err.response.data.error)
      setErrorMessage(err.response.data.error)
    }).finally(() => {
      setIsLoading(false)
    })
  }


  const handleSubmitVerify = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target)
    const data: {
      [key: string]: string
    } = {}
    // @ts-ignore
    for (const [key, value] of formData.entries()) {
      data[key] = value
    }
    if (!data.token) {
      setErrorMessage('Token daxil edin')
      return
    }
    setIsLoadingVerify(true)
    setErrorMessage('')
    const numberPattern = /\d+/g,
        // @ts-ignore
        num = phone && phone.split(/[ ,\n]+/).map(i => {
          // @ts-ignore
          return i.match(numberPattern).join('').slice(0, 3) === "994" ? i.match(numberPattern).join('') : "994" + i.match(numberPattern).join('')
        });
    // @ts-ignore
    const customPhone = `+${phone.match(numberPattern).join('')}`;
    axios.post(apiUrl + 'user/auth/reset-password', {
      phone: customPhone,
      token: forgetPasswordToken,
      password: data.password,
      password_confirmation: data.password_confirmation,
    }).then(res => {
      console.log("res", res);
      if (res.data.success){
        navigate("/login")
      }
    }).catch((err: any) => {
      setErrorMessage(err.response.data.message)
    }).finally(() => {
      setIsLoadingVerify(false)
    })
  }

  return (
    <div className={`nc-PageSignUp  ${className}`} data-nc-id="PageSignUp">
      <Helmet>
        <title>Şifrə bərpası | {appName}</title>
      </Helmet>


      <>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full text-black dark:bg-neutral-900 max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                        as="h3"
                        className="dark:text-white text-center text-lg font-medium leading-6 text-gray-900 mb-4"
                    >
                      Token vasitəsilə təsdiqləmə
                    </Dialog.Title>
                    <div className="mt-2 mb-6">
                      <p className="dark:text-white text-sm text-gray-500">
                        Zəhmət olmasa, telefon nömrənizə göndərilən tokeni daxil edin.
                      </p>
                    </div>
                    <form method="post" onSubmit={handleSubmitVerify}>
                      <div className="mt-2">
                        <label style={{fontSize: "14px"}} className="mt-2 w-100 dark:text-white dark:bg-neutral-900">Whatsapp-dan gələn təstiq kodunu qeyd edin</label>
                        <Input
                            type="text"
                            name="token"
                            placeholder="Təstiq kodu"
                            required={true}
                            className="mt-2 w-100 dark:bg-neutral-900"
                            style={{ marginBottom: "20px" }}
                            onChange={(e)=>setForgetPasswordToken(e.target.value)}
                        />

                        <label style={{fontSize: "14px"}} className="mt-2 w-100 dark:text-white dark:bg-neutral-900">Şifrə</label>
                        <Input
                            type="text"
                            name="password"
                            placeholder="Şifrəni daxil edin"
                            required={true}
                            className="mt-2 w-100  dark:bg-neutral-900"
                            style={{ marginBottom: "20px" }}
                        />

                        <label style={{fontSize: "14px"}} className="mt-2 w-100 dark:text-white dark:bg-neutral-900">Təkrar şifrə</label>
                        <Input
                            type="text"
                            name="password_confirmation"
                            placeholder="Təkrar şifrəni daxil edin"
                            required={true}
                            className="mt-2 w-100  dark:bg-neutral-900"
                            style={{ marginBottom: "20px" }}
                        />

                        {/*<InputMask*/}
                        {/*    name="code"*/}
                        {/*    type="text"*/}
                        {/*    onChange={(e)=>setForgetPasswordToken(e.target.value)}*/}
                        {/*    placeholder="Kod"*/}
                        {/*    className="mt-2 w-100"*/}
                        {/*    mask="9999"*/}
                        {/*    required*/}
                        {/*    style={{background:"white", color:"black"}}*/}
                        {/*/>*/}



                      </div>

                      <div className="mt-4 flex justify-end">
                        {/*<button*/}
                        {/*    type="button"*/}
                        {/*    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"*/}
                        {/*    onClick={closeModal}*/}
                        {/*>*/}
                        {/*  Bagla*/}
                        {/*</button>*/}
                        <ButtonPrimary type="submit" loading={isLoadingVerify}>Təsdiqlə</ButtonPrimary>
                      </div>
                    </form>

                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>

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
                Telefon
              </span>
              {/*<Input*/}
              {/*  type="text"*/}
              {/*  name="phone"*/}
              {/*  placeholder="0501234567"*/}
              {/*  className="mt-1"*/}
              {/*/>*/}
              <InputMask
                  name="phone"
                  type="tel"
                  // value={this.state.phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Telefon nömrəsi"
                  className="mt-2 w-100"
                  mask="+\9\94 (99) 999-99-99"
              />
            </label>
            {/*{*/}
            {/*  errorMessage &&*/}
            {/*  <p className="text-red-600">{errorMessage}</p>*/}
            {/*}*/}
            {
                errorMessage &&
                <div className="flex items-center rounded rounded-xl text-red-600 text-sm font-bold px-1 py-1" role="alert">
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

export default PageForgotPassword;
