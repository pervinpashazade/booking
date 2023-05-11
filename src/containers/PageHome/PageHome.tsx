import SectionHero from "components/SectionHero/SectionHero";
import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
import React, { useEffect, useState } from "react";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import SectionOurFeatures from "components/SectionOurFeatures/SectionOurFeatures";
import SectionGridFeaturePlaces from "./SectionGridFeaturePlaces";
import SectionHowItWork from "components/SectionHowItWork/SectionHowItWork";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import { ICityProps, IPaginationProps, ISearchRoomParams, IStayProps, TaxonomyType } from "data/types";
import SectionGridAuthorBox from "components/SectionGridAuthorBox/SectionGridAuthorBox";
import SectionGridCategoryBox from "components/SectionGridCategoryBox/SectionGridCategoryBox";
import SectionBecomeAnAuthor from "components/SectionBecomeAnAuthor/SectionBecomeAnAuthor";
import SectionVideos from "./SectionVideos";
import SectionClientSay from "components/SectionClientSay/SectionClientSay";
import { Helmet } from "react-helmet";
import { apiUrl, appName } from "config";
import axios from "axios";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch } from "store/store";
import { changeValue, setData } from "store/action";

function PageHome() {

  const dispatch = useAppDispatch()

  const [pagination, setPagination] = useState<IPaginationProps>({
    page: 1,
    per_page: 16,
    total: 0
  })

  // @ts-ignores
  const searchParams = useSelector(store => store.searchParams)

  let [urlParams, setUrlParams] = useSearchParams();

  const [list, setList] = useState<Array<IStayProps>>([])
  const [loading, setLoading] = useState<boolean>(false)

  const [cities, setCities] = useState<Array<ICityProps>>([]);

  useEffect(() => {

    let page = urlParams.get("page") ?? searchParams.page;
    let per_page = urlParams.get("per_page") ?? searchParams.per_page;
    let city_id = urlParams.get("city_id") ?? searchParams.city_id;
    let price_from = urlParams.get("price_from") ?? searchParams.price_from;
    let price_to = urlParams.get("price_to") ?? searchParams.price_to;

    axios.get(apiUrl + "shared/cities").then((cityRes) => {
      if (cityRes.data.success) {
        setCities(cityRes.data.data);

        getData({
          page,
          per_page,
          city_id,
          price_from,
          price_to,
        }).then(res => {
          if (res.data.success) {
            setList(res.data.data.data)
            setPagination({
              page: res.data.data.current_page,
              per_page: res.data.per_page,
              total: res.data.data.total
            })

            const params = {
              page: res.data.data.current_page,
              per_page: res.data.data.per_page,
              city: cityRes.data.data.find((x: ICityProps) => x.id === Number(city_id)),
              price_from,
              price_to,
            }

            dispatch(setData("searchParams", params))
          }
        }).catch(err => {
          console.log("account vendor/announcement error", err);
        })
      }
    })

  }, [])

  const getData = async (params: ISearchRoomParams) => {
    setLoading(true)
    return axios.get(apiUrl + "vendor/announcement", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
      },
      params: {
        "page": params.page,
        "per_page": params.per_page,
        "filter[city_id]": params.city_id,
        "price_from": params.price_from,
        "price_to": params.price_to,
      }
    }).finally(() => {
      setLoading(false)
    })
  }

  const getMoreData = () => {
    getData({ page: pagination.page + 1, per_page: pagination.per_page }).then(res => {
      if (res.data.success) {
        setList(prevState => [
          ...prevState,
          ...res.data.data.data
        ])
        setPagination(prevState => {
          return {
            ...prevState,
            page: prevState.page + 1
          }
        })
      }
    })
  }

  const filteredData = (params: ISearchRoomParams) => {
    getData(params).then(res => {
      if (res.data.success) {
        setList(res.data.data.data)
        setPagination(prevState => {
          return {
            ...prevState,
            total: res.data.data.total
          }
        })
      }
    })
  }

  return (
    <div className="nc-PageHome relative overflow-hidden">
      <Helmet>
        <title>Ana səhifə | {appName}</title>
      </Helmet>

      {/* GLASSMOPHIN */}
      <BgGlassmorphism />

      <div className="container relative space-y-24 mb-24 lg:space-y-28 lg:mb-28">
        {/* SECTION HERO */}
        <SectionHero className="pt-10 lg:pt-6" getRoomData={filteredData} />

        {/* SECTION */}
        <div className="relative py-16">
          <BackgroundSection />
          <SectionGridFeaturePlaces
            loading={loading}
            data={list}
            getData={getMoreData}
            totalData={pagination.total}
          />
        </div>
      </div>
    </div>
  );
}

export default PageHome;
