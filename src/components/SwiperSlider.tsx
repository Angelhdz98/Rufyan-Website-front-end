import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCards, EffectFade} from "swiper/modules";


import "swiper/css/navigation"
import "swiper/css"
import "swiper/css/effect-cards"


 //  importamos los estilos para el lazy loading



import { ImageProduct } from "../types/typesIndex";
import { useState } from "react";

interface SwiperSliderProps{
    images: ImageProduct[] ;
};


function SwiperSlider(props:SwiperSliderProps){

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [loaded, setLoaded] = useState(false);

    const nextSlide = ()=>{
        setLoaded(false);

        if(selectedIndex < props.images.length-1){
            
            setSelectedIndex(selectedIndex+1);
            console.log(props.images.length+"  " + selectedIndex);
        }else if (selectedIndex == props.images.length-1) {
           
            setSelectedIndex(0);
            console.log("else if activado");

        }
        console.log("indice seleccionado por next "+ selectedIndex);
    }
    const prevSlide = ()=>{
        setLoaded(false);

        if(selectedIndex == 0){
            setSelectedIndex(props.images.length-1);
        }else {
            setSelectedIndex(selectedIndex-1);
        }
        console.log("indice seleccionado por prev"+selectedIndex);
        
    }

    const loadedHandler = () =>{
        setLoaded(true);
        console.log(" Indice seleccionado tra finalizar la carga " +selectedIndex);
    }
    

    const slides= props.images.map((image, index)=>{
        return <SwiperSlide   key={index}   className="h-auto  ">
            {/***object-cover h-full  */}
            {//SRC para conectar con la API
            /*src={`http://localhost:8080${image.url}`}*/}
            <img   src={image.url} 
                    alt={image.productName}
                    loading="lazy"
                    onLoadedData={() =>loadedHandler()}
                    className={(selectedIndex==index?"":"hidden ") + (loaded?" opacity-100 " : "  ") +" object-cover  rounded-lg h-full   "} />
                    <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
            
            </SwiperSlide>
    })

    return <Swiper
                 onSlideNextTransitionStart={nextSlide}
                 onSlidePrevTransitionStart={prevSlide}
                navigation 
                effect="cards"  loop 
                modules={[Navigation, EffectCards]}
                watchSlidesProgress
                lazyPreloadPrevNext={0}
                
                


                >
        {slides}
    </Swiper> 

}

export default SwiperSlider