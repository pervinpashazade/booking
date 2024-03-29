import { FC, useEffect, useState } from "react";
import CommentListing from "components/CommentListing/CommentListing";

import Avatar from "shared/Avatar/Avatar";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import { Helmet } from "react-helmet";
import { useAppDispatch, useAppSelector } from "store/store";
import { apiUrl, appName } from "config";
import axios from "axios";
import { IStayProps } from "data/types";
import ProStayCard from "components/StayCard/ProStayCard";
import { logout } from "store/action";
import moment from "moment";
import { useParams } from "react-router-dom";

export interface AuthorPageProps {
  className?: string;
}

const ProAuthorPage: FC<AuthorPageProps> = ({ className = "" }) => {

  const {id} = useParams()

  const [list, setList] = useState<Array<IStayProps>>([])

  useEffect(() => {
    // if (!user) {
    //   dispatch(logout())
    //   return
    // }

    // axios.get(apiUrl + "vendor/announcement", {
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem("access_token")}`
    //   },
    //   params: {
    //     me: true
    //   }
    // }).then(res => {
    //   if (res.data.success) {
    //     setList(res.data.data.data)
    //   }
    // }).catch(err => {
    //   console.log("account vendor/announcement error", err);
    // }).finally(() => {

    // })

    // https://home.ramilhuseynov.com/api/vendor/announcement?page=1&per_page=12&filter[price_from]=10&filter[price_to]=5000

    axios.get(apiUrl + "vendor/announcement", {
      params: {
        author_id: id,
      }
    }).then(res => {
      if (res.data.success) {
        setList(res.data.data.data)
      }
    }).catch(err => {
      console.log("vendor details error", err);
      // navigate("/")
    }).finally(() => {

    })
  }, [])

  const renderSidebar = () => {
    return (
      <div className=" w-full flex flex-col items-center text-center sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-7 px-0 sm:p-6 xl:p-8">
        <Avatar
          hasChecked
          hasCheckedClass="w-6 h-6 -top-0.5 right-2"
          sizeClass="w-28 h-28"
        />

        {/* ---- */}
        <div className="space-y-3 text-center flex flex-col items-center">
          <h2 className="text-3xl font-semibold">{list[0]?.user?.name ?? ""} {list[0]?.user?.surname ?? ""}</h2>
          {/* <StartRating className="!text-base" /> */}
        </div>

        {/* ---- */}
        {/* <p className="text-neutral-500 dark:text-neutral-400">
          Providing lake views, The Symphony 9 Tam Coc in Ninh Binh provides
          accommodation, an outdoor.
        </p> */}

        {/* ---- */}
        {/* <SocialsList
          className="!space-x-3"
          itemClass="flex items-center justify-center w-9 h-9 rounded-full bg-neutral-100 dark:bg-neutral-800 text-xl"
        /> */}

        {/* ---- */}
        <div className="border-b border-neutral-200 dark:border-neutral-700 w-14"></div>

        {/* ---- */}
        <p className="text-neutral-500 dark:text-neutral-400">
          {list[0]?.user?.email ?? ""}
        </p>

        {/* ---- */}
        <div className="space-y-4">
          {/* <div className="flex items-center space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-neutral-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span className="text-neutral-6000 dark:text-neutral-300">
              Ha Noi, Viet Nam
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-neutral-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
            <span className="text-neutral-6000 dark:text-neutral-300">
              Speaking English
            </span>
          </div> */}

          <div className="flex items-center space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-neutral-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-neutral-6000 dark:text-neutral-300">
              Qeydiyyat tarixi {list[0]?.user?.created_at ? moment(list[0].user.created_at).format("DD MMMM YYYY") : ""}
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-neutral-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
            <span className="text-neutral-6000 dark:text-neutral-300">
            {list[0]?.user?.phone ?? ""}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const renderSection1 = () => {
    return (
      <div className="listingSection__wrap">
        <div>
          <h2 className="text-2xl font-semibold">İstifadəçinin bütün elanları</h2>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        <div>
          <div className="mt-8 grid grid-cols-1 gap-6 md:gap-7 sm:grid-cols-2">
            {list.map((item) => (
              <ProStayCard key={item.id} data={item} />
            ))}
          </div>
          {/* <div className="flex mt-11 justify-center items-center">
            <ButtonSecondary>Show me more</ButtonSecondary>
          </div> */}
        </div>
      </div>
    );
  };

  const renderSection2 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold">Reviews (23 reviews)</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        {/* comment */}
        <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
          <CommentListing hasListingTitle className="pb-8" />
          <CommentListing hasListingTitle className="py-8" />
          <CommentListing hasListingTitle className="py-8" />
          <CommentListing hasListingTitle className="py-8" />
          <div className="pt-8">
            <ButtonSecondary>View more 20 reviews</ButtonSecondary>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`nc-AuthorPage ${className}`} data-nc-id="AuthorPage">
      <Helmet>
        <title>Şəxsi kabinet | {appName}</title>
      </Helmet>
      <main className="container mt-12 mb-24 lg:mb-32 flex flex-col lg:flex-row">
        <div className="block flex-grow mb-24 lg:mb-0">
          <div className="lg:sticky lg:top-24">{renderSidebar()}</div>
        </div>
        <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:pl-10 flex-shrink-0">
          {renderSection1()}
          {/* {renderSection2()} */}
        </div>
      </main>
    </div>
  );
};

export default ProAuthorPage;
