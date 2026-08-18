import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Settings } from "react-slick";

import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useEffect, useState } from "react";
import { getBannersRequest } from "../pages/ControlPanel/AdminRequests";
import { Banner } from "../types/typesIndex";

export const PrevArrow: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  return (
    <div
      className="absolute top-1/2 left-4 transform -translate-y-1/2 cursor-pointer z-10"
      onClick={onClick}
    >
      <MdOutlineKeyboardArrowLeft className="w-8 h-8 text-orange-500" />
    </div>
  );
};

export const NextArrow: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  return (
    <div
      className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer z-10"
      onClick={onClick}
    >
      <MdOutlineKeyboardArrowRight className="w-8 h-8 text-orange-500" />
    </div>
  );
};

function SlideBanner() {
  const [actualBanners, setActualBanners] = useState<Banner[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 8000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };

  useEffect(() => {
    let active = true;

    getBannersRequest()
      .then((response) => {
        if (active) {

          console.log("La respuesta recibida de banners es: " + JSON.stringify(response));
          setActualBanners(Array.isArray(response) ? response : []);

          setIsLoading(false);

        }
      })
      .catch((error) => {
        console.error("falló al recibir los banners", error);
        if (active) {
          setActualBanners([]);
          setIsLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  if (isLoading) {
    return <div className="w-full h-48 sm:h-[20vh] md:h-[25vh] flex items-center justify-center text-gray-500">Cargando banners...</div>;
  }

  if (actualBanners.length === 0) {
    return <div className="w-full h-48 sm:h-[20vh] md:h-[30vh] flex items-center justify-center text-gray-500">No hay banners disponibles</div>;
  }



  return (
    <div className="w-full mx-auto overflow-hidden relative">
      <Slider key={actualBanners.length} {...settings}>
        {actualBanners.map((banner, index) => {

          const bannerMessage = banner.message.length > 2 ? <div className="bg-white/70 rounded-lg px-2 absolute z-20 bottom-8 left-10  ">
            <span className="">{banner.message} </span>
          </div> : ""

          return <div key={banner.id ?? index} className="w-full overflow-hidden relative">
            <a href={banner.goTo} className="block w-full">
              <img
                src={banner.imageUrl}
                alt={`Slide ${index}`}
                className="w-full h-48 sm:h-[20vh] md:h-[30vh] object-cover"
              />
              { bannerMessage}

            </a>
          </div>
        })
        }
      </Slider>
    </div>
  );
}

export default SlideBanner;