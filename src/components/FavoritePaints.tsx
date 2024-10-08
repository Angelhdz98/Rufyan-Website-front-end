
//  import type { fetchPaintingsResult } from "../pages/home/homeLoader";
//  import { ReactNode, useEffect } from "react";
//  import { Product } from "../types/typesIndex";
//  import { useDispatch } from "react-redux";
//  import { AppDispatch, fetchFavPaintings } from "../store";
import { useSelector } from "react-redux";
import { AppDispatch, fetchFavPaintings, RootState } from "../store";
import Button from "./Button";
import { useEffect, useState } from "react";
import FavoritePaint from "./FavoritePaint";
import Masonry from "react-masonry-css";
import { LoadingPaint } from "./LoadingPaint";
import { useDispatch } from "react-redux";

function FavoritePaints() {
  const dispatch = useDispatch<AppDispatch>();
  const {data, isLoading, error} = useSelector((state: RootState)=> state.paintings);

  const [visibleLabels, setVisibleLabels] = useState<Record<number, boolean>>({})
  const [clickedPaints, setClickedPaints] = useState<Record<number, boolean>>({});
 useEffect(( ) => {
  dispatch(fetchFavPaintings());
 }, [dispatch])
 
  const handleMouseEnter = (id: number) => {
    setVisibleLabels((prev) => ({ ...prev, [id]: true }))
  };

  const handleMouseLeave = (id: number) => {
    setVisibleLabels((prev) => ({ ...prev, [id]: false }));

  }
  const handleClick = (id: number) => {
    setClickedPaints((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderedFavPaints =  data.map((fp) => {
    const isVisible = (visibleLabels[fp.id] || clickedPaints[fp.id]);
    return <FavoritePaint
      
      key={fp.id}
      paint={fp}
      clicked={clickedPaints[fp.id]}
      isVisible={isVisible}
      onMouseEnter={() => handleMouseEnter(fp.id)}
      onMouseLeave={() => handleMouseLeave(fp.id)}
      onClick={() => handleClick(fp.id)} 
      isLoading={isLoading} />

  })
  const breakpoints = {
    default: 4,
    1100: 4,
    980: 3,
    700: 2,
    490: 1
  }

  return <div className="flex flex-col ">
    
      <Masonry breakpointCols={breakpoints}
        className="flex w-full "
        columnClassName=" p-4 my-2 "
      >
        {renderedFavPaints}
      </Masonry>
    
    {/**
      <div className="flex flex-col flex-wrap   justify-center   gap-x-auto gap-y-2     min-[490px]:max-h-[1250px] min-[490px]:max-w-[93.5%] min-[490px]:gap-x-4   md:gap-x-6  md:max-w-[90.5%] sm:max-h-[950px] min-[880px]:max-h-[800px] min-[880px]:max-w-[88%] min-[952px]:max-w-[89%] lg:max-w-[90%] min-[1152px]:max-w-[91%] xl:max-w-[92%] min-[1320px]:max-h-[880px] min-[1320px]:gap-x-16 2xl:gap-x-auto 2xl:max-w-[82%]  2xl:max-h-[920px] min-[1620px]:max-h-[880px]  " >
        
        {renderedFavPaints}
    </div> */ }
    {/** Here are the changes for the flex that contains all the paintings (just the paintings)*/}

    <div className="flex justify-center">
      <Button rounded primary >
        More Paintings
      </Button>
    </div>
  </div>

}


export default FavoritePaints

//min-lg:max-h-[900px] md:max-h[900px] lg:max-h-[2100px] md:max-w-[95%]
//min-xl:max-h-[900px] 2xl:max-h-[900px]  p-8  drop-shadow-lg
//max-sm:w-1/3 max-[450px]:w-full md:w-1/3 xl:w-1/6   md:w-1/4


