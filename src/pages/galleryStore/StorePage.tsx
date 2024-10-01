import 'swiper/css/pagination';
import '../../styles/stylePaginationSwiper.css'
import SwiperProducts from "../../components/SwiperProducts";
import SwiperPaintings from "../../components/SwiperPaintings";


function StorePage() {


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


      <SwiperPaintings />






    </div>

    <SwiperProducts />


  </div>
}

export default StorePage;