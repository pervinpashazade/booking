import  { FC } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
// import imagePng from "images/hero-right.png";
import HeroSearchForm from "components/HeroSearchForm/HeroSearchForm";

export interface SectionHeroProps {
  className?: string;
  getRoomData?: Function;
}

const SectionHero: FC<SectionHeroProps> = ({
  className = "",
  getRoomData,
}) => {
  return (
    <div
      className={`nc-SectionHero flex flex-col-reverse lg:flex-col relative ${className}`}
      data-nc-id="SectionHero"
    >
      <div className="hidden lg:block z-10 mb-12 lg:mb-0 lg:mt-0 w-full">
        <HeroSearchForm getRoomData={getRoomData} />
      </div>
    </div>
  );
};

export default SectionHero;
