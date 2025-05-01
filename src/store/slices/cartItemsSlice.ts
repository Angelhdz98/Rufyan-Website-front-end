import { CartItemInterface, Cup, Hat, Painting, ProductCategory } from "../../types/typesIndex";


import obra1 from "../../../public/assets/Images/imgObras/obra1.jpg"
import obra2 from "../../../public/assets/Images/imgObras/obra2.jpg"
import obra3 from "../../../public/assets/Images/imgObras/obra3.jpg"
import obra4 from "../../../public/assets/Images/imgObras/obra4.png"
import obra5 from "../../../public/assets/Images/imgObras/obra5.png"
//import obra6 from "../../../public/assets/Images/imgObras/obra6.png"
//import obra7 from "../../../public/assets/Images/imgObras/obra7.png"
import nycap from "../../../public/assets/Images/productos/hats/nyCap.jpg"
import nycap2 from "../../../public/assets/Images/productos/hats/nyCap2.jpg"
import cup from "../../../public/assets/Images/productos/cups/customCup.png"
import cup2 from "../../../public/assets/Images/productos/cups/cup2.png"
import { createSlice } from "@reduxjs/toolkit";
import { changeCartItemQuantity } from "../thunks/changeCartItemQuantity";
import { deleteCartItem } from "../thunks/deleteCartItem";

//Random data for testing
const urbanCategory:ProductCategory={id:1, label:"Urbano", name:"Urban" }
const contemporaryArt:ProductCategory ={id:2, label:"Contemporaneo",name:"Comtemporary Art" }


