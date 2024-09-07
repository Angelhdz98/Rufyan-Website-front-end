import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectCoverflow, EffectCreative} from "swiper/modules";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { AppDispatch, fetchPaintings, RootState } from "../../store";
import { useSelector } from "react-redux";

import PaintingPreview from "../../components/PaintingPreview";

import 'swiper/css/pagination';
import '../../styles.css'

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
    
    
    
    

    
    const renderedPaints = data.map((paint)=>{
        return <SwiperSlide key={paint.id}>
          <PaintingPreview paint={paint}    />   
           </SwiperSlide> 

      });
    return  <div >
      <div className="flex m-4 gap-8 "> 
        <div className="w-1/3 relative flex items-center  rounded-xl overflow-hidden">
        <img className="h-full w-full "
         src={"/public/assets/Images/galeria/RufyanPainting.jpg"} 
         alt="" />
        
        <div className="text-white text-xl bg-slate-900 opacity-80 absolute bottom-1 bg-">Plasmando mi visión en distintas técnicas y estilos</div>
         
       </div>
       
      
        <div className="w-2/3 flex">
        {/*<SwiperProducts> </SwiperProducts>*/}
      <Swiper  
      className="previewImageSlider"
      grabCursor 
      freeMode
      modules={[Pagination]}
      pagination={{
         
        }}
        
      watchSlidesProgress
      spaceBetween={"20px"}
      slidesPerView={3}>
        

      {renderedPaints}


      </Swiper>
        

        

        </div>

        </div>   
       

    </div>
}

export default StorePage;