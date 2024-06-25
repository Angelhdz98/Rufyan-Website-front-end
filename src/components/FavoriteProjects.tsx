import Slider from "react-slick"
import { RootState } from "../store"
import { useSelector } from "react-redux"
import { NextArrow, PrevArrow } from "./SlideBanner";
import type { Settings } from "react-slick";
import Button from "./Button";
import ProjectCard from "./ProjectCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function FavoriteProjects(){
    const settings: Settings ={
        dots: true,
        infinite:true,
        speed:500,
        slidesToShow:5,
        className:"center",
        slidesToScroll: 3,
        autoplay: false,
        autoplaySpeed:8000, 
        nextArrow:<NextArrow />,
        prevArrow:<PrevArrow />,
        rows:2,
        centerPadding:"40px",
        responsive: [
            {
                breakpoint: 1024,
                settings:{
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    rows:2,
    
                }
            },
            {
                breakpoint: 768,
                settings:{
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    rows:2,
    
                }
            },
            {
            breakpoint: 640,
            settings:{
                slidesToShow: 2,
                slidesToScroll: 2,
                rows:2,

            }
        },
            {
            breakpoint: 490,
            settings:{
                slidesToShow: 1,
                slidesToScroll: 1,
                rows:4,

            }
        },
        
    ],

       
    };
const projects = useSelector((state:RootState)=> state.projects.data)
    
const renderedProjects = projects.map((project)=>{
    return <ProjectCard key={project.title} project={project} />
})

return <div className="flex  flex-col justify-center " >
    <Slider {...settings} className="m-4"   >
        {renderedProjects}
        </Slider>
    <div ><Button className="mx-auto" rounded success>See All projects </Button> </div>
</div>
 
}

export default FavoriteProjects