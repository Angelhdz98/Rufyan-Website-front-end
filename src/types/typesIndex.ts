import Cart from "../pages/cartPage/Cart";

export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    role: string;
    products: Product[];
    firstName: string; 
    lastName:string;
    birthDate:string;// wehen the API got readry will be changed for a object to control dates 
  addresses?:UserAddress[]
  }
  // we can change the normal user For a DTO user so it will just have the needed values

  
  export interface ImageProduct{
    id: number;
    productName: string;
    url:string;
  
    
    
  }
export interface Image{
  id: number;
  url: string;
}

  export interface UserAddress{
    addressLine1: string;
    addressLine2?: string;
    state: string;
    neighborhood:string;
    city?: string;
    postalCode: string;
    country: string;
  }

  export interface ProductCategory{
    id:number;
    name: string;
  }

  export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    category?: ProductCategory;
    favorite:boolean,
    creation_date: string;
    userId: number;
    image: ImageProduct[];
    available: boolean;
    //specific_attributes: any; // Puedes definir tipos más específicos según tus necesidades
  }

  export interface Painting extends Product  {
   /** id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    favorite?: boolean;
    dateCreated: string;
    userId: number;
    images: string[];//Estos atributos son heredados de product*/ 
      largo_cm:number,
      altura_cm:number,
      medium:string;
      support_material: string;
      certificate_of_authenticity: boolean;
      isOrginalAvailable: boolean;
      isOriginalSelected?: boolean;
      price_copy: number,
      available_copies: number;
      copies_made: number;
      
    
  }

  export interface OptionSelectRequest{
    name: string;
    label: string;    
  }

  export interface OptionSelect extends OptionSelectRequest{
    id:number;

  }

  export interface ProductCategory extends OptionSelect{

  }


  export interface EditPainting {
    id: string;
    name: string;
    description: string;
    price: number;
    categoryId: number;
    favorite:boolean,
    creation_date: string;
    userId: number;
    imageFiles: File[];
    available: boolean;
    largo_cm:number;
    altura_cm:number;
    medium:string;
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
  export interface ArtEvent extends Project{
    place: string;
    finishDate: string;
    

  }

  export interface CartItemInterface<T extends Product=Product>{
    id: number;
    product:T;
    isCopy: boolean;
    quantity:number;
    
  }

  export interface Cup extends Product{
    capacity_ml:number;
    isMagic:boolean;
    material:string;
  }

  export interface Sticker extends Product{
    /** id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    favorite?: boolean;
    dateCreated: string;
    userId: number;
    images: string[];//Estos atributos son heredados de product*/
   height_cm:number;
   width_cm:number;
   material:string;
   
  }

  export interface Hat extends Product{
    size_inchs:number;
    material:string;
    snapback:boolean;
    flat:boolean;

  }

  export interface Banner{
  id: number;
  link:string;
  image: Image;
  }

  export function isPainting(product:Product):product is Painting{
    return 'largo_cm' in product && 'altura_cm' in product;
  }

  