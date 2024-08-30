import PaintLabel from "./PaintLabel"
import ImgSlider from "./ImgSlider"
import { Painting } from "../types/typesIndex"
import { LoadingPaint } from "./LoadingPaint";
import { useEffect } from "react";

interface FavoritePaintProps{
    paint: Painting;
    isLoading: boolean;
    clicked: boolean;
    isVisible: boolean; 
    onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
} 
 
function FavoritePaint({paint,clicked, isVisible,onMouseEnter, onClick, onMouseLeave, isLoading}:FavoritePaintProps){

  useEffect(()=>{

  },[]) 


    const renderedFavPaints= isLoading? <LoadingPaint/>:(<div onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave} 
      onClick={onClick}  
      key={paint.id}
      className="border border-black my-4 rounded-lg relative cursor-pointer overflow-hidden "
      >
       
      {/** 
      className="w-full max-w-full  h-auto  border border-black rounded-lg  drop-shadow-lg overflow-hidden min-[490px]:w-1/3 sm:w-1/4 min-[880px]:w-1/5 min-[1320px]:w-1/6 2xl:w-1/5 min-[1620px]:w-1/6 "   */}  {/** Here are the changes for a single frame (a painting) */} 
<ImgSlider key={paint.id} paint={paint} />
<PaintLabel isVisible={isVisible} clicked={clicked} paint={paint}    />
</div>)
    
     return renderedFavPaints;

}

export default FavoritePaint;