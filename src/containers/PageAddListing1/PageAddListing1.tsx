import React, { FC, useEffect, useState } from "react";
import Input from "shared/Input/Input";
import Select from "shared/Select/Select";
import CommonLayout from "./CommonLayout";
import FormItem from "./FormItem";
import Textarea from "shared/Textarea/Textarea";
import { manat_icon } from "contains/contants";
import axios from "axios";
import { apiUrl } from "config";
import { ICategoryProps, ICityProps } from "data/types";
import { useAppDispatch, useAppSelector } from "store/store";
import { changeValue } from "store/action";

export interface PageAddListing1Props { }

const PageAddListing1: FC<PageAddListing1Props> = () => {

  const dispatch = useAppDispatch()
  const room = useAppSelector(store => store.room)

  const [categoryList, setCategoryList] = useState<Array<ICategoryProps>>([])
  const [cityList, setCityList] = useState<Array<ICityProps>>([])

  useEffect(() => {
    getCategoryList()
    getCityList()
  }, [])

  const getCategoryList = () => {
    axios.get(apiUrl + 'shared/categories').then(res => {
      // console.log("res.data", res.data.data);
      if (res.data.success) {
        setCategoryList(res.data.data)
      }
    }).catch(err => {
      console.log("shared/categories err", err);
    })
  }

  const getCityList = () => {
    axios.get(apiUrl + 'shared/cities').then(res => {
      // console.log("res.data", res.data.data);
      if (res.data.success) {
        setCityList(res.data.data)
      }
    }).catch(err => {
      console.log("shared/cities err", err);
    })
  }

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
            <Select
              value={
                // @ts-ignore
                room.category?.id
              }
              onChange={e => dispatch(changeValue("room", "category", categoryList.find(x => x.id === Number(e.target.value))))}
            >
              {
                categoryList.map(item => <option key={item.id} value={item.id}>{item.title}</option>)
              }
            </Select>
          </FormItem>
          <FormItem
            label="Məkanın adı"
          // desc="Cazibədar ad adətən daxildir: Ev adı + Otaq adı + Seçilmiş əmlak + Turist təyinatı"
          >
            <Input
              value={
                // @ts-ignore
                room.title
              }
              placeholder="Məkanın adını daxil edin"
              onChange={e => dispatch(changeValue("room", "title", e.target.value))}
            />
          </FormItem>
          <FormItem label="Şəhər">
            <Select
              value={
                // @ts-ignore
                room.city?.id
              }
              onChange={e => dispatch(changeValue("room", "city", cityList.find(x => x.id === Number(e.target.value))))}
            >
              {
                cityList.map(item => <option key={item.id} value={item.id}>{item.name}</option>)
              }
            </Select>
          </FormItem>
          <FormItem label="Küçə">
            <Input
              value={
                // @ts-ignore
                room.address
              }
              placeholder="..."
              onChange={e => dispatch(changeValue("room", "address", e.target.value))}
            />
          </FormItem>
          <FormItem label="Qiymət">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">{manat_icon}</span>
              </div>
              <Input
                className="!pl-8 !pr-10"
                placeholder="0.00"
                value={
                  // @ts-ignore
                  room.price
                }
                onChange={e => dispatch(changeValue("room", "price", e.target.value))}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500">AZN</span>
              </div>
            </div>
          </FormItem>
          <FormItem label="Ətraflı məlumat">
            <Textarea
              placeholder="..."
              rows={14}
              value={
                // @ts-ignore
                room.content
              }
              onChange={e => dispatch(changeValue("room", "content", e.target.value))}
            />
          </FormItem>
        </div>
      </>
    </CommonLayout >
  );
};

export default PageAddListing1;
