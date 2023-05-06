import React, { FC } from "react";
import Input from "shared/Input/Input";
import Select from "shared/Select/Select";
import CommonLayout from "./CommonLayout";
import FormItem from "./FormItem";
import Textarea from "shared/Textarea/Textarea";
import { manat_icon } from "contains/contants";

export interface PageAddListing1Props { }

const PageAddListing1: FC<PageAddListing1Props> = () => {
  return (
    <CommonLayout
      index="1"
      backtHref="/"
      nextHref="/new/step/2"
    >
      <>
        <h2 className="text-2xl font-semibold">Yeni elan</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* FORM */}
        <div className="space-y-8">
          {/* ITEM */}
          <FormItem
            label="Məkan növü"
            // desc="Adətən öz brendini və dekorasiyasını müəyyən edən unikal üsluba və ya mövzuya malik olan peşəkar qonaqpərvərlik müəssisələri"
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
            // desc="Cazibədar ad adətən daxildir: Ev adı + Otaq adı + Seçilmiş əmlak + Turist təyinatı"
          >
            <Input placeholder="Məkanın adını daxil edin" />
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
          <FormItem label="Qiymət">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">{manat_icon}</span>
              </div>
              <Input className="!pl-8 !pr-10" placeholder="0.00" />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500">AZN</span>
              </div>
            </div>
          </FormItem>
          <FormItem label="Ətraflı məlumat">
            <Textarea placeholder="..." rows={14} />
          </FormItem>
        </div>
      </>
    </CommonLayout>
  );
};

export default PageAddListing1;
