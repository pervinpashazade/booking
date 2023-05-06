import React, { FC, ReactNode } from "react";
import { DEMO_STAY_LISTINGS } from "data/listings";
import { IStayProps, StayDataType } from "data/types";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import HeaderFilter from "./HeaderFilter";
import ProStayCard from "components/StayCard/ProStayCard";

// OTHER DEMO WILL PASS PROPS
const DEMO_DATA: StayDataType[] = DEMO_STAY_LISTINGS.filter((_, i) => i < 8);

//
export interface SectionGridFeaturePlacesProps {
  stayListings?: StayDataType[];
  gridClass?: string;
  heading?: ReactNode;
  subHeading?: ReactNode;
  headingIsCenter?: boolean;
  tabs?: string[];
  data: Array<IStayProps>
}

const SectionGridFeaturePlaces: FC<SectionGridFeaturePlacesProps> = ({
  data = [],
  stayListings = DEMO_DATA,
  gridClass = "",
  heading = "Featured places to stay",
  subHeading = "Popular places to stay that Chisfis recommends for you",
  headingIsCenter,
  tabs = ["Hamısı", "Evlər", "Turlar", "Restoranlar"],
}) => {
  const renderCard = (stay: IStayProps) => {
    return <ProStayCard key={stay.id} data={stay} />;
  };

  return (
    <div className="nc-SectionGridFeaturePlaces relative">
      {/*<HeaderFilter*/}
      {/*  tabActive={"Hamısı"}*/}
      {/*  subHeading={subHeading}*/}
      {/*  tabs={tabs}*/}
      {/*  heading={heading}*/}
      {/*  onClickTab={() => {}}*/}
      {/*/>*/}
      <div
        className={`grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${gridClass}`}
      >
        {data.map((item) => renderCard(item))}
      </div>
      <div className="flex mt-16 justify-center items-center">
        <ButtonPrimary loading>Show me more</ButtonPrimary>
      </div>
    </div>
  );
};

export default SectionGridFeaturePlaces;
