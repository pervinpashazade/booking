import { Fragment, useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import ExperiencesCard from "components/ExperiencesCard/ExperiencesCard";
import ProStayCard from "components/StayCard/ProStayCard";
import {
  DEMO_CAR_LISTINGS,
  DEMO_EXPERIENCES_LISTINGS,
  DEMO_STAY_LISTINGS,
} from "data/listings";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import CommonLayout from "./CommonLayout";
import axios from "axios";
import { apiUrl, appName } from "../../config";
import Helmet from "react-helmet";
import { useAppDispatch, useAppSelector } from "store/store";
import { changeValue, setData } from "store/action";

const AccountSavelists = () => {
  // let [categories] = useState(["Kirayə", "Turlar"]);

  const wishlist = useAppSelector(store => store.account.wishlist)
  const preLoader = useAppSelector(store => store.preLoader)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!wishlist.data.length) {
      getData({
        page: wishlist.pagination.page,
        per_page: wishlist.pagination.per_page,
      }).then((res: any) => {
        if (res.data.success) {
          dispatch(changeValue("account", "wishlist", res.data.data.data, "data"))
          dispatch(changeValue(
            "account",
            "wishlist",
            {
              page: res.data.data.current_page,
              per_page: res.data.data.per_page,
              total: res.data.data.total
            },
            "pagination"))
        }
      }).catch(err => {
        console.log("account vendor/announcement-favorite/ error", err);
      })
    }

  }, [])

  const getData = async (params: { page: number, per_page: number }) => {
    dispatch(setData("preLoader", true))
    return axios.get(apiUrl + "vendor/announcement-favorite", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
      },
      params,
    }).finally(() => {
      dispatch(setData("preLoader", false))
    })
  }

  const getMoreData = () => {
    getData({ page: wishlist.pagination.page + 1, per_page: wishlist.pagination.per_page }).then(res => {
      if (res.data.success) {
        dispatch(changeValue("account", "wishlist", [...wishlist.data, ...res.data.data.data], "data"))
        dispatch(changeValue(
          "account",
          "wishlist",
          {
            ...wishlist.pagination,
            page: wishlist.pagination.page + 1,

          },
          "pagination"
        ))
      }
    })
  }

  const renderSection1 = () => {
    return (
      <div className="space-y-6 sm:space-y-8">
        <Helmet>
          <title>Bəyəndiklərim | {appName}</title>
        </Helmet>
        <div>
          <h2 className="text-3xl font-semibold">Bəyəndiklərim</h2>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        <div>
          <Tab.Group>
            {/* <Tab.List className="flex space-x-1 overflow-x-auto">
              {categories.map((item) => (
                <Tab key={item} as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={`flex-shrink-0 block !leading-none font-medium px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full focus:outline-none ${selected
                        ? "bg-secondary-900 text-secondary-50 "
                        : "text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-100 hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                        } `}
                    >
                      {item}
                    </button>
                  )}
                </Tab>
              ))}
            </Tab.List> */}
            <Tab.Panels>
              <Tab.Panel className="mt-8">
                <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {wishlist.data.map((stay: any) => (
                    <ProStayCard key={stay.id} data={stay} />
                  ))}
                </div>
                {
                  wishlist.data.length < wishlist.pagination.total &&
                  <div className="flex mt-11 justify-center items-center">
                    <ButtonSecondary
                      loading={preLoader}
                      onClick={getMoreData}
                    >
                      Daha çox
                    </ButtonSecondary>
                  </div>
                }
              </Tab.Panel>
              <Tab.Panel className="mt-8">
                <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {DEMO_EXPERIENCES_LISTINGS.filter((_, i) => i < 8).map(
                    (stay) => (
                      <ExperiencesCard key={stay.id} data={stay} />
                    )
                  )}
                </div>
                <div className="flex mt-11 justify-center items-center">
                  <ButtonSecondary>Daha çox</ButtonSecondary>
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    );
  };

  return (
    <div>
      <CommonLayout>{renderSection1()}</CommonLayout>
    </div>
  );
};

export default AccountSavelists;
