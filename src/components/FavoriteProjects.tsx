import Slider from "react-slick"
import { RootState } from "../store"
import { useSelector } from "react-redux"
import { NextArrow, PrevArrow } from "./SlideBanner";
import type { Settings } from "react-slick";
import Button from "./Button";
function FavoriteProjects(){
    const settings: Settings ={
        dots: true,
        infinite:true,
        speed:500,
        slidesToShow:6,
        slidesToScroll: 6,
        autoplay: false,
        autoplaySpeed:8000,

        nextArrow:<NextArrow />,
        prevArrow:<PrevArrow />,
        rows:2,
    };
const projects = useSelector((state:RootState)=> state.projects.data)
    
const renderedProjects = projects.map((project)=>{
    return <div key={project.title} className="flex flex-col  border border-black border-2 rounded-lg overflow-hidden h-[350px]">
        <div className="w-full ">
        <img className="w-full max-h-[190px]"   src={project.images[1]}  />
        </div>
        <div className="max-h-[80px] overflow-hidden border border-blue-800">
           
            <span className="font-bold text-md ">
                {project.title}
            </span>

             <p className=" text-sm">
                <span className="font-semibold text-sm ">Description: </span>
                {project.description}  
             </p>

        </div>
        <div>
            <Button>See More</Button>
        </div>
    </div>
})

return <div className="flex justify-center" >
    <Slider {...settings}  className="w-full " >
        {renderedProjects}
        </Slider>

</div>
 
}

export default FavoriteProjects