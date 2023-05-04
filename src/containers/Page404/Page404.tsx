import ButtonPrimary from "shared/Button/ButtonPrimary";
import React from "react";
import { Helmet } from "react-helmet";
import NcImage from "shared/NcImage/NcImage";
import I404Png from "images/404.png";
import { appName } from "config";

const Page404: React.FC = () => (
  <div className="nc-Page404">
    <Helmet>
      <title>404 | {appName}</title>
    </Helmet>
    <div className="container relative pt-5 pb-16 lg:pb-20 lg:pt-5">
      {/* HEADER */}
      <header className="text-center max-w-2xl mx-auto space-y-2">
        <NcImage src={I404Png} />
        <span className="block text-sm text-neutral-800 sm:text-base dark:text-neutral-200 tracking-wider font-medium">
          AXTARDIĞINIZ SƏHİFƏ TAPILMADI.{" "}
        </span>
        <div className="pt-8">
          <ButtonPrimary href="/">Ana səhifəyə qayıt</ButtonPrimary>
        </div>
      </header>
    </div>
  </div>
);

export default Page404;
