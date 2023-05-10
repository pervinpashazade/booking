import SectionHero from "components/SectionHero/SectionHero";
import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
import React, { useEffect, useState } from "react";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import SectionOurFeatures from "components/SectionOurFeatures/SectionOurFeatures";
import SectionGridFeaturePlaces from "./SectionGridFeaturePlaces";
import SectionHowItWork from "components/SectionHowItWork/SectionHowItWork";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import { IPaginationProps, ISearchRoomParams, IStayProps, TaxonomyType } from "data/types";
import SectionGridAuthorBox from "components/SectionGridAuthorBox/SectionGridAuthorBox";
import SectionGridCategoryBox from "components/SectionGridCategoryBox/SectionGridCategoryBox";
import SectionBecomeAnAuthor from "components/SectionBecomeAnAuthor/SectionBecomeAnAuthor";
import SectionVideos from "./SectionVideos";
import SectionClientSay from "components/SectionClientSay/SectionClientSay";
import { Helmet } from "react-helmet";
import { apiUrl, appName } from "config";
import axios from "axios";
import { useSelector } from "react-redux";

function PageHome() {

  const [pagination, setPagination] = useState<IPaginationProps>({
    page: 1,
    per_page: 16,
    total: 0
  })

  const [list, setList] = useState<Array<IStayProps>>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    getData({
      page: pagination.page,
      per_page: pagination.per_page
    }).then(res => {
      if (res.data.success) {
        setList(res.data.data.data)
        setPagination(prevState => {
          return {
            ...prevState,
            total: res.data.data.total
          }
        })
      }
    }).catch(err => {
      console.log("account vendor/announcement error", err);
    })
  }, [])

  const getData = async (params: ISearchRoomParams) => {
    setLoading(true)
    return axios.get(apiUrl + "vendor/announcement", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
      },
      params: params
    }).finally(() => {
      setLoading(false)
    })
  }

  const getMoreData = () => {
    console.log("pagination", pagination);

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

  return (
    <div className="nc-PageHome relative overflow-hidden">
      <Helmet>
        <title>Ana səhifə | {appName}</title>
      </Helmet>

      {/* GLASSMOPHIN */}
      <BgGlassmorphism />

      <div className="container relative space-y-24 mb-24 lg:space-y-28 lg:mb-28">
        {/* SECTION HERO */}
        <SectionHero className="pt-10 lg:pt-6" />

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
