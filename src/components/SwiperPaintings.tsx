import {Swiper, SwiperSlide } from "swiper/react";
import PaintingPreview from "./PaintingPreview";
import { useDispatch } from "react-redux";
import { Pagination, } from "swiper/modules";
import { Fragment, useEffect } from "react";
import { AppDispatch, RootState } from "../store";
import { useSelector } from "react-redux";
import Button from "./Button";
import { useNavigate } from "react-router-dom";


function SwiperPaintings(){
const dispatch= useDispatch<AppDispatch>();
const navigate = useNavigate();
    const {data, isLoading, error} = useSelector((state: RootState)=>{
        return state.paintings;
    })
    
    useEffect(()=>{
      //dispatch(fetchPaintings());
    },[dispatch])

    const goToPaintingCategoryHandler = () =>{
      console.log("viajar a categoría pintura");
      navigate('/store/paintings');


    }
  
    
    
    
    

    
    const renderedPaints = data.map((paint)=>{
        return <Fragment><SwiperSlide key={paint.id} className="drop-shadow-xl">
          <PaintingPreview paint={paint}  />   
           </SwiperSlide>
           
        </Fragment>  

      });
    
      

 return   <div className="flex flex-col w-full">
        <span className="mb-1">
          Obras de arte
          </span>
          <hr className="mb-4 font-bold border-black" />
        <div className=" flex">
        <Swiper  
        breakpoints={{
          320:{
          slidesPerView:2,
          spaceBetween: 15,
        },
        640:{
          slidesPerView:2,
          spaceBetween: 15,
        },
        768:{
          slidesPerView:3,
          spaceBetween: 15,
        },
        1024:{
          slidesPerView:4,
          spaceBetween: 15,
        },
        1280:{
          slidesPerView:5,
          spaceBetween: 15,
        },
        1536:{
          slidesPerView:6,
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