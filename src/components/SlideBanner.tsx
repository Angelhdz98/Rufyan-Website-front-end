
import Slider from "react-slick";
import imagen1 from "../assets/Images/Imagen1-BannerProjects.png"
import imagen2 from "../assets/Images/Imagen2-Banner-obras.png"
import imagen3 from "../assets/Images/Imagen3-bannerObras.png"
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Settings } from "react-slick";

import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";

 export const PrevArrow: React.FC<{onClick?:()=> void}> = ({onClick})=>{
  return <div className="absolute top-1/2 left-4 transform -translate-y-1/2 cursor-pointer z-10" onClick={onClick}>
    <MdOutlineKeyboardArrowLeft className="w-8 h-8 text-orange-500"/>
  </div>
} ;
export const NextArrow: React.FC<{onClick?:()=> void}> = ({onClick})=>{
  return <div  className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer z-10"
  onClick={onClick}>
    <MdOutlineKeyboardArrowRight className="w-8 h-8 text-orange-500"/>
  </div>
} ;



function SlideBanner(){
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

const images =[
    {imgUrl:imagen1,
      description: "Un dibujo que me eché en 10 minutos ",
      linkTo: "",
    
    },
    {imgUrl: imagen2,
      description:"Un dibujo que hice con la mano izquierda",
      linkTo: "",
    },
    {
      imgUrl: imagen3,
      description:"Una pintura tranquila ",
      linkTo: "",
    }

    
    
]

return (
    <div className="w-full mx-auto" >
      <Slider {...settings}>
        {images.map((image, index)  => (
          <div key={index} className="w-screen">
            <img src={image.imgUrl} alt={`Slide ${index}`} className="w-full h-auto"/>
          </div>
        ))}
      </Slider>
    </div>
  );

}

export default SlideBanner;