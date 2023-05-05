import React, { FC } from "react";
import Input from "shared/Input/Input";
import Select from "shared/Select/Select";
import CommonLayout from "./CommonLayout";
import FormItem from "./FormItem";
import Textarea from "shared/Textarea/Textarea";

export interface PageAddListing1Props { }

const PageAddListing1: FC<PageAddListing1Props> = () => {
  return (
    <CommonLayout
      index="01"
      backtHref="/add-listing-1"
      nextHref="/add-listing-2"
    >
      <>
        <h2 className="text-2xl font-semibold">Yeni elan</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* FORM */}
        <div className="space-y-8">
          {/* ITEM */}
          <FormItem
            label="Məkan növü"
            desc="Adətən öz brendini və dekorasiyasını müəyyən edən unikal üsluba və ya mövzuya malik olan peşəkar qonaqpərvərlik müəssisələri"
          >
            <Select>
              <option value="Hotel">Hotel</option>
              <option value="Cottage">Cottage</option>
              <option value="Villa">Villa</option>
              <option value="Cabin">Cabin</option>
              <option value="Farm stay">Farm stay</option>
              <option value="Houseboat">Houseboat</option>
              <option value="Lighthouse">Lighthouse</option>
            </Select>
          </FormItem>
          <FormItem
            label="Məkanın adı"
            desc="Cazibədar ad adətən daxildir: Ev adı + Otaq adı + Seçilmiş əmlak + Turist təyinatı"
          >
            <Input placeholder="Places name" />
          </FormItem>
          <FormItem label="Şəhər">
            <Select>
              <option value="Viet Nam">Viet Nam</option>
              <option value="Thailand">Thailand</option>
              <option value="France">France</option>
              <option value="Singapore">Singapore</option>
              <option value="Jappan">Jappan</option>
              <option value="Korea">Korea</option>
              <option value="...">...</option>
            </Select>
          </FormItem>
          <FormItem label="Küçə">
            <Input placeholder="..." />
          </FormItem>
        </div>
        <div>
          <h2 className="text-2xl font-semibold">
            Məkan haqqında ətraflı məlumat
          </h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            Yaşayış yerinizin ən yaxşı xüsusiyyətlərini, sürətli Wi-Fi və ya parkinq kimi hər hansı xüsusi imkanları, həmçinin qonşuluqda bəyəndiyiniz şeyləri qeyd edin.
          </span>
        </div>
        <Textarea placeholder="..." rows={14} />
      </>
    </CommonLayout>
  );
};

export default PageAddListing1;
