//import Cart from "../pages/cartPage/Cart";

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
  products: Product[];
  firstName: string;
  lastName: string;
  birthDate: string;// wehen the API got readry will be changed for a object to control dates 
  addresses?: UserAddress[]
}
// we can change the normal user For a DTO user so it will just have the needed values


export interface ImageProduct {
  id: number;
  productName?: string;
  url: string;
}
export type UpdateProductSpecs = {
  productSpecs: ProductSpecs,
  productTypeEnum: ProductTypeEnum,
  productDomainDetails: ProductDomainDetails,
  images: ImageProduct[],
}
export interface Image {
  id: number;
  url: string;
}

export interface UserAddress {
  addressLine1: string;
  addressLine2?: string;
  state: string;
  neighborhood: string;
  city?: string;
  postalCode: string;
  country: string;
}

export interface ProductCategory {
  id: number;
  name: string;
}

export enum ProductTypeEnum {
  PAINTING = "PAINTING",
  SINGLE = "SINGLE",
  CLOTHING = "CLOTHING",
  PRINT = "PRINT",

}

export enum BodyClothingSizeEnum {
  XS = "XS",
  S = "S",
  M = "M",
  L = "L",
  XL = "XL"

}

export enum PricingTypeEnum {
  ORIGINAL = "ORIGINAL",
  SINGLE = "SINGLE",

}


export type PaintingDomainDetails = {
  alturaCm: number;
  largoCm: number;
  medium: string;
  supportMaterial: string;
  creationDate: Date;
  productType: ProductTypeEnum.PAINTING;
}

export type BodyClothingDomainDetails = {
  material: string;
  type: string;
  printingTechnique: string;
  productType: ProductTypeEnum.CLOTHING;
}

export type ProductDomainDetails = BodyClothingDomainDetails | PaintingDomainDetails;



export type PaintingPricing = {
  pricingType: "ORIGINAL";
  pricePerCopy: number;
  pricePerOriginal: number;
}

export type SinglePricing = {
  pricingType: "SIMPLE";
  price: number;
}
export type ProductPricing = SinglePricing | PaintingPricing;


export type PaintingStock = {
  stockType: "PAINTING_STOCK";
  availableCopies: number;
  copiesMade: number;
  isOriginalAvailable: boolean;

}

export type SingleStock = {
  stockType: "SINGLE_STOCK";
  stock: number;
}
export type ClothingStock = {
  stockType: "CLOTHING_STOCK";
  stockPerSize: Record<BodyClothingSizeEnum, number>;
}

export type ProductStock = SingleStock | PaintingStock | ClothingStock;







export interface Product {
  id: number;
  name: string;
  images: ImageProduct[];
  description: string;
  productStock: ProductStock;
  productPricing: ProductPricing;
  productTypeEnum: string;
  productDomainDetails: ProductDomainDetails;
  isFavorite: boolean;

}
// muy probablemente no vaya a ser necesario (es solo json)
export interface Painting extends Product {


  productStock: PaintingStock;
  productPricing: PaintingPricing;
  productDomainDetails: PaintingDomainDetails;


}
export type ProductSpecs = {
  name: string;
  description: string;
  productStock: ProductStock;
  productPricing: ProductPricing;
  productTypeEnum: ProductTypeEnum;
  isFavorite: boolean;
};

export type ProductDetails = PaintingDetails | BodyClothingDetails;

export enum MediumEnum {
  OIL_PAINT,
  ACRYLYC_PAINT,
  PEN,
  CHARCOAL,
  WATERCOLOR
}

export enum SupportMaterialEnum {
  WOOD,
  COTTON_PAPER,
  PAPER
}
export enum ClothingMaterial {
  COTTON = "COTTON",
  POLYESTER = "POLYESTER",
  OTHER = "OTHER"
}

export enum BodyClotheTypeEnum {
  T_SHIRT = "T_SHIRT",
  SHIRT = "SHIRT",
  HOODIE = "HOODIE",
}
export enum PrintingTechniqueEnum {
  SERIGRAPHY,
  SUBLIMATION,
  AEROGRAPHY,
}

export type PaintingDetails = {
  alturaCm: number;
  largoCm: number;
  medium: MediumEnum;
  supportMaterial: SupportMaterialEnum;
  creationDate: Date;
  productTypeEnum: ProductTypeEnum;

};

export type BodyClothingDetails = {
  material: ClothingMaterial;
  type: BodyClotheTypeEnum;
  printingTechique: PrintingTechniqueEnum;
  productTypeEnum: ProductTypeEnum;

}

export type CreateProductCommand = {
  productSpecs: ProductSpecs;
  productDetails: ProductDomainDetails;
};
export type UpdateProductCommand = {
  productSpecs: ProductSpecs;
  productDetails: ProductDomainDetails;
  images: ImageProduct[];

}
export interface OptionSelectRequest {
  name: string;
  label: string;
}

export interface OptionSelect extends OptionSelectRequest {
  id: number;

}

export interface ProductCategory extends OptionSelect {

}


export interface EditPainting {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  favorite: boolean,
  creation_date: string;
  userId: number;
  imageFiles: File[];
  available: boolean;
  largo_cm: number;
  altura_cm: number;
  medium: string;
  support_material: string;
  certificate_of_authenticity: boolean;
  original_availability: boolean;
  price_copy: number;
  available_copies: number;
  copies_made: number;
}



export interface Project {
  id: number;
  title: string;
  date: string;
  collaborator?: string;
  description?: string;
  images: ImageProduct[],

}
export interface ArtEvent extends Project {
  place: string;
  finishDate: string;


}

export interface CartItemInterface<T extends Product = Product> {
  id: number;
  product: T;
  isCopy: boolean;
  quantity: number;

}

export interface Cup extends Product {
  capacity_ml: number;
  isMagic: boolean;
  material: string;
}

export interface Sticker extends Product {
  /** id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  favorite?: boolean;
  dateCreated: string;
  userId: number;
  images: string[];//Estos atributos son heredados de product*/
  height_cm: number;
  width_cm: number;
  material: string;

}

export interface Hat extends Product {
  size_inchs: number;
  material: string;
  snapback: boolean;
  flat: boolean;

}

export interface Banner {
  id: number;
  link: string;
  image: Image;
}

export function isPainting(product: Product): product is Painting {
  return 'largo_cm' in product && 'altura_cm' in product;
}

