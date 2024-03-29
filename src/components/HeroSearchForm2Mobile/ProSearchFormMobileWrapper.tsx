import { Fragment, useState } from "react";
import { Dialog, Tab, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import ButtonSubmit from "./ButtonSubmit";
import { useTimeoutFn } from "react-use";
import StaySearchForm from "./(stay-search-form)/StaySearchForm";
import { useAppDispatch, useAppSelector } from "store/store";
import { changeValue, setData } from "store/action";
import axios from "axios";
import { apiUrl } from "config";
import { ISearchRoomParams } from "data/types";
import { useNavigate, useSearchParams } from "react-router-dom";
import ProStaySearchForm from "./(stay-search-form)/ProStaySearchForm";

const ProSearchFormMobileWrapper = () => {

    const nagivate = useNavigate()

    const dispatch = useAppDispatch()
    const searchParams = useAppSelector(store => store.searchParams)

    let [urlParams, setUrlParams] = useSearchParams();

    const getData = async (params: ISearchRoomParams) => {
        dispatch(setData("preLoader", true))
        return axios.get(apiUrl + "vendor/announcement", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            },
            params: {
                "page": params.page,
                "per_page": params.per_page,
                "filter[city_id]": params.city_id,
                "filter[price_from]": params.price_from,
                "filter[price_to]": params.price_to,
            }
        }).finally(() => {
            dispatch(setData("preLoader", false))
        })
    }

    const handleSearch = () => {

        getData({
            city_id: searchParams.city?.id,
            price_from: searchParams.price_from,
            price_to: searchParams.price_to,
        }).then(res => {
            if (res.data.success) {
                dispatch(changeValue("data", "list", res.data.data.data))
                dispatch(changeValue("data", "total_data", res.data.data.total))
                nagivate(`/?city_id=${searchParams.city?.id ? searchParams.city.id : ""}&price_from=${searchParams.price_from}&price_to=${searchParams.price_to}`)
            }
        })

        // urlParams.set("city_id", searchParams.city?.id.toString() ?? "")
        // urlParams.set("price_from", searchParams.price_from?.toString() ?? "")
        // urlParams.set("price_to", searchParams.price_to?.toString() ?? "")

        // setUrlParams(urlParams);

        closeModal()

    }

    const handleResetForm = () => {
        resetIsShowingDialog();
        dispatch(changeValue("searchParams", "city", null))
        dispatch(changeValue("searchParams", "price_from", ""))
        dispatch(changeValue("searchParams", "price_to", ""))

        // urlParams.set("city_id", "")
        // urlParams.set("price_from", "")
        // urlParams.set("price_to", "")

        setUrlParams(urlParams);
        setShowDialog(false);
    }

    const [showModal, setShowModal] = useState(false);

    // FOR RESET ALL DATA WHEN CLICK CLEAR BUTTON
    const [showDialog, setShowDialog] = useState(false);
    let [, , resetIsShowingDialog] = useTimeoutFn(() => setShowDialog(true), 1);
    //
    function closeModal() {
        setShowModal(false);
    }

    function openModal() {
        setShowModal(true);
    }

    const renderButtonOpenModal = () => {
        return (
            <button
                onClick={openModal}
                className="relative flex items-center w-full border border-neutral-200 dark:border-neutral-6000 px-4 py-4 pr-11 rounded-full shadow-lg"
            >
                <MagnifyingGlassIcon className="flex-shrink-0 w-5 h-5" />
                <div className="ml-3 flex-1 text-left overflow-hidden">
                    <span className="block font-medium text-sm">
                        {
                            searchParams.city?.id ?
                                searchParams.city.name :
                                "Şəhər seçin"
                        }
                    </span>
                    {/* <span className="block mt-0.5 text-xs font-light text-neutral-500 dark:text-neutral-400 line-clamp-1">
                        Kirayələr • Turlar
                    </span> */}
                </div>
                <span className="absolute right-2 top-1/2 transform -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-6000 dark:text-neutral-300">
                    <svg
                        viewBox="0 0 16 16"
                        aria-hidden="true"
                        role="presentation"
                        focusable="false"
                        className="block w-4 h-4"
                        fill="currentColor"
                    >
                        <path d="M5 8c1.306 0 2.418.835 2.83 2H14v2H7.829A3.001 3.001 0 1 1 5 8zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm6-8a3 3 0 1 1-2.829 4H2V4h6.17A3.001 3.001 0 0 1 11 2zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path>
                    </svg>
                </span>
            </button>
        );
    };

    return (
        <div className="HeroSearchForm2Mobile">
            {renderButtonOpenModal()}
            <Transition appear show={showModal} as={Fragment}>
                <Dialog
                    as="div"
                    className="HeroSearchFormMobile__Dialog relative z-max"
                    onClose={closeModal}
                >
                    <div className="fixed inset-0 bg-neutral-100 dark:bg-neutral-900">
                        <div className="flex h-full">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out transition-transform"
                                enterFrom="opacity-0 translate-y-52"
                                enterTo="opacity-100 translate-y-0"
                                leave="ease-in transition-transform"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-52"
                            >
                                <Dialog.Panel className="relative h-full overflow-hidden flex-1 flex flex-col justify-between ">
                                    {showDialog && (
                                        <Tab.Group manual>
                                            <div className="absolute right-4 top-4">
                                                <button
                                                    // className="border rounded border-white"
                                                    onClick={closeModal}>
                                                    <XMarkIcon className="w-7 h-7 text-black dark:text-white" />
                                                </button>
                                            </div>
                                            <Tab.List className="pt-12 flex w-full justify-center font-semibold text-sm sm:text-base text-neutral-500 dark:text-neutral-400 space-x-6 sm:space-x-8">
                                                {/* {["Kirayə", "Turlar"].map( */}
                                                {["Kirayə"].map(
                                                    (item, index) => (
                                                        <Tab key={index} as={Fragment}>
                                                            {({ selected }) => (
                                                                <div className="relative focus:outline-none focus-visible:ring-0 outline-none select-none">
                                                                    <div
                                                                        className={`${selected
                                                                            ? "text-black dark:text-white"
                                                                            : ""
                                                                            }  `}
                                                                    >
                                                                        {item}
                                                                    </div>
                                                                    {selected && (
                                                                        <span className="absolute inset-x-0 top-full border-b-2 border-black dark:border-white"></span>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </Tab>
                                                    )
                                                )}
                                            </Tab.List>
                                            <div className="flex-1 pt-3 px-1.5 sm:px-4 flex overflow-hidden">
                                                <Tab.Panels className="flex-1 overflow-y-auto hiddenScrollbar py-4">
                                                    <Tab.Panel>
                                                        <div className="transition-opacity animate-[myblur_0.4s_ease-in-out]">
                                                            {/* <StaySearchForm /> */}
                                                            <ProStaySearchForm />
                                                        </div>
                                                    </Tab.Panel>
                                                    <Tab.Panel>
                                                        <div className="transition-opacity animate-[myblur_0.4s_ease-in-out]">
                                                            <StaySearchForm />
                                                        </div>
                                                    </Tab.Panel>
                                                </Tab.Panels>
                                            </div>
                                            <div className="px-4 py-4 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-700 flex justify-between">
                                                <button
                                                    type="button"
                                                    className="font-semibold flex-shrink-0"
                                                    onClick={handleResetForm}
                                                >
                                                    Sıfırla
                                                </button>
                                                <ButtonSubmit
                                                    onClick={handleSearch}
                                                />
                                            </div>
                                        </Tab.Group>
                                    )}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default ProSearchFormMobileWrapper;
