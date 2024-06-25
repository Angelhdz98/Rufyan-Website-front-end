export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    role: string;
    products: Product[];
  }
  
  export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    favorite?:boolean,
    dateCreated: string;
    userId: number;
    images: string[];
    specific_attributes: any; // Puedes definir tipos más específicos según tus necesidades
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
    images: string[];*/ 
    specific_attributes: {
      dimensions:number[]
      medium:string;
      support_material: string;
      certificate_of_authenticity: boolean;
      original_availability: boolean;
      copy_price?: number,
      available_copies: number;
      copies_made: number;
      
    }
  }


  export interface Project {
    id: number;
    title: string; 
    date: Date;
    collaborator?: string;
    description?: string;
    images: string[],
    
  }



  

  