import React, { FC } from "react";
import Checkbox from "shared/Checkbox/Checkbox";
import CommonLayout from "./CommonLayout";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import { DEMO_STAY_LISTINGS } from "data/listings";
import StayCard from "components/StayCard/StayCard";

export interface PageAddListing4Props { }

const PageAddListing4: FC<PageAddListing4Props> = () => {
  return (
    <CommonLayout
      index="4"
      backtHref="/new/step/3"
      nextBtnText="Elanı paylaş"
      nextHref="/account"
    >
      <>
        <div>
          <h2 className="text-2xl font-semibold">Uğurlu əməliyyat 🎉</h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            Əla, siyahını tamamlamağınız münasibətilə təbrik edirik, dərc olunmaq üçün nəzərdən keçirilməsini gözləyir
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* FORM */}
        <div>
          <h3 className="text-lg font-semibold">Sizin elanınız</h3>
          <div className="max-w-xs">
            <StayCard
              className="mt-8"
              data={{ ...DEMO_STAY_LISTINGS[0], reviewStart: 0 }}
            />
          </div>
          <div className="flex items-center space-x-5 mt-8">
            <ButtonSecondary href="/new/step/1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              <span className="ml-3">Redakdə et</span>
            </ButtonSecondary>

            <ButtonPrimary>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              <span className="ml-3">Bax</span>
            </ButtonPrimary>
          </div>
        </div>
        {/*  */}
      </>
      {/* <>
        <div>
          <h2 className="text-2xl font-semibold">Amenities </h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            Many customers have searched for accommodation based on amenities
            criteria
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        <div className="space-y-8">
          <div>
            <label className="text-lg font-semibold" htmlFor="">
              General amenities
            </label>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <Checkbox label="Wifi" name="Wifi" defaultChecked />
              <Checkbox label="Internet" name="Internet" />
              <Checkbox label="TV" name="TV" defaultChecked />
              <Checkbox label="Air conditioning" name="Air conditioning" />
              <Checkbox label="Fan" name="Fan" />
              <Checkbox label="Private entrance" name="Private entrance" />
              <Checkbox label="Dryer" name="Dryer" defaultChecked />
              <Checkbox label="Heater" name="Heater" />
              <Checkbox label="Washing machine" name="Washing machine" />
              <Checkbox label="Detergent" name="Detergent" defaultChecked />
              <Checkbox label="Clothes dryer" name="Clothes dryer" />
              <Checkbox label="Baby cot" name="Baby cot" />
              <Checkbox label="Desk" name="Desk " defaultChecked />
              <Checkbox label="Fridge" name="Fridge" />
              <Checkbox label="Dryer" name="Dryer" defaultChecked />
            </div>
          </div>

          <div>
            <label className="text-lg font-semibold" htmlFor="">
              Other amenities
            </label>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <Checkbox label="Wardrobe" name="Wardrobe" defaultChecked />
              <Checkbox label="Cloth hook" name="Cloth hook" />
              <Checkbox
                label="Extra cushion"
                name="Extra cushion"
                defaultChecked
              />
              <Checkbox label="Gas stove" name="Gas stove" />
              <Checkbox label="Toilet paper" name="Toilet paper" />
              <Checkbox
                label="Free toiletries"
                name="Free toiletries"
                defaultChecked
              />
              <Checkbox label="Makeup table" name="Makeup table" />
              <Checkbox label="Hot pot" name="Hot pot" />
              <Checkbox label="Bathroom heaters" name="Bathroom heaters" />
              <Checkbox label="Kettle" name="Kettle" defaultChecked />
              <Checkbox label="Dishwasher" name="Dishwasher" />
              <Checkbox label="BBQ grill" name="BBQ grill" defaultChecked />
              <Checkbox label="Toaster" name="Toaster" defaultChecked />
              <Checkbox label="Towel" name="Towel" />
              <Checkbox label="Dining table" name="Dining table" />
            </div>
          </div>

          <div>
            <label className="text-lg font-semibold" htmlFor="">
              Safe amenities
            </label>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <Checkbox label="Fire siren" name="Fire siren" defaultChecked />
              <Checkbox label="Fire extinguisher" name="Fire extinguisher" />
              <Checkbox label="Anti-theft key" name="Anti-theft key" />
              <Checkbox label="Safe vault" name="Safe vault" />
            </div>
          </div>
        </div>
      </> */}
    </CommonLayout>
  );
};

export default PageAddListing4;
