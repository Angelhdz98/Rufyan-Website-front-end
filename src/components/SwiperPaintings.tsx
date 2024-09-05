import { useSelector } from "react-redux";
import {Swiper, SwiperSlide} from "swiper/react";
import { AppDispatch, RootState } from "../store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchPaintings } from "../store/thunks/fetchPaintings";
import FavoritePaint from "./FavoritePaint";

function SwiperPaintings(){
    
    const {data, error, isLoading} = useSelector((state: RootState)=> state.paintings)
    const dispatch = useDispatch<AppDispatch>();
    const renderedPaints = data.map((paint)=>{
        return  <SwiperSlide><FavoritePaint paint={paint} clicked={true} onMouseLeave={()=>{}} onMouseEnter={() =>{}} onClick={()=>{}} isLoading={false} isVisible  />
        </SwiperSlide>
        
    }) 

    useEffect(()=>{
        dispatch(fetchPaintings());
    }, [dispatch])
    
    return <Swiper></Swiper>
}