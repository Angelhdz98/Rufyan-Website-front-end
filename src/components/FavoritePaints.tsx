
import ImgSlider from "./ImgSlider"
import PaintLabel from "./PaintLabel";

//  import type { fetchPaintingsResult } from "../pages/home/homeLoader";
//  import { ReactNode, useEffect } from "react";
//  import { Product } from "../types/typesIndex";
//  import { useDispatch } from "react-redux";
//  import { AppDispatch, fetchFavPaintings } from "../store";
  import { useSelector } from "react-redux";
  import { RootState } from "../store";


function FavoritePaints() {
    
const paintings = useSelector((state: RootState)=>state.products.data)

    const renderedFavPaints= paintings.map((fp)=>{

      return(<div className="w-1/5 h-fit border border-black rounded-md overflow-hidden drop-shadow-lg " >  
        <ImgSlider paint={fp} />
        <PaintLabel paint={fp}  />
        </div>)
    })

    return <div className="flex justify-center gap-8 my-12 " >
        {renderedFavPaints}
    </div>
}


export default FavoritePaints