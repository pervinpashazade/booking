import { MapPinIcon } from "@heroicons/react/24/solid";
import LocationMarker from "components/AnyReactComponent/LocationMarker";
import Label from "components/Label/Label";
import GoogleMapReact from "google-map-react";
import React, { FC } from "react";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import Input from "shared/Input/Input";
import Select from "shared/Select/Select";
import CommonLayout from "./CommonLayout";
import FormItem from "./FormItem";
import NcInputNumber from "components/NcInputNumber/NcInputNumber";
import { useAppDispatch, useAppSelector } from "store/store";
import { changeValue } from "store/action";

export interface PageAddListing2Props { }

const PageAddListing2: FC<PageAddListing2Props> = () => {

  const dispatch = useAppDispatch()
  const room = useAppSelector(store => store.room)

  return (
    <CommonLayout
      index="2"
      backtHref="/new/step/1"
      // nextHref="/new/step/3"
      nextBtnText="Elanı paylaş"
    >
      <>
        <h2 className="text-2xl font-semibold">Otaq məlumatları</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* FORM */}
        <div className="space-y-8">
          {/* ITEM */}
          <FormItem label="Sahə (m2)">
            <Input
              placeholder="Ümumi sahə (m2)"
              value={
                // @ts-ignore 
                room.area ?? ""
              }
              onChange={e => {
                dispatch(changeValue("room", "area", isNaN(Number(e.target.value)) ? room.area : e.target.value))
              }}
            />
          </FormItem>
          <NcInputNumber
            label="Qonaq sayı"
            defaultValue={
              //@ts-ignore
              room.person_count
            }
            onChange={count => dispatch(changeValue("room", "person_count", count))}
          />
          <NcInputNumber
            label="Yataq otağı sayı"
            defaultValue={
              //@ts-ignore
              room.bedroom_count
            }
            onChange={count => dispatch(changeValue("room", "bedroom_count", count))}
          />
          <NcInputNumber
            label="Tək yataq sayı"
            defaultValue={
              //@ts-ignore
              room.single_bed_count
            }
            onChange={count => dispatch(changeValue("room", "single_bed_count", count))}
          />
          <NcInputNumber
            label="İkili yataq sayı"
            defaultValue={
              //@ts-ignore
              room.double_bed_count
            }
            onChange={count => dispatch(changeValue("room", "double_bed_count", count))}
          />
          <NcInputNumber
            label="Hamam sayı"
            defaultValue={
              //@ts-ignore
              room.bathroom_count
            }
            onChange={count => dispatch(changeValue("room", "bathroom_count", count))}
          />
        </div>
      </>
      {/* <>
        <h2 className="text-2xl font-semibold">Ünvan</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        <div className="space-y-8">
          <ButtonSecondary>
            <MapPinIcon className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
            <span className="ml-3">Use current location</span>
          </ButtonSecondary>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-5">
            <FormItem label="City">
              <Input />
            </FormItem>
            <FormItem label="State">
              <Input />
            </FormItem>
            <FormItem label="Postal code">
              <Input />
            </FormItem>
          </div>
          <div>
            <Label>Detailed address</Label>
            <span className="block mt-1 text-sm text-neutral-500 dark:text-neutral-400">
              1110 Pennsylvania Avenue NW, Washington, DC 20230
            </span>
            <div className="mt-4">
              <div className="aspect-w-5 aspect-h-5 sm:aspect-h-3">
                <div className="rounded-xl overflow-hidden">
                  <GoogleMapReact
                    bootstrapURLKeys={{
                      key: "AIzaSyAGVJfZMAKYfZ71nzL_v5i3LjTTWnCYwTY",
                    }}
                    yesIWantToUseGoogleMapApiInternals
                    defaultZoom={15}
                    defaultCenter={{
                      lat: 55.9607277,
                      lng: 36.2172614,
                    }}
                  >
                    <LocationMarker lat={55.9607277} lng={36.2172614} />
                  </GoogleMapReact>
                </div>
              </div>
            </div>
          </div>
        </div>
      </> */}
    </CommonLayout>
  );
};

export default PageAddListing2;
