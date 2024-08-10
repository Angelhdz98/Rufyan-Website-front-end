export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    role: string;
    products: Product[];
  }
  export interface Image{
    id: number,
    url: string
  }

  export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    favorite?:boolean,
    creation_date: string;
    userId: number;
    image: Image[];
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
      medium:String;
      support_material: String;
      certificate_of_authenticity: boolean;
      original_availability: boolean;
      price_copy?: number,
      available_copies: number;
      copies_made: number;
      
    
  }


  export interface Project {
    id: number;
    title: string; 
    date: string;
    collaborator?: string;
    description?: string;
    images: string[],
    
  }



  

  