import { FC } from "react";
import { manat_icon } from "contains/contants";
import { useAppDispatch, useAppSelector } from "store/store";
import { changeValue } from "store/action";

export interface PriceRangeInputProps {
  // onChange: (e: number[]) => void;
  // defaultValue?: number[];
}

const PriceRangeInput: FC<PriceRangeInputProps> = ({
  // onChange,
  // defaultValue,
}) => {
  const searchParams = useAppSelector(store => store.searchParams)
  const dispatch = useAppDispatch()

  // const [rangePrices, setRangePrices] = useState([searchParams.price_from, searchParams.price_to]);

  // useEffect(() => {
  //   if (!defaultValue) return;
  //   setRangePrices(defaultValue);
  // }, [defaultValue]);

  return (
    <div className="p-5">
      <span className="block font-semibold text-xl sm:text-2xl">
        Qiymət aralığı
      </span>
      <div className="relative flex flex-col space-y-8 mt-7">
        <div className="flex justify-between space-x-3">
          <div>
            <label
              htmlFor="minPrice"
              className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
            >
              Minimum
            </label>
            <div className="mt-1 relative rounded-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-neutral-500 sm:text-sm">{manat_icon}</span>
              </div>
              <input
                type="text"
                name="minPrice"
                id="minPrice"
                className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900"
                value={searchParams.price_from}
                // onChange={(e) => onChange([Number(e.target.value), rangePrices[1]])}
                onChange={(e) => dispatch(changeValue("searchParams", "price_from", !isNaN(Number(e.target.value)) ? Number(e.target.value) : searchParams.price_from))}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="maxPrice"
              className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
            >
              Maksimum
            </label>
            <div className="mt-1 relative rounded-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-neutral-500 sm:text-sm">{manat_icon}</span>
              </div>
              <input
                type="text"
                name="maxPrice"
                id="maxPrice"
                className="focus:ring-primary-500 focus:border-priring-primary-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900"
                value={searchParams.price_to}
                // onChange={(e) => onChange([rangePrices[0], Number(e.target.value)])}
                onChange={(e) => dispatch(changeValue("searchParams", "price_to", !isNaN(Number(e.target.value)) ? Number(e.target.value) : searchParams.price_to))}

              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceRangeInput;
