import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch } from "react-redux";
import { Pagination } from "swiper/modules";
import { useEffect } from "react";
import { AppDispatch, fetchPaintings, RootState } from "../store";
import { useSelector } from "react-redux";
import ProductPreview from "./ProductPreview";


function SwiperProducts() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, isLoading, error } = useSelector((state: RootState) => {
    return state.otherProducts;
  })

  useEffect(() => {
    dispatch(fetchPaintings());
  }, [dispatch])

  const handleClick = () => {
    console.log("Navegar a obra especifica")
  }






  const renderedPaints = data.map((paint) => {
    return <SwiperSlide key={paint.id} className="drop-shadow-xl">
      <ProductPreview product={paint} />
    </SwiperSlide>

  });



  return <div className="flex flex-col w-full">
    <span className="mb-1">
      Otros productos
    </span>
    <hr className="mb-4 font-bold border-black" />
    <div className=" flex">
      <Swiper

        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 15,
          },
          1280: {
            slidesPerView: 5,
            spaceBetween: 15,
          },
          1536: {
            slidesPerView: 6,
            spaceBetween: 15,
          },
        }}
        className="previewImageSlider"
        grabCursor
        freeMode
        modules={[Pagination]}
        pagination={{
          clickable: true
        }}
        watchSlidesProgress
      >
        {renderedPaints}
      </Swiper>


    </div>

  </div>

}

export default SwiperProducts