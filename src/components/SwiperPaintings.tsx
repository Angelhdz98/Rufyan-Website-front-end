import {Swiper, SwiperSlide } from "swiper/react";
import PaintingPreview from "./PaintingPreview";
import {  Pagination, } from "swiper/modules";
import { Fragment, useContext } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import PaintingLoader from "./PaintingLoader";
import { ProductContext } from "../pages/galleryStore/ProductsContext";


function SwiperPaintings(){

const navigate = useNavigate();

const productContext = useContext(ProductContext); 
 
    
 
    const goToPaintingCategoryHandler = () =>{
      console.log("viajar a categoría pintura");
      navigate('/store/paintings');


    }
    const data = productContext?.products; 

    let renderedPaints = <div></div>;

    if(productContext?.isLoading){

      renderedPaints = <Fragment> <PaintingLoader/> <PaintingLoader/> <PaintingLoader/> <PaintingLoader/>  <PaintingLoader/> <PaintingLoader/> <PaintingLoader/> <PaintingLoader/>  </Fragment>    
    }else if(productContext?.error ){
      renderedPaints =  <div>Ha ocurrido un error: {productContext.error}</div>
    }else{

    }

    
    
if(data)
    { renderedPaints = (
        <Fragment>
          {data.map((paint) => (
            <SwiperSlide key={paint.id} className="drop-shadow-xl">
              <PaintingPreview paint={paint} />
            </SwiperSlide>
          ))}
        </Fragment>
      );
    }
      

 return   <div className="flex flex-col w-full relative">
        
        
        <span className="mb-1">
          Obras de arte
          </span>
          <hr className="border border-black  mb-2 -mt-1" />
        

        <div className="flex">
        <Swiper  
        
        breakpoints={{
          320: {
          slidesPerView:2,
          spaceBetween: 15,
        },
        640: {
          slidesPerView:2,
          spaceBetween: 15,
        },
        768: {
          slidesPerView:3,
          spaceBetween: 15,
        },
        1024: {
          slidesPerView:4,
          spaceBetween: 15,
        },
        1280: {
          slidesPerView:5,
          spaceBetween: 15,
        },
        1536: {
          slidesPerView:5,
          spaceBetween: 15,
        },
       }}
      className="previewImageSlider"
      grabCursor 
      freeMode
      modules={[Pagination]}
      pagination={{
         clickable:  true 
        }}
      watchSlidesProgress
      
      >
      {renderedPaints}
      </Swiper>

     
        </div>
        
          <Button onClick={goToPaintingCategoryHandler} rounded primary className="w-fit self-center absolute bottom-0 cursor-pointer right-[16.6%] px-3 z-10">
          Ver todas las obras
          </Button>

       </div>

}

export default SwiperPaintings