import { Fragment, HtmlHTMLAttributes, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface LikeButtonProps extends HtmlHTMLAttributes<HTMLDivElement>{

}

export function LikeButton(props:LikeButtonProps){
    const [isProductLiked, setIsProductLiked] = useState(false);

    return <Fragment   >
    {isProductLiked? <FaHeart onClick={() =>{setIsProductLiked(false)}} /> :<FaRegHeart  onClick={()=>setIsProductLiked(true)}/>}
  </Fragment>
}