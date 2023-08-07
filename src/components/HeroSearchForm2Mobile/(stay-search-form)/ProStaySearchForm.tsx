import { useState } from "react";
import LocationInput from "../LocationInput";
import PriceRangeInput from "./PriceRangeInput";
import { manat_icon } from "contains/contants";
import { useAppSelector } from "store/store";

const ProStaySearchForm = () => {

    const searchParams = useAppSelector(store => store.searchParams)

    const [fieldNameShow, setFieldNameShow] = useState<"location" | "propertyType" | "price">("location");

    const [rangePrices, setRangePrices] = useState([searchParams.price_from, searchParams.price_to]);

    const renderInputLocation = () => {
        const isActive = fieldNameShow === "location";
        return (
            <div
                className={`w-full bg-white dark:bg-neutral-800 ${isActive
                    ? "rounded-2xl shadow-lg"
                    : "rounded-xl shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]"
                    }`}
            >
                {/*{*/}
                {/*    !isActive ? (*/}
                {/*        <button*/}
                {/*            className={`w-full flex justify-between text-sm font-medium p-4`}*/}
                {/*            onClick={() => setFieldNameShow("location")}*/}
                {/*        >*/}
                {/*            <span className="text-neutral-400">Şəhər</span>*/}
                {/*            <span>{searchParams.city?.name || "Seçin"}</span>*/}
                {/*        </button>*/}
                {/*    ) : (*/}
                {/*        <LocationInput*/}
                {/*            defaultValue={searchParams.city?.name}*/}
                {/*            setFieldNameShow={setFieldNameShow}*/}
                {/*        />*/}
                {/*    )*/}
                {/*}*/}

                <LocationInput
                    defaultValue={searchParams.city?.name}
                    setFieldNameShow={setFieldNameShow}
                />
            </div>
        );
    };

    const renderInputPrice = () => {
        const isActive = fieldNameShow === "price";

        return (
            <div
                className={`w-full bg-white dark:bg-neutral-800 overflow-hidden ${isActive
                    ? "rounded-2xl shadow-lg"
                    : "rounded-xl shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]"
                    }`}
            >
                {/*{!isActive ? (*/}
                {/*    <button*/}
                {/*        className={`w-full flex justify-between text-sm font-medium p-4`}*/}
                {/*        onClick={() => setFieldNameShow("price")}*/}
                {/*    >*/}
                {/*        <span className="text-neutral-400">Qiymət</span>*/}
                {/*        <span>*/}
                {/*            {`${rangePrices[0]} ${manat_icon} ~ ${rangePrices[1]} ${manat_icon}`}*/}
                {/*        </span>*/}
                {/*    </button>*/}
                {/*) : (*/}
                {/*    <PriceRangeInput*/}
                {/*        // defaultValue={rangePrices}*/}
                {/*        // onChange={setRangePrices}*/}
                {/*    />*/}
                {/*)}*/}
                <PriceRangeInput
                    // defaultValue={rangePrices}
                    // onChange={setRangePrices}
                />
            </div>
        );
    };

    return (
        <div>
            <div className="w-full space-y-5">
                {renderInputLocation()}
                {renderInputPrice()}
            </div>
        </div>
    );
};

export default ProStaySearchForm;
