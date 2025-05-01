import { useSelector } from "react-redux";
import { RootState } from "../../store";
import FavoritePaint from "../../components/FavoritePaint";
import { useState } from "react";
import Masonry from "react-masonry-css";

function UserLikes(){

    const {data, isLoading, error} = useSelector((state: RootState)=> state.paintings);
    const [visibleLabels, setVisibleLabels] = useState<Record<number, boolean>>({})
  const [clickedPaints, setClickedPaints] = useState<Record<number, boolean>>({});
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


    return <div className="flex flex-col">
        <span>My likes</span>
        
        <div className="flex flex-col m-4 border border-red-700 bg-red-700 rounded-md">
    
      <Masonry breakpointCols={breakpoints}
        className="flex w-full "
        columnClassName=" p-4 my-2 "
      >
        {renderedFavPaints}
      </Masonry>
    
    
  </div>

        
    </div>
}

export default UserLikes;