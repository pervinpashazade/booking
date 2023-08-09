import { FC, Fragment, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Input from "shared/Input/Input";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";

import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { apiUrl, appName } from "config";
import axios from "axios";
import { IErrorResponse } from "data/types";
import { useAppDispatch } from "store/store";
import { login } from "store/action";
import InputMask from "react-input-mask";
import { Dialog, Transition } from "@headlessui/react";

export interface PageSignUpProps {
  className?: string;
}

// const loginSocials = [
//   {
//     name: "Continue with Facebook",
//     href: "#",
//     icon: facebookSvg,
//   },
//   {
//     name: "Continue with Twitter",
//     href: "#",
//     icon: twitterSvg,
//   },
//   {
//     name: "Continue with Google",
//     href: "#",
//     icon: googleSvg,
//   },
// ];

const PageSignUp: FC<PageSignUpProps> = ({ className = "" }) => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [errorMessageVerify, setErrorMessagVerify] = useState<string>('')
  let [isOpen, setIsOpen] = useState(false)
  const [isLoadingVerify, setIsLoadingVerify] = useState<boolean>(false)
  const [code, setCode] = useState<any>("")
  const [phone, setPhone] = useState<any>(null)
  const [isToken, setToken] = useState<string>("")
  let [urlParams] = useSearchParams()
  let redirectUrl = urlParams.get("redirect");

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
    // if (!data.surname) {
    //   setErrorMessage('Soyad daxil edin')
    //   return
    // }
    if (!data.phone) {
      setErrorMessage('Telefon daxil edin')
      return
    }
    // if (!data.email) {
    //   setErrorMessage('Email daxil edin')
    //   return
    // }
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
    // let customPhone = `+9${data.phone.substring(1).replace(new RegExp("-", 'g'), "").replace(new RegExp(" ", 'g'), "")}`
    const numberPattern = /\d+/g,
      num = data.phone && data.phone.split(/[ ,\n]+/).map(i => {
        // @ts-ignore
        return i.match(numberPattern).join('').slice(0, 3) === "994" ? i.match(numberPattern).join('') : "994" + i.match(numberPattern).join('')
      });
    // @ts-ignore
    const phone = `+${data.phone.match(numberPattern).join('')}`;

    axios.post(apiUrl + 'user/auth/register', {
      name: data.name,
      // surname: data.surname,
      // email: data.email,
      phone: phone,
      password: data.password,
      password_confirmation: data.password_confirmation
    }).then(res => {
      console.log("res", res.data);
      localStorage.setItem('access_token', res.data.data.access_token)
      localStorage.setItem('user', JSON.stringify(res.data.data.user))
      // dispatch(login(res.data.data.user))
      // navigate('/login')
      setToken(res.data.data.access_token)
      openModal()
    }).catch((err: IErrorResponse) => {
      console.log("login error", err.response.data.message)
      setErrorMessage(err.response.data.message ?? 'Xəta baş verdi')
      setIsLoading(false)
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
    if (!data.code) {
      setErrorMessagVerify('Code daxil edin')
      return
    }
    setIsLoadingVerify(true)
    setErrorMessagVerify('')
    // let customPhone = `+994${phone.substring(1).replace(new RegExp("-", 'g'), "")}`
    const numberPattern = /\d+/g,
      // @ts-ignore
      num = phone ? phone.split(/[ ,\n]+/).map(i => {
        // @ts-ignore
        return i.match(numberPattern).join('').slice(0, 3) === "994" ? i.match(numberPattern).join('') : "994" + i.match(numberPattern).join('')
      }) :
        // @ts-ignore
        JSON.parse(localStorage.getItem("user")).phone.split(/[ ,\n]+/).map(i => {
          // @ts-ignore
          return i.match(numberPattern).join('').slice(0, 3) === "994" ? i.match(numberPattern).join('') : "994" + i.match(numberPattern).join('')
        })
    // @ts-ignore
    const customPhone = `+${phone ? phone.match(numberPattern).join('') : JSON.parse(localStorage.getItem("user")).phone.match(numberPattern).join('')}`;
    axios.post(apiUrl + 'user/auth/verify', {
      phone: customPhone,
      code: code,
    }, {
      headers: {
        Authorization: `Bearer ${isToken}`
      }
    }).then(res => {
      // console.log("res", res);
      if (res.data.success) {
        console.log("ressssss22222222", res)
        localStorage.setItem('user', JSON.stringify(res.data.data))
        navigate(redirectUrl ?? "/")
        dispatch(login(res.data.data))
      }
    }).catch((err: any) => {
      console.log("login error", err.response.data)
      setErrorMessagVerify(err.response.data.message)
    }).finally(() => {
      setIsLoadingVerify(false)
    })
  }

  useEffect(() => {
    // @ts-ignore
    let user = JSON.parse(localStorage.getItem("user"))
    if (user && !user.phone_verified) {
      openModal()
    }
  }, [])

  const closeModal = () => {
    setIsOpen(false)
  }

  const openModal = () => {
    setIsOpen(true)
  }


  return (
    <div className={`nc-PageSignUp  ${className}`} data-nc-id="PageSignUp">
      <Helmet>
        <title>Qeydiyyat | {appName}</title>
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
                      className="dark:text-white text-center text-lg font-medium leading-6 text-gray-900"
                    >
                      Whatsapp vasitəsilə təsdiqləmə
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="dark:text-white text-sm text-gray-500 mb-5">
                        Zəhmət olmasa, nömrənizə göndərilən təstiq kodunu daxil edin.
                      </p>
                    </div>
                    <form method="post" onSubmit={handleSubmitVerify}>
                      <div className="mt-2">
                        {/*<InputMask*/}
                        {/*    mask="9999"*/}
                        {/*    maskChar=" "*/}
                        {/*    className="mt-2 w-100 bg-white"*/}
                        {/*    style={{background:"white", color:"black"}}*/}
                        {/*    placeholder="Code nömrəsi"*/}
                        {/*    onChange={(e)=>setCode(e.target.value)}*/}
                        {/*    name="code"*/}
                        {/*    type="text"*/}
                        {/*    required*/}
                        {/*/>*/}

                        <InputMask
                          name="code"
                          type="tel"
                          onChange={(e) => setCode(e.target.value)}
                          placeholder="Kod"
                          className="mt-2 w-100  dark:bg-neutral-900"
                          mask="9999"
                          required
                          style={{ marginBottom: "20px" }}
                        />

                        {
                          errorMessageVerify &&
                          <div className="flex items-center rounded-xl text-red-600 text-sm font-bold px-1 py-1 mt-2" role="alert">
                            <div className="py-1">
                              <svg className="fill-current h-6 w-6 mr-4" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20">
                                <path
                                  d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                              </svg>
                            </div>
                            <p>{errorMessageVerify}</p>
                          </div>
                        }


                      </div>

                      <div className="mt-4 flex justify-between">

                        <ButtonSecondary onClick={() => { closeModal(); localStorage.removeItem("user") }} type="button" loading={isLoadingVerify}>Çıxış</ButtonSecondary>

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
            {/*<label className="block">*/}
            {/*  <span className="text-neutral-800 dark:text-neutral-200">*/}
            {/*    Soyad*/}
            {/*  </span>*/}
            {/*  <Input*/}
            {/*    type="text"*/}
            {/*    name="surname"*/}
            {/*    placeholder="Soyad daxil edin"*/}
            {/*    className="mt-1"*/}
            {/*  />*/}
            {/*</label>*/}
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Telefon
              </span>
              {/*<Input*/}
              {/*  type="number"*/}
              {/*  name="phone"*/}
              {/*  placeholder="0501234567"*/}
              {/*  className="mt-1"*/}
              {/*/>*/}
              <InputMask
                name="phone"
                type="tel"
                // value={this.state.phone}
                // onChange={(e) => this.handleChange(e, "phone")}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Telefon nömrəsi"
                className="mt-2 w-100"
                // mask="099-999-99-99"
                mask="+\9\94 (99) 999-99-99"
              />
            </label>

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
            Hesabın var? {` `}
            <Link to="/login">Daxil ol</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageSignUp;
