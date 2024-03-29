import React, { FC } from "react";
import GallerySlider from "components/GallerySlider/GallerySlider";
import { DEMO_STAY_LISTINGS } from "data/listings";
import { IStayProps } from "data/types";
import StartRating from "components/StartRating/StartRating";
import { Link } from "react-router-dom";
import BtnLikeIcon from "components/BtnLikeIcon/BtnLikeIcon";
import SaleOffBadge from "components/SaleOffBadge/SaleOffBadge";
import Badge from "shared/Badge/Badge";
import { manat_icon } from "contains/contants";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export interface StayCardProps {
    className?: string;
    data: IStayProps;
    size?: "default" | "small";
}

// const DEMO_DATA = DEMO_STAY_LISTINGS[0];

const StayCard: FC<StayCardProps> = ({
    size = "default",
    className = "",
    data,
}) => {

    const {
        id,
        user,
        user_id,
        city,
        category_id,
        category,
        area,
        price,
        currency,
        address,
        bathroom_count,
        person_count,
        is_breakfast,
        breakfast_fee,
        condition: ConditionTypes,
        title,
        list_title,
        slug,
        content,
        image,
        is_active,
        is_vip,
    } = data;

    const renderSliderGallery = () => {
        return (
            <div className=" w-full h-[220px]">
                {/*<GallerySlider*/}
                {/*    uniqueID={`StayCard_${id}`}*/}
                {/*    ratioClass="aspect-w-4 aspect-h-3 "*/}
                {/*    galleryImgs={data.images.map(item => item.url_full)}*/}
                {/*    href={`/room/${slug}`}*/}
                {/*/>*/}

                {/*@ts-ignore*/}
                <Swiper navigation={true} pagination={true} modules={[Pagination,Navigation]} className="mySwiper">
                    {
                        data.images.map(item => {
                            return(
                                    <SwiperSlide key={item.url_full}>
                                        <Link to={`/room/${slug}`} className={`block aspect-w-4 aspect-h-3 h-full`}>
                                            <img src={item.url_full}/>
                                        </Link>
                                    </SwiperSlide>

                                // <SwiperSlide><img src={item.url_full}/></SwiperSlide>
                            )
                        })
                    }
                </Swiper>

                {/* <BtnLikeIcon isLiked={like} className="absolute right-3 top-3 z-[1]" /> */}
                {/* {saleOff && <SaleOffBadge className="absolute left-3 top-3" />} */}
            </div>
        );
    };

    const renderContent = () => {
        return (
            <div className={size === "default" ? "p-4 space-y-4" : "p-3 space-y-2"}>
                <div className="space-y-2">
                    {/* <span className="text-sm text-neutral-500 dark:text-neutral-400">
                        {title} · {room_count} otaq
                    </span> */}
                    {/*<img src="https://yt3.googleusercontent.com/ytc/AOPolaSYIvTrgKFP_GYCt9wGKhBdX32Z41xmVDrrntzCYQ=s900-c-k-c0x00ffffff-no-rj"/>*/}
                    <div className="flex items-center space-x-2">
                        {/* {isAds && <Badge name="ADS" color="green" />} */}
                        {/* <Badge name="ADS" color="green" /> */}
                        <h2
                            className={` font-medium capitalize ${size === "default" ? "text-lg" : "text-base"
                                }`}
                        >
                            <span className="line-clamp-1">{list_title}</span>
                        </h2>
                    </div>
                    <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2">
                        {size === "default" && (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                            </svg>
                        )}
                        <span className="">
                            {city.name}
                            {/* {address} */}
                        </span>
                    </div>
                </div>
                <div className="w-14 border-b border-neutral-100 dark:border-neutral-800"></div>
                <div className="flex justify-between items-center">
                    <span className="text-base font-semibold">
                        {price} {manat_icon}
                        {` `}
                        {size === "default" && (
                            <span className="text-sm text-neutral-500 dark:text-neutral-400 font-normal">
                                /gün
                            </span>
                        )}
                    </span>
                    {/* {!!reviewStart && (
                        <StartRating reviewCount={reviewCount} point={reviewStart} />
                    )} */}
                </div>
            </div>
        );
    };
    // console.log("dsadfsa")
    return (
        <div
            className={`proStayCardBoxShadow nc-StayCard group relative bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl overflow-hidden will-change-transform hover:shadow-xl transition-shadow ${className}`}
            data-nc-id="StayCard"
        >
            {renderSliderGallery()}
            <Link to={`/room/${slug}`}>{renderContent()}</Link>
        </div>
    );
};

export default StayCard;
