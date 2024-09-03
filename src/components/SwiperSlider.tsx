import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, EffectCards } from "swiper/modules";

import "swiper/css/navigation"
import "swiper/css"
import "swiper/css/effect-cards"

import { ImageProduct } from "../types/typesIndex";

interface SwiperSliderProps{
    images: ImageProduct[] ;
};


function SwiperSlider(props:SwiperSliderProps){

    
    const slides= props.images.map((image, index)=>{
        return <SwiperSlide   key={index}  className="h-auto  ">
            {/***object-cover h-full  */}
            <img    src={`http://localhost:8080${image.url}`}
                    alt=""
                    loading="lazy"
                    
                    className="object-cover h-full " />
             <div className="swiper-lazy-preloader"></div>
            </SwiperSlide>
    })

    return <Swiper
                lazyPreloadPrevNext={0} 
                navigation 
                effect="cards"  loop 
                modules={[Navigation, EffectCards]}
                watchSlidesProgress={true}
                >
        {slides}
    </Swiper> 

}

export default SwiperSlider