import 'swiper/css/pagination';
import '../../styles/stylePaginationSwiper.css'
import SwiperProducts from "../../components/SwiperProducts";
import SwiperPaintings from "../../components/SwiperPaintings";
import { useEffect, useState } from 'react';
import { ProductContext } from './ProductsContext';
import { GetProductsByTypeCommand, ProductDTO, ProductTypeEnum } from '../../types/typesIndex';
import { SorterTypeEnum, SortOrderEnum } from '../../components/Sorter';
import { getProductByTypeRequest } from '../../components/ProductRequests';


function StorePage() {

  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [selectedProductId, setSelectedProductId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOriginalSelected, setIsOriginalSelected] = useState<boolean>(false);


  useEffect(() => {
    const getPaintingCommand: GetProductsByTypeCommand = { pageNumber: 0, pageSize: 10, productType: ProductTypeEnum.PAINTING, sorterType: SorterTypeEnum.PRICE, sortOrder: SortOrderEnum.DESCENDING }
    setIsLoading(true);
    getProductByTypeRequest(getPaintingCommand).then((response) => {
      setProducts(response.content);

      alert("respuesta recibida de la petición: " + JSON.stringify(response.content));
    }).catch((error) => {
      setError(error)
      alert("Hubo un problema pidiendo las obras: \n " + error);

    }).finally(() => {
      setIsLoading(false);
    });

  }, []);

  return <div className="m-4">
    <span className=" font-semibold "> Store and gallery</span>
    <hr className="mb-4 font-bold border-black" />

    <div className="ml-4 px-2 text-black text-xl bottom-1 rounded w-fit ">
      Plasmo mi visión y mi arte en distintas tecnicas, estilos y productos que podras ver a continuación
    </div>
    <div className="w-full h-[200px] relative flex items-center  rounded-xl overflow-hidden mb-2">
      <img className="h-full w-full "
        src={"/public/assets/Images/galeria/RufyanPainting.jpg"}
        alt="" />
    </div>

    <div className="flex flex-col gap-0 relative">

      <ProductContext.Provider value={{ products, setProducts, selectedProductId, setSelectedProductId, error, isLoading, setError, setIsLoading, isOriginalSelected, setIsOriginalSelected }}>

        <SwiperPaintings />
        <SwiperProducts />

      </ProductContext.Provider>


    </div>




  </div>
}

export default StorePage;