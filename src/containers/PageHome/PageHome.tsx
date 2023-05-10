import SectionHero from "components/SectionHero/SectionHero";
import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
import React, { useEffect, useState } from "react";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import SectionOurFeatures from "components/SectionOurFeatures/SectionOurFeatures";
import SectionGridFeaturePlaces from "./SectionGridFeaturePlaces";
import SectionHowItWork from "components/SectionHowItWork/SectionHowItWork";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import { IStayProps, TaxonomyType } from "data/types";
import SectionGridAuthorBox from "components/SectionGridAuthorBox/SectionGridAuthorBox";
import SectionGridCategoryBox from "components/SectionGridCategoryBox/SectionGridCategoryBox";
import SectionBecomeAnAuthor from "components/SectionBecomeAnAuthor/SectionBecomeAnAuthor";
import SectionVideos from "./SectionVideos";
import SectionClientSay from "components/SectionClientSay/SectionClientSay";
import { Helmet } from "react-helmet";
import { apiUrl, appName } from "config";
import axios from "axios";
import {useSelector} from "react-redux";

const DEMO_CATS: TaxonomyType[] = [
  {
    id: "1",
    href: "/listing-stay",
    name: "New Yourk",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/64271/queen-of-liberty-statue-of-liberty-new-york-liberty-statue-64271.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
  },
  {
    id: "2",
    href: "/listing-stay",
    name: "Singapore",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/7740160/pexels-photo-7740160.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "2",
    href: "/listing-stay",
    name: "Paris",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/739407/pexels-photo-739407.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "2",
    href: "/listing-stay",
    name: "London",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
  },
  {
    id: "2",
    href: "/listing-stay",
    name: "Tokyo",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/4151484/pexels-photo-4151484.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
  },
  {
    id: "2",
    href: "/listing-stay",
    name: "Maldives",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/3250613/pexels-photo-3250613.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
];

const DEMO_CATS_2: TaxonomyType[] = [
  {
    id: "1",
    href: "/listing-stay",
    name: "Enjoy the great cold",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/5764100/pexels-photo-5764100.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
  },
  {
    id: "222",
    href: "/listing-stay",
    name: "Sleep in a floating way",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/2869499/pexels-photo-2869499.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "3",
    href: "/listing-stay",
    name: "In the billionaire's house",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/7031413/pexels-photo-7031413.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "4",
    href: "/listing-stay",
    name: "Cool in the deep forest",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/247532/pexels-photo-247532.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "5",
    href: "/listing-stay",
    name: "In the billionaire's house",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/7031413/pexels-photo-7031413.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
];

function PageHome() {
  const page = useSelector((state: any) => state.page);
  const per_page = useSelector((state: any) => state.per_page);
  const [list, setList] = useState<Array<IStayProps>>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLoading(false)
    axios.get(apiUrl + "vendor/announcement", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
      },
      params: {
        per_page: per_page,
        page: page
      }
    }).then(res => {
      if (res.data.success) {
        setList(res.data.data.data)
        setLoading(true)
      }
    }).catch(err => {
      console.log("account vendor/announcement error", err);
    }).finally(() => {

    })
  }, [page,per_page])



  return (
    <div className="nc-PageHome relative overflow-hidden">
      <Helmet>
        <title>Ana səhifə | {appName}</title>
      </Helmet>

      {/* GLASSMOPHIN */}
      <BgGlassmorphism />

      <div className="container relative space-y-24 mb-24 lg:space-y-28 lg:mb-28">
        {/* SECTION HERO */}
        {/* <SectionHero className="pt-10 lg:pt-16 lg:pb-16" /> */}
        <SectionHero className="pt-10 lg:pt-6" />

        {/* SECTION 1 */}
        {/* <SectionSliderNewCategories
          categories={DEMO_CATS}
          uniqueClassName="PageHome_s1"
        /> */}

        {/* SECTION2 */}
        {/* <SectionOurFeatures /> */}

        {/* SECTION */}
        <div className="relative py-16">
          <BackgroundSection />
          <SectionGridFeaturePlaces loading={loading} data={list} heading="Sizin üçün seçilənlər" subHeading="Seçilmiş qalmaq üçün yerlər" />
        </div>

        {/* SECTION */}
        {/* <SectionHowItWork /> */}

        {/* SECTION 1 */}
        {/* <div className="relative py-16">
          <BackgroundSection className="bg-orange-50 dark:bg-black dark:bg-opacity-20 " />
          <SectionSliderNewCategories
            categories={DEMO_CATS_2}
            categoryCardType="card4"
            itemPerRow={4}
            heading="Suggestions for discovery"
            subHeading="Popular places to stay that Chisfis recommends for you"
            sliderStyle="style2"
            uniqueClassName="PageHome_s2"
          />
        </div> */}

        {/* SECTION */}
        {/* <SectionSubscribe2 /> */}

        {/* SECTION */}
        {/* <div className="relative py-16">
          <BackgroundSection className="bg-orange-50 dark:bg-black dark:bg-opacity-20 " />
          <SectionGridAuthorBox />
        </div> */}

        {/* SECTION */}
        {/* <SectionGridCategoryBox /> */}

        {/* SECTION */}
        {/* <div className="relative py-16">
          <BackgroundSection />
          <SectionBecomeAnAuthor />
        </div> */}

        {/* SECTION 1 */}
        {/* <SectionSliderNewCategories
          heading="Explore by types of stays"
          subHeading="Explore houses based on 10 types of stays"
          categoryCardType="card5"
          itemPerRow={5}
          uniqueClassName="PageHome_s3"
        /> */}

        {/* SECTION */}
        {/* <SectionVideos /> */}

        {/* SECTION */}
        {/* <div className="relative py-16">
          <BackgroundSection />
          <SectionClientSay uniqueClassName="PageHome_" />
        </div> */}
      </div>
    </div>
  );
}

export default PageHome;
