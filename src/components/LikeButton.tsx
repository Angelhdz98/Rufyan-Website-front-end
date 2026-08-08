import { Fragment, useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { isProductLikedRequest, markAsLikedRequest, unmarkAsLikedRequest } from "./UserRequest";


/*interface LikeButtonProps extends HtmlHTMLAttributes<HTMLDivElement>{

}*/
export interface LikeButtonProps {
  productId: number
}
export function LikeButton(props: LikeButtonProps) {
  const [isProductLiked, setIsProductLiked] = useState(false);
  //const productData = useContext(ProductContext);




  useEffect(() => {

    if (props.productId)
      isProductLikedRequest(props.productId).then((isLikedByUser) => {
        setIsProductLiked(isLikedByUser);
      }).catch((error) => {
        alert("Hubo un error buscando el like: " + error);
      });



  }, []);

  const clickLikeHandler = () => {
    if (props.productId) {
      markAsLikedRequest(props.productId).then(response => {
        if (response) {
          setIsProductLiked(response);
        } else {
          alert("hubo un error desconocido");
        }

      }).catch((error) => {
        alert("Hubo un error: " + error);
      });
    } else return;
  };

  const clickUnlikeHandler = () => {

    if (props.productId) {
      unmarkAsLikedRequest(props.productId).then((response) => {
        if (response == false) {
          alert("Hubo un error desconocido")
        }
        setIsProductLiked(!response);
      }).catch((error) => {
        alert("Hubo un error: " + error);
      });
    } else {
      alert("No product selected");
    }



  }


  const likedHeart = <FaHeart onClick={clickUnlikeHandler} />
  const noLikedHeart = <FaRegHeart onClick={clickLikeHandler} />
  return <Fragment   >
    {isProductLiked ? likedHeart : noLikedHeart}
  </Fragment>
}