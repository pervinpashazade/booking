import React, { useState } from "react";
import GuestsInput from "../GuestsInput";
import LocationInput from "../LocationInput";
import DatesRangeInput from "../DatesRangeInput";
import { GuestsObject } from "components/HeroSearchForm/type";
import converSelectedDateToString from "utils/converSelectedDateToString";
import convertNumbThousand from "utils/convertNumbThousand";
import PriceRangeInput from "./PriceRangeInput";
import { manat_icon } from "contains/contants";
import { useAppSelector } from "store/store";

const StaySearchForm = () => {

  const searchParams = useAppSelector(store => store.searchParams)

  //
  const [fieldNameShow, setFieldNameShow] = useState<
    "location" | "propertyType" | "price"
  >("location");

  const [rangePrices, setRangePrices] = useState([10, 5000]);

  //
  // const [locationInputTo, setLocationInputTo] = useState("");
  const [guestInput, setGuestInput] = useState<GuestsObject>({
    guestAdults: 0,
    guestChildren: 0,
    guestInfants: 0,
  });
  const [startDate] = useState<Date | null>(new Date("2023/02/06"));
  const [endDate] = useState<Date | null>(new Date("2023/02/23"));
  //

  const renderInputLocation = () => {
    const isActive = fieldNameShow === "location";
    return (
      <div
        className={`w-full bg-white dark:bg-neutral-800 ${isActive
          ? "rounded-2xl shadow-lg"
          : "rounded-xl shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]"
          }`}
      >
        {
          !isActive ? (
            <button
              className={`w-full flex justify-between text-sm font-medium p-4`}
              onClick={() => setFieldNameShow("location")}
            >
              <span className="text-neutral-400">Şəhər</span>
              <span>{searchParams.city?.name || "Seçin"}</span>
            </button>
          ) : (
            <LocationInput
              defaultValue={searchParams.city?.name}
              setFieldNameShow={setFieldNameShow}
              // onChange={(value?) => {
              //   // setLocationInputTo(value);
              //   setFieldNameShow("price");
              // }}
            />
          )
        }
      </div>
    );
  };

  // const renderInputDates = () => {
  //   const isActive = fieldNameShow === "dates";

  //   return (
  //     <div
  //       className={`w-full bg-white dark:bg-neutral-800 overflow-hidden ${isActive
  //           ? "rounded-2xl shadow-lg"
  //           : "rounded-xl shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]"
  //         }`}
  //     >
  //       {!isActive ? (
  //         <button
  //           className={`w-full flex justify-between text-sm font-medium p-4  `}
  //           onClick={() => setFieldNameShow("dates")}
  //         >
  //           <span className="text-neutral-400">When</span>
  //           <span>
  //             {startDate
  //               ? converSelectedDateToString([startDate, endDate])
  //               : "Add date"}
  //           </span>
  //         </button>
  //       ) : (
  //         <DatesRangeInput />
  //       )}
  //     </div>
  //   );
  // };

  // const renderInputGuests = () => {
  //   const isActive = fieldNameShow === "guests";
  //   let guestSelected = "";
  //   if (guestInput.guestAdults || guestInput.guestChildren) {
  //     const guest =
  //       (guestInput.guestAdults || 0) + (guestInput.guestChildren || 0);
  //     guestSelected += `${guest} guests`;
  //   }

  //   if (guestInput.guestInfants) {
  //     guestSelected += `, ${guestInput.guestInfants} infants`;
  //   }

  //   return (
  //     <div
  //       className={`w-full bg-white dark:bg-neutral-800 overflow-hidden ${isActive
  //           ? "rounded-2xl shadow-lg"
  //           : "rounded-xl shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]"
  //         }`}
  //     >
  //       {!isActive ? (
  //         <button
  //           className={`w-full flex justify-between text-sm font-medium p-4`}
  //           onClick={() => setFieldNameShow("guests")}
  //         >
  //           <span className="text-neutral-400">Who</span>
  //           <span>{guestSelected || `Add guests`}</span>
  //         </button>
  //       ) : (
  //         <GuestsInput defaultValue={guestInput} onChange={setGuestInput} />
  //       )}
  //     </div>
  //   );
  // };

  const renderInputPrice = () => {
    const isActive = fieldNameShow === "price";

    return (
      <div
        className={`w-full bg-white dark:bg-neutral-800 overflow-hidden ${isActive
          ? "rounded-2xl shadow-lg"
          : "rounded-xl shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]"
          }`}
      >
        {!isActive ? (
          <button
            className={`w-full flex justify-between text-sm font-medium p-4`}
            onClick={() => setFieldNameShow("price")}
          >
            <span className="text-neutral-400">Qiymət</span>
            <span>
              {`${rangePrices[0]} ${manat_icon} ~ ${rangePrices[1]} ${manat_icon}`}
            </span>
          </button>
        ) : (
          <PriceRangeInput
            defaultValue={rangePrices}
            onChange={setRangePrices}
          />
        )}
      </div>
    );
  };

  return (
    <div>
      <div className="w-full space-y-5">
        {/*  */}
        {renderInputLocation()}
        {/*  */}
        {/* {renderInputDates()} */}
        {/*  */}
        {/* {renderInputGuests()} */}
        {/*  */}
        {renderInputPrice()}
      </div>
    </div>
  );
};

export default StaySearchForm;
