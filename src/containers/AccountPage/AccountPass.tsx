import Label from "components/Label/Label";
import React from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import CommonLayout from "./CommonLayout";
import { appName } from "config";
import Helmet from "react-helmet";

const AccountPass = () => {
  return (
    <div>
      <Helmet>
        <title>Şifrəni dəyiş | {appName}</title>
      </Helmet>
      <CommonLayout>
        <div className="space-y-6 sm:space-y-8">
          {/* HEADING */}
          <h2 className="text-3xl font-semibold">Şifrəni dəyiş</h2>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className=" max-w-xl space-y-6">
            <div>
              <Label>Hazırki şifrə</Label>
              <Input type="password" className="mt-1.5" />
            </div>
            <div>
              <Label>Yeni şifrə</Label>
              <Input type="password" className="mt-1.5" />
            </div>
            <div>
              <Label>Yeni şifrə yenidən</Label>
              <Input type="password" className="mt-1.5" />
            </div>
            <div className="pt-2">
              <ButtonPrimary>Şifrəni dəyiş</ButtonPrimary>
            </div>
          </div>
        </div>
      </CommonLayout>
    </div>
  );
};

export default AccountPass;