export interface CartItemSlice {
    data: CartItemInterface[];
    isLoading: boolean;
    error: string|null;
 
  }

  const paintings: Painting[] = [
    {
      id: 1,
      name: "Paisaje Tranquilo",
      description: "Pintura al óleo de un paisaje sereno",
      price: 1200.00,
      category: urbanCategory,
      favorite:false,
      creation_date: "2023-05-15",
      userId: 1,
      image: [{
        id: 1,
        productName: "una obra fea",
        url: obra2,
      },
      {id: 2,
      productName: "una obra fea",
       url: obra3}
      ],
        largo_cm: 60,
        altura_cm:90,
        available: true,
        medium: "Óleo",
        support_material: "Lienzo",
        certificate_of_authenticity: true,
        isOrginalAvailable: false,
        available_copies: 2,
        copies_made: 8,
        price_copy:280,


    },
    {
      id: 8,
      name: "Graffiti Acuarela",
      description: "Pintura al óleo en acuarela de un Graffiti",
      price: 1000.00,
      category: contemporaryArt,
      favorite:true,
      creation_date: "2023-05-18",
      userId: 1,
      image: [
        {
        id: 3,
        productName: "Obra fea con otro nombre",
        url: obra4},

        {
          id: 4,
          productName: "una obra fea made by Rufyan", 
          url: obra5}      
      ],
        altura_cm: 60,
        largo_cm:90,
        available: true,
        medium: "Óleo",
        support_material: "Lienzo",
        certificate_of_authenticity: true,
        isOrginalAvailable: true,
        available_copies: 0,
        copies_made: 12,
        price_copy:300,
      }
   ,
    {
      id: 17,
      name: "Graffiti Acuarela",
      description: "Pintura al óleo en acuarela de un Graffiti",
      price: 1100.00,
      category: urbanCategory,
      favorite:true,
      creation_date: "2023-05-18",
      userId: 1,
      image: [
        {
          id: 5,
          productName: "una obra en acuarela",
          url:obra4,
        },
        {
          id: 6,
          productName: "una obra en acuarela",
          url:obra5, 
        }],
      
        altura_cm:60,
        largo_cm:90,
        available: true,
        medium: "Óleo",
        support_material: "Lienzo",
        certificate_of_authenticity: true,
        isOrginalAvailable: true,
        available_copies: 4,
        copies_made: 12,
        price_copy:400,
      }
    ,
    {
      id: 16,
      name: "Graffiti Acuarela",
      description: "Pintura al óleo en acuarela de un Graffiti",
      price: 1700.00,
      category: urbanCategory,
      favorite:true,
      creation_date: "2023-05-18",
      userId: 1,
      image: [
        {
          id: 7,
          productName: "una obra en acuarela con otro nombre",
          url:obra4, 
        },
        {
          id: 8,
          productName: "una obra en acuarela 2.0",
          url:obra5, 
        }
      ],
        altura_cm:60,
        largo_cm:90,
        available: true,
        medium: "Óleo",
        support_material: "Lienzo",
        certificate_of_authenticity: true,
        isOrginalAvailable: true,
        available_copies: 4,
        copies_made: 12,
        price_copy:480.00,
     
    },
   
  ];

  const hats: Hat[] = [
    {
      id: 123,
      size_inchs: 18,
      material: "cotton ",
      snapback: true,
      flat: false,
      name: "LDP Hat",
      description: "A hat with  LDP logo designed by: ",
      price: 800,
      category: urbanCategory,
      favorite: false,
      creation_date: "",
      userId: 12,
      image: [ {
        id: 15,
        productName: "LDP Hat",
        url:nycap
      },
      {
        id:22,
        productName: "LDP Hat",
        url:nycap2
      }


      ],
      available: true
    },
    {
      id: 88,
      size_inchs: 19,
      material: "cotton ",
      snapback: true,
      flat: true,
      name: "LDP Hat snapback",
      description: "A flat snapback hat with  LDP logo designed by: Rufyan ",
      price: 850,
      category: urbanCategory,
      favorite: false,
      creation_date: "",
      userId: 12,
      image: [
        {
        id:22,
        productName: "LDP Hat",
        url:nycap2
      },
      {
        id: 15,
        productName: "LDP Hat",
        url:nycap
      }


      ],
      available: true
    }
  ]

  const cups: Cup[] = [{
    capacity_ml: 256,
    isMagic: false,
    material: "Ceramic",
    id: 89,
    name: "Rufyan tag cup",
    description: "a normal cup with Rufyan tag",
    price: 350,
    category: urbanCategory,
    favorite: true,
    creation_date: "",
    userId: 0,
    image: [{
      id: 1290,
      productName: "Rufyan tag cup",
      url: cup
    },{
      id: 1292,
      productName: "Rufyan tag cup",
      url: cup2
    }],
    available: false
  },]


  const cart: Array<CartItemInterface<Painting>|CartItemInterface<Hat>| CartItemInterface<Cup>> =[
     {
      id: 1, // Puedes usar un ID único para el CartItem o el ID del producto
      product: paintings[0] ,
      isCopy: false, // Asumimos que es el original (ajusta según necesidad)
      quantity: 1
    },
    // Primer hat (índice 0)
    {
      id: 2,
      product: hats[0], 
      isCopy: false, // No aplica para hats pero lo mantenemos por consistencia
      quantity: 1
    },
    // Primer cup (índice 0)
    {
      id: 3,
      product: cups[0],
      isCopy: false, // No aplica para cups
      quantity: 1
    }
  ];
  const initialState:CartItemSlice = {
    data:cart, error:null, isLoading:false
  };

  const cartItemSlice = createSlice({
    name:"cartItems",
    initialState,
    reducers:{

    },

    //  La api inicialmente retornará el carrito completo
    extraReducers(builder){
        builder.addCase(changeCartItemQuantity.pending, (state ) =>{
            state.isLoading=true;
            state.error= null;
        })
        builder.addCase(changeCartItemQuantity.fulfilled, (state, action) =>{
            state.isLoading=false;
            state.data= action.payload;            
            
        })
        builder.addCase(changeCartItemQuantity.rejected, (state, action) =>{
          state.isLoading=false;
          state.error= action.payload as string;             
      })
      builder.addCase(deleteCartItem.pending, (state ) =>{
        state.isLoading=true;
        state.error= null;
    })
    builder.addCase(deleteCartItem.fulfilled, (state, action) =>{
        state.isLoading=false;
        state.data= action.payload;            
        
    })
    builder.addCase(deleteCartItem.rejected, (state, action) =>{
      state.isLoading=false;
      state.error= action.payload as string;             
  })

    }
    
  });

  export const cartItemReducer = cartItemSlice.reducer;