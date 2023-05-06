import { appName } from "config";
import React from "react";
import { FC } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import Helmet from "react-helmet";

export interface CommonLayoutProps {
  index: string;
  nextHref: string;
  backtHref: string;
  nextBtnText?: string;
  children: React.ReactNode;
}

const CommonLayout: FC<CommonLayoutProps> = ({
  index = "1",
  children,
  nextHref,
  nextBtnText,
  backtHref,
}) => {
  return (
    <div
      className={`nc-PageAddListing1 px-4 max-w-3xl mx-auto pb-24 pt-14 sm:py-24 lg:pb-32`}
      data-nc-id="PageAddListing1"
    >
      <Helmet>
        <title>Yeni elan | {appName}</title>
      </Helmet>
      <div className="space-y-11">
        <div>
          <span className="text-4xl font-semibold">{index}</span>{" "}
          <span className="text-lg text-neutral-500 dark:text-neutral-400">
            / 4
          </span>
        </div>

        {/* --------------------- */}
        <div className="listingSection__wrap ">{children}</div>

        {/* --------------------- */}
        <div className="flex justify-end space-x-5">
          {
            index !== "01" &&
            <ButtonSecondary href={backtHref}>Geri qayıt</ButtonSecondary>
          }
          <ButtonPrimary href={nextHref}>
            {nextBtnText || "Davam et"}
          </ButtonPrimary>
        </div>
      </div>
    </div>
  );
};

export default CommonLayout;
