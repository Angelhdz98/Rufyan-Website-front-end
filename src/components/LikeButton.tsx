import { Fragment, useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { isProductLikedRequest, markAsLikedRequest, unmarkAsLikedRequest } from "./UserRequest";
import { getAccessToken } from "../pages/ControlPanel/authStore";
import { jwtDecode } from "jwt-decode";
import { TokenPayload } from "../types/typesIndex";
import { isProductFavoriteByIdRequest, markProductAsFavoriteRequest, unmarkProductAsFavoriteRequest } from "./ProductRequests";


/*interface LikeButtonProps extends HtmlHTMLAttributes<HTMLDivElement>{

}*/
export interface LikeButtonProps {
  productId: number
}
export function LikeButton(props: LikeButtonProps) {
  const [isProductLiked, setIsProductLiked] = useState(false);
  //const productData = useContext(ProductContext);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);




  const checkAuth = () => {
    const accessToken = getAccessToken();

    if (!accessToken) {
      setIsAdmin(false);
      setIsAuthenticated(false);
      return;
    }

    try {
      const jwt = jwtDecode<TokenPayload>(accessToken);
      /*                console.log("Token decodificado en PrivateRoute:", jwt);
                      console.log("Rol:", jwt.role);
      */
      // Verificar si el rol es ROLE_ADMIN
      if (jwt.role === 'ROLE_ADMIN') {
        setIsAdmin(true);
        setIsAuthenticated(true);

      } else {
        setIsAdmin(false);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Error decodificando token:" + error);
      setIsAdmin(false);
    }
  };


  useEffect(() => {
    checkAuth();

    if (props.productId) {

      if (isAuthenticated) {
        //if User is admin component shows if Product is favorite  
        if (isAdmin) {
          isProductFavoriteByIdRequest(props.productId).then((isFavorite) => {
            setIsProductLiked(isFavorite);
          }).catch((error) => {
            alert("Ocurrió un error checando si la obra es favorita: " + error);
          });
        } else {
          //if is authenticated but is not admin will show if product is liked
          isProductLikedRequest(props.productId).then((isLikedByUser) => {
            setIsProductLiked(isLikedByUser);
          }).catch((error) => {
            alert("Hubo un error buscando el like: " + error);
          });
        }

      }



    }



  }, [props.productId, isAuthenticated, isAdmin]);

  const clickLikeHandler = () => {
    if (props.productId) {
      if (isAdmin) {
        markProductAsFavoriteRequest(props.productId).then((response) => {
          setIsProductLiked(response);
        }).catch((error) => {
          alert("Hubo un error marcando la obra como favorita " + error);
        });
      } else {
        markAsLikedRequest(props.productId).then(response => {
          if (response) {
            setIsProductLiked(response);
          } else {
            alert("hubo un error desconocido");
          }

        }).catch((error) => {
          alert("Hubo un error: " + error);
        });
      }
    } else return;
  };

  const clickUnlikeHandler = () => {

    if (props.productId) {
      if (isAdmin) {
        unmarkProductAsFavoriteRequest(props.productId)
          .then(() => {
            setIsProductLiked(false);
          })
          .catch((error) => {
            alert("Hubo un error desmarcando la obra como favorita: " + error);
          });
      } else {

        unmarkAsLikedRequest(props.productId)
          .then((response) => {
            if (response == false) {
              alert("Hubo un error desconocido")
            }
            setIsProductLiked(!response);
          })
          .catch((error) => {
            alert("Hubo un error: " + error);
          });
      }
    } else {
      alert("No product selected");
    }



  }


  const likedHeart = <FaHeart onClick={clickUnlikeHandler} />
  const noLikedHeart = <FaRegHeart onClick={clickLikeHandler} />
  return isAuthenticated ? <Fragment   >
    {isProductLiked ? likedHeart : noLikedHeart}
  </Fragment> : ""
}