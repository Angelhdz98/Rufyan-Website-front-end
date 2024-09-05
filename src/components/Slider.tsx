import { Suspense, useEffect, useState } from "react";
import React from "react";
//import image1 from "../../public/assets/Images/imgObras/obra1.jpg"
//import image2 from "../../public/assets/Images/imgObras/obra2.jpg"
//import image3 from "../../public/assets/Images/imgObras/obra3.jpg"
//import styled from "styled-components";
import {SliderImgOpacity, SliderImgXScroll} from "./imgSliderOpacity";
import className from "classnames"

    



    interface SliderProps {
        images:string[];
        type: "opacity"| "slide";
        autoplay: boolean;
        className: string;
        intervalAutoplay: number;        

    }

 function Slider(props:SliderProps){
    const images = props.images;
    
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedImage, setSelectedImage] = useState(images[0])
    const [loaded, setLoaded] = useState(false);

    //const SliderImgOpacity = React.lazy(()=> import('./imgSliderOpacity'))

    useEffect(()=>{
       if (props.autoplay) {
        const interval = setInterval(()=>{
            selectNewImage(selectedIndex, images, true);
        }, props.intervalAutoplay);
        return ()=> clearInterval(interval);
       } 
    })


    const selectNewImage= (index: number, images:string[], next:boolean) =>{
        setLoaded(false);
        setTimeout(()=>{
         const condition= next ? index< images.length-1 : index>0;
        const nextIndex= next ? (condition ? index+1:0) : (condition ? index-1: images.length-1);
        //la logica anterior hacelos if necesarios para saber si va a adelante o hacia atras y
        // como trabajar en los extremos 
        setSelectedImage(images[nextIndex]);
        setSelectedIndex(nextIndex);
   
        }, 500)
                

    }

    const previous = () =>{
        /**
     * const condition= selectedIndex > 0;
        const nextIndex= condition ? selectedIndex-1 : images.length-1;
        setSelectedImage(images[nextIndex]);
        setSelectedIndex(nextIndex);
     */
        
        selectNewImage(selectedIndex, images, false);
    }
    const next = () =>{
        /*
        const condition= selectedIndex < images.length-1;
        const nextIndex= condition ? selectedIndex+1 : 0;
        setSelectedImage(images[nextIndex]);
        setSelectedIndex(nextIndex);
        */
       selectNewImage(selectedIndex,images, true);

    }

    return <div className="h-[650px]" > 
    
    <SliderImgOpacity   src={`../../../public/assets/Images/imgObras/${selectedImage}`}
                        loading="lazy" 
                        className={className('h-[95%] object-cover',loaded? "loaded":"",{}) } 
                        onLoad={()=>setLoaded(true)} />
        <button onClick={previous}>{"<"}</button>
        <button onClick={next}>{">"}</button>
    </div>

}


export default Slider;