import { ImageProduct } from "../types/typesIndex";
import SwiperSlider from "./SwiperSlider";
 
interface ImageSwiperProps{
    image: ImageProduct[];
    title: string
}

function ImageSwiper({image, title}:ImageSwiperProps){


 /*   const renderedImages= image.map((singleImage)=>{
        
        return <SwiperSlide className="w-full h-auto" >
            <img className="object-cover h-full w-full " src={singleImage.url} alt={singleImage.productName} />
        </SwiperSlide> 
    });

    */
    return (<div className="drop-shadow-lg rounded-none" >
        
        <SwiperSlider images={image} className=" rounded-t-lg overflow-hidden "/>
        
        {/*renderedImages*/}        
    <div className="  bg-white rounded-b-lg border border-b-2 border-r-2 border-l-2 border-black px-3">
        {title}
        </div>
        </div> );
}

export default ImageSwiper;