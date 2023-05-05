import NcInputNumber from "components/NcInputNumber/NcInputNumber";
import React, { FC } from "react";
import Select from "shared/Select/Select";
import CommonLayout from "./CommonLayout";
import FormItem from "./FormItem";
import Input from "shared/Input/Input";

export interface PageAddListing3Props { }

const PageAddListing3: FC<PageAddListing3Props> = () => {
  return (
    <CommonLayout
      index="03"
      backtHref="/add-listing-2"
      nextHref="/add-listing-4"
    >
      <>
        <h2 className="text-2xl font-semibold">Məkan məlumatları</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* FORM */}
        <div className="space-y-8">
          {/* ITEM */}
          <FormItem label="Sahə (m2)">
            <Input placeholder="Ümumi sahə (m2)" />
          </FormItem>
          <NcInputNumber label="Qonaq sayı" defaultValue={4} />
          <NcInputNumber label="Yataq otağı sayı" defaultValue={4} />
          <NcInputNumber label="Yataq sayı" defaultValue={4} />
          <NcInputNumber label="Hamam sayı" defaultValue={2} />
          <NcInputNumber label="Mətbəx sayı" defaultValue={2} />
        </div>
      </>
    </CommonLayout>
  );
};

export default PageAddListing3;
