
import { Settings } from "react-slick";
import { NextArrow, PrevArrow } from "./SlideBanner";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Fragment } from "react/jsx-runtime";
import { Painting } from "../types/typesIndex";

export interface imgSliderProps{
  paint: Painting;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
}

function ImgSlider({paint}:imgSliderProps){
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
    
    return (
        <Fragment >
          
          <Slider {...settings} className="hover:drop-shadow-2xl w-full z-10 relative h-auto flex flex-col">
            {paint.images.map((image, index)  => (
              <Fragment key={index} >
                <img src={image} alt={`Slide ${index}`} className="hover:drop-shadow-2xl w-full" />
              </Fragment>
            ))}
          </Slider>
          
        </Fragment>
      );
    
    }

    export default ImgSlider;