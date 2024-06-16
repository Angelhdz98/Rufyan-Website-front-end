
import { Settings } from "react-slick";
import { NextArrow, PrevArrow } from "./SlideBanner";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import type { PaintLabelProps } from "./PaintLabel";
import { Fragment } from "react/jsx-runtime";

function ImgSlider({paint}:PaintLabelProps){
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
        <Fragment  >
          <Slider {...settings}>
            {paint.images.map((image, index)  => (
              <Fragment key={index} >
                <img src={image} alt={`Slide ${index}`} />
              </Fragment>
            ))}
          </Slider>
        </Fragment>
      );
    
    }

    export default ImgSlider;