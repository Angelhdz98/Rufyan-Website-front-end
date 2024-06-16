import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import type { Product } from "../../types/typesIndex";
const pause =(duration)=>{
    return new Promise((resolve)=>{
        setTimeout(resolve,duration);
    });
};

const ProductsApi= createApi({
    reducerPath: 'products',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001',
    
    fetchFn: async (...args)=>{
        await pause(1000);
        return fetch(...args)
    }
    }),
    endpoints(builder){
        return{
            addProduct: builder.mutation({
                query:(user)=>{
                    return {
                        url: '/products',
                        method: 'POST',
                        body:{
                            
                        }
                    }
                }
                        }),
                        fetchProducts: builder.query({
                            query: (product:Product) =>{
                                return {
                                    url:'/products',
                                    params: {
                                        product.favorite=true
                                    },
                                    method: 'GET',
                                };
                            }}),
                            removeProduct: builder.mutation({
                               query:(product) =>{
                                return{
                                    url: `/products/${product.id}`,
                                    method: 'DELETE'
                                }
                               } 
                            })
        }

    }


})

export const {useFetchProductsQuery, useAddProductMutation, useRemovepr}=ProductsApi;
export {ProductsApi}