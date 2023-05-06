import { apiUrl, appName } from "config";
import React from "react";
import { FC } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import Helmet from "react-helmet";
import { useAppSelector } from "store/store";
import axios from "axios";

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

  const room = useAppSelector(store => store.room)

  const handleSubmit = () => {
    console.log("room data", room);

    axios.post(apiUrl + 'vendor/announcement', {
      // @ts-ignore +
      city_id: room.city.id,
      // @ts-ignore +
      category_id: room.category.id,
      // @ts-ignore +
      area: room.area,
      // @ts-ignore +
      price: room.price,
      // @ts-ignore +
      address: room.address,
      // @ts-ignore +
      bedroom_count: room.bedroom_count,
      // @ts-ignore +
      bathroom_count: room.bathroom_count,
      // @ts-ignore +
      person_count: room.person_count,
      is_breakfast: 0,
      breakfast_fee: 0,
      condition: 4,
      // @ts-ignore +
      title: room.title,
      // @ts-ignore +
      content: room.content,
      // @ts-ignore +
      multiple_images: room.images,
      // @ts-ignore +
      single_bed_count: room.single_bed_count,
      // @ts-ignore +
      double_bed_count: room.double_bed_count,
    }).then(res => {
      if (res.data.success) {
        console.log("res.data.data", res.data.data);
      }
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
            / 3
          </span>
        </div>

        {/* --------------------- */}
        <div className="listingSection__wrap ">{children}</div>

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
