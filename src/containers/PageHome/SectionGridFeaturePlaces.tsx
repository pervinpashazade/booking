import { FC, ReactNode } from "react";
import { IStayProps, StayDataType } from "data/types";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import HeaderFilter from "./HeaderFilter";
import ProStayCard from "components/StayCard/ProStayCard";

//
export interface SectionGridFeaturePlacesProps {
  stayListings?: StayDataType[];
  gridClass?: string;
  heading?: ReactNode;
  subHeading?: ReactNode;
  headingIsCenter?: boolean;
  tabs?: string[];
  data: Array<IStayProps>
  loading?: boolean
  getData?: Function
  totalData: number,
}

const SectionGridFeaturePlaces: FC<SectionGridFeaturePlacesProps> = ({
  data = [],
  gridClass = "",
  heading = "Featured places to stay",
  subHeading = "Popular places to stay that Chisfis recommends for you",
  headingIsCenter,
  tabs = ["Hamısı", "Evlər", "Turlar", "Restoranlar"],
  loading = false,
  getData,
  totalData = 0,
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


        {/*{*/}
        {/*  new Array(150).fill(0).map((item, key) => (*/}
        {/*    <div key={key} className="card">*/}
        {/*      <img*/}
        {/*        className="card-img-top"*/}
        {/*        src="https://yt3.googleusercontent.com/ytc/AOPolaSYIvTrgKFP_GYCt9wGKhBdX32Z41xmVDrrntzCYQ=s900-c-k-c0x00ffffff-no-rj"*/}
        {/*        alt="Card image cap"*/}
        {/*      />*/}
        {/*      <div className="card-body">*/}
        {/*        <h5 className="card-title">Card title</h5>*/}
        {/*        <p className="card-text">*/}
        {/*          Some quick example text to build on the card title and make up the bulk of the card's content.*/}
        {/*        </p>*/}
        {/*        <a href="#" className="btn btn-primary">*/}
        {/*          Go somewhere*/}
        {/*        </a>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  ))*/}
        {/*}*/}
      </div>
      {
        data.length < totalData &&
        <div className="flex mt-16 justify-center items-center">
          <ButtonPrimary
            loading={loading}
            onClick={() => getData && getData()}
          >
            Daha çox
          </ButtonPrimary>
        </div>
      }
    </div>
  );
};

export default SectionGridFeaturePlaces;
