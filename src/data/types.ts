// error response type
export interface IErrorResponse {
  response: {
    data: {
      error: string
    }
  }
}

export interface IFormValidationProps {
  [key: string]: Array<string>
}

//  ######  CustomLink  ######## //
export interface CustomLink {
  label: string;
  href: string;
  targetBlank?: boolean;
}

//  ##########  PostDataType ######## //
export interface TaxonomyType {
  id: string | number;
  name: string;
  href: string;
  count?: number;
  thumbnail?: string;
  desc?: string;
  color?: TwMainColor | string;
  taxonomy: "category" | "tag";
  listingType?: "stay" | "experiences" | "car";
}

export interface AuthorType {
  id: string | number;
  firstName: string;
  lastName: string;
  displayName: string;
  avatar: string;
  bgImage?: string;
  email?: string;
  count: number;
  desc: string;
  jobName: string;
  href: string;
  starRating?: number;
}

export interface PostDataType {
  id: string | number;
  author: AuthorType;
  date: string;
  href: string;
  categories: TaxonomyType[];
  title: string;
  featuredImage: string;
  desc?: string;
  commentCount: number;
  viewdCount: number;
  readingTime: number;
  postType?: "standard" | "video" | "gallery" | "audio";
}

export type TwMainColor =
  | "pink"
  | "green"
  | "yellow"
  | "red"
  | "indigo"
  | "blue"
  | "purple"
  | "gray";

export enum DataTypes {
  room = "room",
  tour = "tour"
}

export enum ConditionTypes {
  poor = 1, // zeif
  normal = 2, // nomral
  good = 3, // yaxshi
  excelent = 4 // ela
}

export interface IImageProps {
  id: number
  name: string
  url_full: string
}

export interface ICategoryProps {
  id: number
  title: string
}

export interface ICityProps {
  id: number
  name: string
}

export interface IUserProps {
  id?: number
  name?: string
  surname?: string
  email?: string
}

export interface IPaginationProps {
  page: number
  per_page: number
  total: number
}

export interface ISearchRoomParams {
  page?: string | number
  per_page?: string | number
  city_id?: string | number
  price_from?: string | number
  price_to?: string | number
}

//
export interface IStayProps {
  id?: number,
  user: IUserProps,
  user_id: number,
  city: ICityProps,
  slug: string,
  category_id: number,
  category: ICategoryProps,
  area: number,
  price: number,
  currency: string,
  address: string,
  bedroom_count: number,
  bathroom_count: number,
  person_count: number,
  is_breakfast: number,
  breakfast_fee: number,
  condition: ConditionTypes,
  title: string,
  content: string,
  image: string,
  images: Array<IImageProps>
  is_active: number,
  is_vip: number,
  is_favorite: boolean,
  view_count: number,
  double_bed_count: number,
  single_bed_count: number,
}

export interface StayDataType {
  id: string | number;
  author: AuthorType;
  date: string;
  href: string;
  title: string;
  featuredImage: string;
  commentCount: number;
  viewCount: number;
  address: string;
  reviewStart: number;
  reviewCount: number;
  like: boolean;
  galleryImgs: string[];
  price: string;
  listingCategory: TaxonomyType;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  saleOff?: string | null;
  isAds: boolean | null;
  map: {
    lat: number;
    lng: number;
  };
}

//
export interface ExperiencesDataType {
  id: string | number;
  author: AuthorType;
  date: string;
  href: string;
  title: string;
  featuredImage: string;
  commentCount: number;
  viewCount: number;
  address: string;
  reviewStart: number;
  reviewCount: number;
  like: boolean;
  galleryImgs: string[];
  price: string;
  listingCategory: TaxonomyType;
  maxGuests: number;
  saleOff?: string | null;
  isAds: boolean | null;
  map: {
    lat: number;
    lng: number;
  };
}

//
export interface CarDataType {
  id: string | number;
  author: AuthorType;
  date: string;
  href: string;
  title: string;
  featuredImage: string;
  commentCount: number;
  viewCount: number;
  address: string;
  reviewStart: number;
  reviewCount: number;
  like: boolean;
  galleryImgs: string[];
  price: string;
  listingCategory: TaxonomyType;
  seats: number;
  gearshift: string;
  saleOff?: string | null;
  isAds: boolean | null;
  map: {
    lat: number;
    lng: number;
  };
}
