import { Tab } from "@headlessui/react";
import CarCard from "components/CarCard/CarCard";
import ExperiencesCard from "components/ExperiencesCard/ExperiencesCard";
import ProStayCard from "components/StayCard/ProStayCard";
import {
  DEMO_CAR_LISTINGS,
  DEMO_EXPERIENCES_LISTINGS,
  DEMO_STAY_LISTINGS,
} from "data/listings";
import React, { Fragment, useEffect, useState } from "react";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import CommonLayout from "./CommonLayout";
import { IPaginationProps, IStayProps } from "../../data/types";
import axios from "axios";
import { apiUrl, appName } from "../../config";
import Helmet from "react-helmet";
import { useAppSelector } from "store/store";

const AccountSavelists = () => {
  let [categories] = useState(["Kirayə", "Turlar"]);

  // const cities = useAppSelector(store => store.staticData.cityList)

  const [pagination, setPagination] = useState<IPaginationProps>({
    page: 1,
    per_page: 10,
    total: 0,
  })
  const [list, setList] = useState<Array<IStayProps>>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {

    // axios.get(apiUrl + "shared/cities").then((cityRes) => {
    //   if (cityRes.data.success) {

    //     getData({
    //       page: pagination.page,
    //       per_page: pagination.per_page,
    //     }).then((res: any) => {
    //       if (res.data.success) {
    //         setList(res.data.data.data)
    //         setPagination({
    //           page: res.data.data.current_page,
    //           per_page: res.data.per_page,
    //           total: res.data.data.total
    //         })
    //       }
    //     }).catch(err => {
    //       console.log("account vendor/announcement-favorite/ error", err);
    //     })
    //   }
    // })

    getData({
      page: pagination.page,
      per_page: pagination.per_page,
    }).then((res: any) => {
      if (res.data.success) {
        setList(res.data.data.data)
        setPagination({
          page: res.data.data.current_page,
          per_page: res.data.per_page,
          total: res.data.data.total
        })
      }
    }).catch(err => {
      console.log("account vendor/announcement-favorite/ error", err);
    })

  }, [])

  const getData = async (params: { page: number, per_page: number }) => {
    setLoading(true)
    return axios.get(apiUrl + "vendor/announcement-favorite/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
      },
      params: {
        "page": params.page,
        "per_page": params.per_page,
      }
    }).finally(() => {
      setLoading(false)
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
            <Tab.List className="flex space-x-1 overflow-x-auto">
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
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel className="mt-8">
                <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {list.map((stay: any) => (
                    <ProStayCard key={stay.id} data={stay} />
                  ))}
                </div>
                <div className="flex mt-11 justify-center items-center">
                  <ButtonSecondary>Show me more</ButtonSecondary>
                </div>
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
                  <ButtonSecondary>Show me more</ButtonSecondary>
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
