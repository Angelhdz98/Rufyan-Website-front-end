
import ImgSlider from "./ImgSlider"
import PaintLabel from "./PaintLabel";

//  import type { fetchPaintingsResult } from "../pages/home/homeLoader";
//  import { ReactNode, useEffect } from "react";
//  import { Product } from "../types/typesIndex";
//  import { useDispatch } from "react-redux";
//  import { AppDispatch, fetchFavPaintings } from "../store";
  import { useSelector } from "react-redux";
  import { RootState } from "../store";
import Button from "./Button";

function FavoritePaints() {
    
const paintings = useSelector((state: RootState)=>state.products.data);

    const renderedFavPaints= paintings.map((fp)=>{

      return(<div className="w-full max-w-full  h-auto  border border-black rounded-lg  drop-shadow-lg overflow-hidden min-[490px]:w-1/3 sm:w-1/4 min-[880px]:w-1/5 min-[1320px]:w-1/6 2xl:w-1/5 min-[1620px]:w-1/6 "  > {/** Here are the changes for a single frame (a painting) */} 
        <ImgSlider paint={fp} />
        <PaintLabel paint={fp}  />
        </div>)
    })

    return <div className="flex flex-col my-12 w-auto mx-4   bg-red-300 m-8  rounded-lg  p-4 ">
      <span className="font-bold">Favorite artworks</span>
      <hr className="border-black mb-4" />
      <div className="flex flex-col justify-center gap-6">
      <div className="flex flex-col flex-wrap   justify-center   gap-x-auto gap-y-4     min-[490px]:max-h-[1250px] min-[490px]:max-w-[93.5%] min-[490px]:gap-x-4   md:gap-x-6  md:max-w-[90.5%] sm:max-h-[950px] min-[880px]:max-h-[800px] min-[880px]:max-w-[88%] min-[952px]:max-w-[89%] lg:max-w-[90%] min-[1152px]:max-w-[91%] xl:max-w-[92%] min-[1320px]:max-h-[880px] min-[1320px]:gap-16 2xl:gap-x-auto 2xl:max-w-[82%]  2xl:max-h-[920px] min-[1620px]:max-h-[880px]  " >{/** Here are the changes for the flex that contains all the paintings (just the paintings)*/}
        {renderedFavPaints}
    </div> 
    <div className="flex justify-center"><Button rounded  primary >More Paintings</Button></div>
    </div>
    </div>
    
}


export default FavoritePaints

//min-lg:max-h-[900px] md:max-h[900px] lg:max-h-[2100px] md:max-w-[95%]
//min-xl:max-h-[900px] 2xl:max-h-[900px]  p-8  drop-shadow-lg  
//max-sm:w-1/3 max-[450px]:w-full md:w-1/3 xl:w-1/6   md:w-1/4

