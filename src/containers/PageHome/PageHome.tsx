import { useEffect, useState } from "react";
import SectionHero from "components/SectionHero/SectionHero";
import ProSectionGridFeaturePlaces from "./ProSectionGridFeaturePlaces";
import {
  ICityProps,
  IPaginationProps,
  ISearchRoomParams,
} from "data/types";
import { Helmet } from "react-helmet";
import { apiUrl, appName } from "config";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store/store";
import { changeValue, setData } from "store/action";

function PageHome() {

  const dispatch = useAppDispatch()

  const searchParams = useAppSelector(store => store.searchParams)
  const cityList = useAppSelector(store => store.staticData.cityList)

  // const [pagination, setPagination] = useState<IPaginationProps>({
  //   page: 1,
  //   per_page: 1,
  //   total: 0
  // })

  let [urlParams] = useSearchParams()

  const list = useAppSelector(store => store.data.list)

  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    
    let page = urlParams.get("page") ?? searchParams.page;
    let per_page = urlParams.get("per_page") ?? searchParams.per_page;
    let city_id = urlParams.get("city_id") ?? searchParams.city?.id;
    let price_from = urlParams.get("price_from") ?? searchParams.price_from;
    let price_to = urlParams.get("price_to") ?? searchParams.price_to;

    getData({
      page,
      per_page,
      city_id,
      price_from,
      price_to,
    }).then(res => {
      if (res.data.success) {

        dispatch(changeValue("data", "list", res.data.data.data))
        dispatch(changeValue("data", "total_data", res.data.data.total))

        const params = {
          page: res.data.data.current_page,
          per_page: res.data.data.per_page,
          city: cityList.find((x: ICityProps) => x.id === Number(city_id)),
          price_from,
          price_to,
        }

        dispatch(setData("searchParams", params))
      }
    }).catch(err => {
      console.log("account vendor/announcement error", err);
    }).finally(() => {
    })

  }, [])

  const getData = async (params: ISearchRoomParams) => {
    setLoading(true)
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
      setLoading(false)
      dispatch(setData("preLoader", false))
    })
  }

  const getMoreData = () => {
    getData({
      city_id: searchParams.city?.id ,
      page: searchParams.page + 1,
      per_page: searchParams.per_page,
    }).then(res => {
      if (res.data.success) {
        dispatch(changeValue("data", "list", [...list, ...res.data.data.data]))
        dispatch(changeValue("data", "total_data", res.data.data.total))
        dispatch(changeValue("searchParams", "page", searchParams.page + 1))
      }
    })
  }

  const filteredData = (params: ISearchRoomParams) => {
    getData(params).then(res => {
      if (res.data.success) {
        dispatch(changeValue("data", "list", res.data.data.data))
        dispatch(changeValue("data", "total_data", res.data.data.total))
      }
    })
  }

  return (
    <div className="nc-PageHome relative overflow-hidden">
      <Helmet>
        <title>Ana səhifə | {appName}</title>
      </Helmet>

      {/* GLASSMOPHIN */}
      {/* <BgGlassmorphism /> */}

      <div className="container relative space-y-24 mb-8 md:mb-12 lg:space-y-28 lg:mb-12">
        {/* SECTION HERO */}
        <SectionHero className="pt-0 lg:pt-6" getRoomData={filteredData} />

        {/* SECTION */}
        <div className="relative pt-12 !mt-0 lg:!mt-0">
          {/* <BackgroundSection /> */}
          <ProSectionGridFeaturePlaces
            loading={loading}
            data={list}
            getData={getMoreData}
            per_page={Number(searchParams.per_page)}
          />
        </div>
      </div>
    </div>
  );
}

export default PageHome;
