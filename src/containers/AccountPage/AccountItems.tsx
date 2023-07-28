import { Fragment, useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import CarCard from "components/CarCard/CarCard";
import ExperiencesCard from "components/ExperiencesCard/ExperiencesCard";
import ProStayCard from "components/StayCard/ProStayCard";
import {
  DEMO_EXPERIENCES_LISTINGS,
} from "data/listings";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import CommonLayout from "./CommonLayout";
import { IStayProps } from "../../data/types";
import axios from "axios";
import { apiUrl, appName } from "../../config";
import Helmet from "react-helmet"
import { useAppDispatch, useAppSelector } from "store/store";
import { changeValue, setData } from "store/action";
import { status_list } from "store/staticData";

const AccountItems = () => {

  const dispatch = useAppDispatch()
  const active_items = useAppSelector(store => store.account.active_items)
  const preLoader = useAppSelector(store => store.preLoader)

  const [activeTab, setActiveTab] = useState(2)

  useEffect(() => {
    getData({
      page: active_items.pagination.page,
      per_page: active_items.pagination.per_page,
    }).then((res: any) => {
      if (res.data.success) {
        dispatch(changeValue("account", "active_items", res.data.data.data, "data"))
        dispatch(changeValue(
          "account",
          "active_items",
          {
            page: res.data.data.current_page,
            per_page: res.data.data.per_page,
            total: res.data.data.total
          },
          "pagination"))
      }
    }).catch(err => {
      console.log("account page announcement error", err);
    })
  }, [activeTab])

  const getData = async (params: { page: number, per_page: number }) => {
    dispatch(setData("preLoader", true))
    return axios.get(apiUrl + `vendor/announcement?filter[status_id]=${activeTab}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
      },
      params: {
        ...params,
        me: true
      },
    }).finally(() => {
      dispatch(setData("preLoader", false))
    })
  }

  const getMoreData = () => {
    getData({ page: active_items.pagination.page + 1, per_page: active_items.pagination.per_page }).then(res => {
      if (res.data.success) {
        dispatch(changeValue("account", "active_items", [...active_items.data, ...res.data.data.data], "data"))
        dispatch(changeValue(
          "account",
          "active_items",
          {
            ...active_items.pagination,
            page: active_items.pagination.page + 1,

          },
          "pagination"
        ))
      }
    })
  }

  const renderSection1 = () => {
    return (
      <div className="space-y-6 sm:space-y-8">
        <div>
          <h2 className="text-3xl font-semibold">Elanlarım</h2>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        <div>
          <Tab.Group>
            <Tab.List className="flex space-x-1 overflow-x-auto">
              {status_list.map((item) => (
                <Tab key={item.id} as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={`flex-shrink-0 block !leading-none font-medium px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full focus:outline-none ${selected
                        ? "bg-secondary-900 text-secondary-50 "
                        : "text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-100 hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                        } `}
                        onClick={() => setActiveTab(item.id)}
                    >
                      {item.name}
                    </button>
                  )}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel className="mt-8">
                <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {active_items.data.map((stay) => (
                    <ProStayCard key={stay.id} data={stay} />
                  ))}
                </div>
                {
                  active_items.data.length < active_items.pagination.total &&
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
                  {active_items.data.map((stay) => (
                    <ProStayCard key={stay.id} data={stay} />
                  ))}
                </div>
                {
                  active_items.data.length < active_items.pagination.total &&
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
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Helmet>
        <title>Elanlarım | {appName}</title>
      </Helmet>
      <CommonLayout>{renderSection1()}</CommonLayout>
    </div>
  );
};

export default AccountItems;
