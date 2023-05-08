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

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const selectedFilesArray = Array.from(files);
      // setSelectedFiles(selectedFilesArray);
      dispatch(changeValue("room", "images", selectedFilesArray))
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files) {
      const selectedFilesArray = Array.from(files);
      // setSelectedFiles(selectedFilesArray);
      dispatch(changeValue("room", "images", selectedFilesArray))
    }
    setIsDraggingOver(false);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDraggingOver(false);
  };

  const removeFile = (file: File) => {
    // setSelectedFiles((prevSelectedFiles) =>
    //   prevSelectedFiles.filter((selectedFile) => selectedFile !== file)
    // );

    //@ts-ignore
    const arr = room.images.filter((selectedFile) => selectedFile !== file)
    dispatch(changeValue("room", "images", arr))
  };

  // console.log("files", selectedFiles);
  // @ts-ignore
  // console.log("room images", room.images);

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

          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
          {/* FORM */}
          <div className="space-y-8">
            {/* ----------------- */}
            <div>
              <span className="text-lg font-semibold">Şəkillər</span>
              <div className="mt-5 ">
                <div
                  className="mt-1 flex flex-col items-center justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-6000 border-dashed rounded-md"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                >
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-neutral-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                    <div className="flex text-sm text-neutral-6000 dark:text-neutral-300">
                      <label
                        htmlFor="file-upload-2"
                        className="relative cursor-pointer  rounded-md font-medium text-primary-6000 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload-2"
                          name="file-upload-2"
                          className="sr-only"
                          type="file"
                          multiple
                          onChange={handleFileSelect}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>

                  {/* {
                    selectedFiles.length > 0 &&
                    <div className="w-full mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {selectedFiles.map((file) => (
                        <div key={file.name} className="relative">
                          <img src={URL.createObjectURL(file)} alt={file.name} className="w-32 h-32 object-cover rounded" />
                          <button
                            className="absolute top-0 right-0 w-6 h-6 font-bold text-sm text-red-600 bg-white rounded-full hover:bg-gray-200"
                            onClick={() => removeFile(file)}
                          >
                            x
                          </button>
                        </div>
                      ))}
                    </div>
                  } */}

                  {
                    // @ts-ignore
                    room.images?.length > 0 &&
                    <div className="w-full mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {
                        // @ts-ignore
                        room.images.map((file) => (
                          <div key={file.name} className="relative">
                            <img src={URL.createObjectURL(file)} alt={file.name} className="w-32 h-32 object-cover rounded" />
                            <button
                              className="absolute top-0 right-0 w-6 h-6 font-bold text-sm text-red-600 bg-white rounded-full hover:bg-gray-200"
                              onClick={() => removeFile(file)}
                            >
                              x
                            </button>
                          </div>
                        ))
                      }
                    </div>
                  }

                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </CommonLayout >
  );
};

export default PageAddListing1;
