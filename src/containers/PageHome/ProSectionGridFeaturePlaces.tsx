import { FC, ReactNode } from "react";
import { IStayProps, StayDataType } from "data/types";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ProStayCard from "components/StayCard/ProStayCard";
import { useAppSelector } from "store/store";
import rightImgPng from "images/our-features.png";

//
export interface ProSectionGridFeaturePlacesProps {
    stayListings?: StayDataType[];
    gridClass?: string;
    heading?: ReactNode;
    subHeading?: ReactNode;
    headingIsCenter?: boolean;
    tabs?: string[];
    data: Array<IStayProps>
    loading?: boolean
    getData?: Function
    per_page: number
}

const ProSectionGridFeaturePlaces: FC<ProSectionGridFeaturePlacesProps> = ({
    data = [],
    gridClass = "",
    loading = false,
    getData,
}) => {

    const total_data = useAppSelector(store => store.data.total_data)

    const renderCard = (stay: IStayProps) => {
        return <ProStayCard key={stay.id} data={stay} />;
    };

    // console.log("data", data)
    // console.log("totalData", total_data)
    return (
        <div className="nc-SectionGridFeaturePlaces relative">
            {data.length > 0 ?
                <div className={`grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${gridClass}`}>
                    {data.map((item) => renderCard(item))}
                </div> :
                <div className="grid grid-cols-1 flex flex-wrap justify-center align-content-center align-middle">
                    <p className="text-md text-center mt-5 mb-14">Sizin sorğunuza uyğun nəticə tapılmadı</p>
                    <img src={rightImgPng} style={{width: "500px", margin: "0 auto"}}/>
                </div>
            }



            {
                data.length !== total_data ?
                    <div className="flex mt-8 md:mt-12 justify-center items-center">
                        <ButtonPrimary
                            loading={loading}
                            onClick={() => getData && getData()}
                        >
                            Daha çox
                        </ButtonPrimary>
                    </div> : ""
            }
        </div>
    );
};

export default ProSectionGridFeaturePlaces;
