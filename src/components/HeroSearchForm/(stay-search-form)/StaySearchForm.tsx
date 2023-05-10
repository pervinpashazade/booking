import { FC, useState } from "react";
import LocationInput from "../LocationInput";
import { ICityProps } from "../../../data/types";
import ButtonSubmit from "../ButtonSubmit";
import PriceRangeInput from "../(real-estate-search-form)/PriceRangeInput";

const StaySearchForm: FC<{
  cities: Array<ICityProps>
}> = ({ cities }) => {

  const [city, setCity] = useState<ICityProps>()
  const [rangePrices, setRangePrices] = useState([10, 5000]);

  const submit = (e: any) => {
    e.preventDefault();
    console.log("test");
  }

  return (
    <form className="w-full relative mt-8 flex rounded-full shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-800 ">
      <LocationInput
        cities={cities}
        className="flex-[1.5]"
        city={city}
        setCity={setCity}
      />
      <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>
      <PriceRangeInput onChange={setRangePrices} rangePrices={rangePrices} />
      {/* <StayDatesRangeInput className="flex-1" /> */}
      {/* <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>
      <GuestsInput className="flex-1" /> */}
      <div className="pr-2 xl:pr-4 flex items-center justify-center">
        {/* <ButtonSubmit href={`/?city_id=${city?.id}`} /> */}
        <ButtonSubmit href={`/?city_id=${city?.id ?? ""}&price_from=${rangePrices[0]}&price_to=${rangePrices[1]}`} handleClick={submit} />
      </div>
    </form>
  )
};

export default StaySearchForm;
