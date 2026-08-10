import FavoriteProduct from "../../components/FavoriteProduct";
import { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import { getAccessToken } from "../ControlPanel/authStore";
import { jwtDecode } from "jwt-decode";
import { ProductDTO, TokenPayload } from "../../types/typesIndex";
import { getLikedProducts } from "../../components/ProductRequests";
import { mapProductDTOToProduct } from "../ControlPanel/ProductBackendMapper";

function UserLikes() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [pageNumber] = useState(0);
  const [productsDTO, setProductsDTO] = useState<ProductDTO[]>([]);


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
    if (isAuthenticated) {
      if (isAdmin) { alert("Los likes son solo para los usuarios los productos favoritos estan la pagina principal"); }
      else {

        getLikedProducts(pageNumber).then((response) => {
          setProductsDTO(response.content);
        }).catch((error) => {
          alert("Hubo un error pidiendo la obra:  " + error);
        }).finally(() => {
          setIsLoading(false);
        });
      }
    }

  }, [pageNumber, isAuthenticated, isAdmin]);

  const [isLoading, setIsLoading] = useState(true);
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

  const renderedFavPaints = productsDTO.map((fp) => {
    const isVisible = (visibleLabels[fp.id] || clickedPaints[fp.id]);
    return <FavoriteProduct

      key={fp.id}
      product={mapProductDTOToProduct(fp)}
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