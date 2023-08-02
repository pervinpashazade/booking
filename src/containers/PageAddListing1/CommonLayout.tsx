import { apiUrl, appName } from "config";
import React, { useState } from "react";
import { FC } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import Helmet from "react-helmet";
import { useAppDispatch, useAppSelector } from "store/store";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProBreadcrumb from "components/ProBreadcrumb/ProBreadcrumb";
import { setData } from "store/action";

export interface CommonLayoutProps {
  index: string;
  nextHref?: string;
  backtHref: string;
  nextBtnText?: string;
  children: React.ReactNode;
}

const CommonLayout: FC<CommonLayoutProps> = ({
  index = "1",
  children,
  nextHref,
  nextBtnText,
  backtHref,
}) => {
  const [errorMessage, setErrorMessage] = useState<string>('')

  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const room = useAppSelector(store => store.room)

  const [validationErrs, setValidationErrs] = useState<Array<string>>([])

  const handleSubmit = () => {
    console.log("room data", room);

    const errors: Array<string> = []

    if (!room.category) errors.push("Məkan növü daxil edilməyib")
    if (!room.title) errors.push("Məkan adı daxil edilməyib")
    if (!room.city) errors.push("Şəhər daxil edilməyib")
    if (!room.address) errors.push("Küçə daxil edilməyib")
    if (!room.price) errors.push("Qiymət daxil edilməyib")
    if (!room.content) errors.push("Ətraflı məlumat daxil edilməyib")
    if (!room.images?.length) errors.push("Şəkillər daxil edilməyib")
    if (!room.area) errors.push("Sahə (m2) daxil edilməyib")
    if (!room.person_count) errors.push("Qonaq sayı daxil edilməyib")
    if (!room.bedroom_count) errors.push("Yataq otağı sayı daxil edilməyib")
    // if (!room.single_bed_count) errors.push("Tək yataq sayı daxil edilməyib")
    // if (!room.double_bed_count) errors.push("İkili yataq sayı daxil edilməyib")

    if (!room.single_bed_count && !room.double_bed_count) errors.push("Yataq sayı daxil edilməyib")

    if (!room.bathroom_count) errors.push("Hamam sayı daxil edilməyib")

    if (errors.length) {
      setValidationErrs(errors)
      return
    }

    const formData = new FormData();

    formData.append("category_id", room.category.id.toString())
    formData.append("title", room.title)
    formData.append("city_id", room.city.id.toString())
    formData.append("address", room.address)
    formData.append("price", room.price.toString())
    formData.append("area", room.area.toString())
    formData.append("content", room.content)
    formData.append("person_count", room.person_count.toString())
    formData.append("bedroom_count", room.bedroom_count.toString())
    formData.append("single_bed_count", room.single_bed_count.toString())
    formData.append("double_bed_count", room.double_bed_count.toString())
    formData.append("bathroom_count", room.bathroom_count.toString())

    // // @ts-ignore
    // room.images.forEach(item => {
    //   console.log("item", item)
    //   // @ts-ignore
    //   return(formData.append("multiple_images[]", item))
    // })

    // @ts-ignore
    room.images.forEach((item: any) => {
      console.log("item", item)
      formData.append("multiple_images[]", item)
    })

    //
    // for (let i = 0; i < room.images.length; i++) {
    //   // @ts-ignore
    //   formData.append("multiple_images", room.images[i]);
    // };


    // // static
    formData.append("is_breakfast", "0")
    formData.append("breakfast_fee", "0")
    formData.append("condition", "4")

    dispatch(setData("preLoader", true))

    axios.post(apiUrl + 'vendor/announcement', formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
      }
    }).then(res => {
      if (res.data.success) {
        console.log("res.data.data", res.data.data);
        navigate("/account-items")
      }
    }).catch((err: any) => {
      setErrorMessage(err.response.data.message)
      setValidationErrs([])
      console.log("post vendor/announcement err", err);
    })
      .then(() => {
        dispatch(setData("preLoader", false))
      })
  }

  const handleNext = () => {

    const errors: { [key: string]: string } = {}

    if (index === "1") {
      if (!room.category) errors["category"] = "Məkan növü daxil edilməyib"
      if (!room.title) errors["title"] = "Məkan adı daxil edilməyib"
      if (!room.city) errors["city"] = "Şəhər daxil edilməyib"
      if (!room.address) errors["address"] = "Küçə daxil edilməyib"
      if (!room.price) errors["price"] = "Qiymət daxil edilməyib"
      if (!room.content) errors["content"] = "Ətraflı məlumat daxil edilməyib"
      if (!room.images?.length) {
        errors["images"] = "Şəkillər daxil edilməyib"
      } else if (room.images?.length < 5) {
        errors["images"] = "Ən az 5 şəkil daxil edilməlidir"
      }
      // if (!room.area) errors["area"] = "Sahə (m2) daxil edilməyib"
      // if (!room.person_count) errors["person_count"] = "Qonaq sayı daxil edilməyib"
      // if (!room.bedroom_count) errors["bedroom_count"] = "Yataq otağı sayı daxil edilməyib"

      dispatch(setData("room_errors", errors))

      // @ts-ignore
      if (!Object.keys(errors).length) navigate(nextHref)
    }
  }

  return (
    <div
      className={`nc-PageAddListing1 px-4 max-w-3xl mx-auto pb-24 pt-14 sm:py-7 lg:pb-32`}
      data-nc-id="PageAddListing1"
    >
      <Helmet>
        <title>Yeni elan | {appName}</title>
      </Helmet>

      <ProBreadcrumb
        classnames="mb-7"
        items={[{
          title: "Əsas səhifə",
          link: "/",
        }, {
          title: "Yeni elan",
        }]}
      />

      <div className="space-y-11">
        <div>
          <span className="text-4xl font-semibold">{index}</span>{" "}
          <span className="text-lg text-neutral-500 dark:text-neutral-400">
            / 2
          </span>
        </div>

        {/* --------------------- */}
        <div className="listingSection__wrap ">{children}</div>

        <div className="space-y-4">
          {
            validationErrs.length > 0 &&
            <div className="space-y-4">
              {
                validationErrs.map((item, index) =>
                  <div key={index} className="flex items-center rounded-xl text-red-600 text-sm font-bold px-1 py-0" role="alert">
                    <div className="">
                      <svg className="fill-current h-6 w-6 mr-4" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20">
                        <path
                          d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                      </svg>
                    </div>
                    <p>{item}</p>
                  </div>
                )
              }
            </div>
          }
          {
            errorMessage &&
            <div className="flex items-center rounded-xl text-red-600 text-sm font-bold px-1" role="alert">
              <svg className="fill-current h-6 w-6 mr-4" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20">
                <path
                  d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
              </svg>
              <p>{errorMessage}</p>
            </div>
          }
        </div>

        {/* --------------------- */}
        <div className="flex justify-end space-x-5">
          {
            index !== "1" &&
            <ButtonSecondary href={backtHref}>{index !== "3" ? "Geri qayıt" : "Ana səhifə"}</ButtonSecondary>
          }
          {
            nextHref ?
              <ButtonPrimary
                onClick={handleNext}
              >
                {nextBtnText || "Davam et"}
              </ButtonPrimary>
              :
              <ButtonPrimary onClick={handleSubmit}>
                {nextBtnText || "Təsdiq et"}
              </ButtonPrimary>
          }
        </div>

      </div>
    </div>
  );
};

export default CommonLayout;
