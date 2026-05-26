
import { Product } from "../types/typesIndex"
import { LoadingPaint } from "./LoadingPaint";
import { useEffect } from "react";
import SwiperSlider from "./SwiperSlider";
import { useNavigate } from "react-router-dom";
import ProductLabel from "./ProductLabel";

interface FavoriteproductProps {
  product: Product;
  isLoading: boolean;
  clicked: boolean;
  isVisible: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;

}

function FavoriteProduct(props: FavoriteproductProps) {

  const navigate = useNavigate();
  useEffect(() => {

  }, [])


  const renderedFavPaints = props.isLoading ? <LoadingPaint /> :
    (<div onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      key={props.product.id}
      className="border border-black my-4 rounded-lg relative cursor-pointer overflow-hidden "
    >

      {/** 
      className="w-full max-w-full  h-auto  border border-black rounded-lg  drop-shadow-lg overflow-hidden min-[490px]:w-1/3 sm:w-1/4 min-[880px]:w-1/5 min-[1320px]:w-1/6 2xl:w-1/5 min-[1620px]:w-1/6 "   */}  {/** Here are the changes for a single frame (a painting) */}
      <SwiperSlider onClick={() => navigate(`store/paintings/${props.product.id}`)} key={props.product.id} images={props.product.images} className="relative" product={props.product} />
      <ProductLabel onClick={props.onClick} isVisible={props.isVisible} clicked={props.clicked} product={props.product} />
    </div>)

  return renderedFavPaints;

}

export default FavoriteProduct;