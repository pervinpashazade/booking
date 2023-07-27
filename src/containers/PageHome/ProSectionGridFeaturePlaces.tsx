import { FC, ReactNode } from "react";
import { IStayProps, StayDataType } from "data/types";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ProStayCard from "components/StayCard/ProStayCard";
import { useAppSelector } from "store/store";

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

    console.log("data", data)
    console.log("totalData", total_data)
    return (
        <div className="nc-SectionGridFeaturePlaces relative">
            <div
                className={`grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${gridClass}`}
            >
                {data.map((item) => renderCard(item))}
            </div>
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
