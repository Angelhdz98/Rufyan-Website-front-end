import { Swiper, SwiperSlide } from "swiper/react"

 
 
 interface SwiperProducts{
    
 }


 function SwiperProducts( children){

    
    const renderedProducts = children.map((product)=>{
        return <SwiperSlide> {product} </SwiperSlide>
    });
    



 }


 export default SwiperProducts;