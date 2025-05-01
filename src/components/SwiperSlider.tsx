import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCards, EffectFade, EffectCoverflow, EffectCube} from "swiper/modules";


import "swiper/css/navigation"
import "swiper/css"
import "swiper/css/effect-cards"


 //  importamos los estilos para el lazy loading



import { ImageProduct, isPainting, Painting, Product } from "../types/typesIndex";
import { HTMLAttributes, useState } from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { CiNoWaitingSign } from "react-icons/ci";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { LikeButton } from "./LikeButton";

interface SwiperSliderProps extends HTMLAttributes<HTMLDivElement>{
    images: ImageProduct[]; 
    product:Product;
    className?:string;
};


function SwiperSlider(props:SwiperSliderProps){

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const [isOriginalSelected, SetIsOriginalSelected]= useState(false);
    

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
    
    const priceTag = <div onClick={()=>SetIsOriginalSelected(!isOriginalSelected)}
    className="absolute top-2 px-1 right-4 z-10 bg-white/70 rounded-md">
        {(props.product && isPainting(props.product)&& isOriginalSelected  )? <span>Price original: {props.product.price}</span>:(props.product && isPainting(props.product)&& !isOriginalSelected  )? <span>Price copy: {props.product.price_copy} </span>: <span>Price product: {props.product?.price}</span> }
    </div>

const availability = ()=>{
    if(isPainting(props.product)&& props.product.isOrginalAvailable){
        return <div className="flex">
        Original
        <IoIosCheckmarkCircle className="text-green-500 mt-1" />
    </div> 
    }
    else if(isPainting(props.product)&&!props.product.isOrginalAvailable&& props.product.available_copies>0){
        return <div className="flex items-center" >
        Original
        <CiNoWaitingSign className="text-red-500 stroke-2 " />
    </div>

    } else if(!isPainting(props.product)&& props.product.available){
        return <div className="flex items-center" >
        Original
        <CiNoWaitingSign className="text-red-500 stroke-2 " /> 
        </div>
    } else{
        return <div className="font-bold text-red-500">
        Sold out
    </div>
    }
}

    const availabilityTag = <div className="flex gap-2 text-sm  original-available-tag absolute items-center z-10 bg-white/70 rounded top-2 left-4 px-1 ">{availability()}

    </div>;
         
         const availableCopies = isPainting(props.product)&& props.product.available_copies > 0 ?
        <div className="Available-copies text-xs bg-white/70 absolute z-10 left-3 rounded px-1  bottom-2">Copies: {props.product.available_copies}/{props.product.copies_made}</div> :
        <div className="z-10  text-red-500 font-bold text-xs bg-white/70 absolute left-3 rounded px-1  bottom-2">No copies available</div>

  /*
  const liked = ()=>{
    return <div className="text-[#eb4b1b] rounded-md text-3xl absolute right-4 bottom-2 border bg-white/70  z-10 ">
    {isProductLiked? <FaHeart onClick={() =>{setIsProductLiked(false)}} /> :<FaRegHeart  onClick={()=>setIsProductLiked(true)}/>}
  </div>
  
 }   
  */


    const slides= props.images.map((image, index)=>{
        return <SwiperSlide   key={index}   className="h-auto  ">
            {/***object-cover h-full  */}
            {//SRC para conectar con la API
            /*src={`http://localhost:8080${image.url}`}*/}
            <img   src={image.url} 
                    alt={image.productName}
                    onClick={props.onClick}
                    loading="lazy"
                    onLoadedData={() =>loadedHandler()}
                    className={(selectedIndex==index?"":"hidden ") + (loaded?" opacity-100 " : "  ") +" object-cover  h-full   " +props.className} />
                    <div className={"swiper-lazy-preloader swiper-lazy-preloader-white "}></div>
            
            </SwiperSlide>
    })

    return <Swiper
                 onSlideNextTransitionStart={nextSlide}
                 onSlidePrevTransitionStart={prevSlide}
                navigation 
                effect="cards"  loop 
                modules={[Navigation, EffectCube]}
                watchSlidesProgress
                lazyPreloadPrevNext={0}
                className={props.className}
                
                


                >  
                {priceTag}   
                {availabilityTag}  
                {availableCopies}
                <div className= {`text-[#eb4b1b] rounded-md text-3xl absolute z-10 bottom-2 right-2   border bg-white/70  cursor-pointer `} >
                <LikeButton/>   
                </div>
                
        {slides}
       
    </Swiper> 

}

export default SwiperSlider
