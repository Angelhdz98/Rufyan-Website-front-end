
import { Settings } from "react-slick";
import { NextArrow, PrevArrow } from "./SlideBanner";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
//import { Fragment } from "react/jsx-runtime";
import { Painting } from "../types/typesIndex";
import { useEffect, useRef, useState } from "react";
import { LoadingPaint } from "./LoadingPaint";


export interface imgSliderProps{
  paint: Painting;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
}



function ImgSlider({paint}:imgSliderProps){
    //const [sliderHeight, setSliderHeight] = useState<number | null>(null);
  const firstImageRef= useRef<HTMLImageElement | null>(null);
  const [refresh, setRefresh] = useState(0);

  /**
   * 
    const forceUpdate = ()=>{
    
    setRefresh(refresh+1);
  }
   */


 

  
  useEffect(() =>{
   
  }, []);

  

  const settings: Settings ={
        dots: true,
        infinite:true,
        speed:500,
        slidesToShow:1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed:8000,
        nextArrow:<NextArrow />,
        prevArrow:<PrevArrow />
    };
    
    // Función para convertir Uint8Array a URL de objeto
    
    const renderedFavPaintings = (
              
        <Slider {...settings} className="z-10">
          {
          paint.image.map((image, index)  =>        
 //           <div key={index} //className="h-full w-full">
              <img  ref = {index== 0?firstImageRef:null}
                    //onLoad={forceUpdate}
                    src={`http://localhost:8080${image.url}`} 
                    //className={"w-full h-full object-cover"} 
                    />
   //         </div>       
             

          )
          }
        </Slider>
        
      
    )

 

    return renderedFavPaintings;
     
    }

    export default ImgSlider;