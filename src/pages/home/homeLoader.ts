
import { Product } from "../../types/typesIndex";

import { LoaderFunction } from "react-router-dom";
import axios from "axios";



export interface HomeLoaderResult {
    resultFavPaintings: Product[];
}

export const  homeLoader:LoaderFunction= async () => {

   const result= await axios.get('http://localhost:3001/products') as HomeLoaderResult;
   //console.log(result.resultFavPaintings)
   return result.resultFavPaintings



}