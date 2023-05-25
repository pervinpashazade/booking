import { apiUrl, appName } from "config";
import React, { useState } from "react";
import { FC } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import Helmet from "react-helmet";
import { useAppSelector } from "store/store";
import axios from "axios";
import { IFormValidationProps, IImageProps } from "data/types";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate()

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

    // @ts-ignore
    room.images.forEach(item => formData.append("multiple_images[]", item))

    // // static
    formData.append("is_breakfast", "0")
    formData.append("breakfast_fee", "0")
    formData.append("condition", "4")

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
      console.log("post vendor/announcement err", err);
    })
  }

  return (
    <div
      className={`nc-PageAddListing1 px-4 max-w-3xl mx-auto pb-24 pt-14 sm:py-24 lg:pb-32`}
      data-nc-id="PageAddListing1"
    >
      <Helmet>
        <title>Yeni elan | {appName}</title>
      </Helmet>
      <div className="space-y-11">
        <div>
          <span className="text-4xl font-semibold">{index}</span>{" "}
          <span className="text-lg text-neutral-500 dark:text-neutral-400">
            / 2
          </span>
        </div>

        {/* --------------------- */}
        <div className="listingSection__wrap ">{children}</div>

        {
          validationErrs.length > 0 &&
          <div className="my-11">
            {
              validationErrs.map((item, index) => <p key={index} className="text-red-600 mb-2">* {item}</p>)
            }
          </div>
        }

        {/* --------------------- */}
        <div className="flex justify-end space-x-5">
          {
            index !== "1" &&
            <ButtonSecondary href={backtHref}>{index !== "3" ? "Geri qayıt" : "Ana səhifə"}</ButtonSecondary>
          }
          {
            nextHref ?
              <ButtonPrimary href={nextHref}>
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
