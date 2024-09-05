import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCoverflow, EffectCreative} from "swiper/modules";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { AppDispatch, fetchPaintings, RootState } from "../../store";
import { useSelector } from "react-redux";
import FavoritePaint from "../../components/FavoritePaint";
import SwiperSlider from "../../components/SwiperSlider";
import PaintingPreview from "../../components/PaintingPreview";


function StorePage(){
    
    const dispatch= useDispatch<AppDispatch>();
    const {data, isLoading, error} = useSelector((state: RootState)=>{
      console.log(state.paintings);  
      return state.paintings;
    })
    
    useEffect(()=>{
      dispatch(fetchPaintings());
    },[dispatch])

    const handleClick = () =>{
        console.log("Navegar a obra especifica")
    }
    
    const  firstPaint = data[1];
    const renderedPaints = data.map((paint)=>{
        return <SwiperSlide key={paint.id}>
          <SwiperSlider key={paint.id} images={paint.image}  />   
           </SwiperSlide> 

      });
    return  <div >
      <div className="flex m-4 gap-8 h-[450px]"> 
        <div className="w-1/3 relative flex items-center  rounded-xl overflow-hidden">
        <img className="h-full w-full "
         src={"/public/assets/Images/galeria/RufyanPainting.jpg"} 
         alt="" />
        
        <div className="text-white text-xl bg-slate-900 opacity-80 absolute bottom-1 bg-">Plasmando mi visión en distintas técnicas y estilos</div>
         
       </div>
       
      
        <div className="w-2/3 flex">
        {/*<SwiperProducts> </SwiperProducts>*/}
      <Swiper navigation  
      modules={[Navigation]}
      watchSlidesProgress
      spaceBetween={"20px"}
      slidesPerView={3}>
        

      {renderedPaints}
      </Swiper>
        

        

        </div>

        </div>   
      
      <PaintingPreview
      paint={firstPaint}/>

    </div>
}

export default StorePage;