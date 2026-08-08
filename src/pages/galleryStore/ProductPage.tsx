import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/navigation";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OriginalSelector from "./OriginalSelector";

import {
    PaintingDomainDetails,
    PaintingStock,
    ProductDTO,
    ProductTypeEnum,
} from "../../types/typesIndex";
import { getProductByIdRequest } from "../../components/ProductRequests";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { CiNoWaitingSign } from "react-icons/ci";
import { LikeButton } from "../../components/LikeButton";

function ProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState<ProductDTO | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const productId = Number(id);

        if (!id || Number.isNaN(productId) || productId <= 0) {
            setError("No se encontró un id válido del producto.");
            setIsLoading(false);
            return;
        }

        const fetchProduct = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const response = await getProductByIdRequest(productId);
                setProduct(response);
            } catch (err) {
                console.error(err);
                setError("No se pudo cargar la información del producto.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const slides = product?.images?.map((image, index) => (
        <SwiperSlide key={`${image.url}-${index}`} className="h-auto">
            <img
                src={image.url}
                alt={image.productName}
                loading="lazy"
                className="w-full h-full object-cover"
            />

        </SwiperSlide>
    ));

    const originalAvailableTag = () => {
        if (product) {
            const paintingStock = product.productStockDTO as PaintingStock;
            if (paintingStock.isOriginalAvailable) {
                return <div className="flex">
                    Original
                    <IoIosCheckmarkCircle className="text-green-500 mt-1" />
                </div>
            } else if (paintingStock.stockCopies > 0) {
                return <div className="flex items-center" >
                    Original
                    <CiNoWaitingSign className="text-red-500 stroke-2 " />
                </div>
            } else {
                return <div className="font-bold text-red-500">
                    Sold out
                </div>;

            }

        } else return <div>no Product</div>

    }

    const renderProperties = () => {
        if (!product) return null;

        if (product.productTypeEnum === ProductTypeEnum.PAINTING) {
            const details = product.productDetails as PaintingDomainDetails;
            const stock = product.productStockDTO as PaintingStock;

            return (
                <div className="flex flex-col w-full px-4 gap-1">
                    <div>
                        <span className="font-semibold">Medium:</span> {details.medium}
                    </div>
                    <div>
                        <span className="font-semibold">Support material:</span>{" "}
                        {details.supportMaterial}
                    </div>
                    <div>
                        <span className="font-semibold">Available copies:</span>{" "}
                        {stock.stockCopies}/{stock.copiesMade}
                    </div>
                    <div>
                        <span className="font-semibold">Measures:</span> Height:{" "}
                        {details.alturaCm}cm - Length: {details.largoCm}cm
                    </div>
                </div>
            );
        }

        return <div>Other product type</div>;
    };

    if (isLoading) {
        return <div>Loading product…</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!product) {
        return <div>No product</div>;
    }

    return (
        <div className="w-full max-w-full overflow-x-hidden p-4 flex flex-col  md:flex-row md:flex-wrap sm:justify-center md:justify-center gap-4">
            <div className=" w-full md:w-[45%] lg:w-[40%] min-w-0 mx-auto    flex flex-col items-center   ">
                <div className="   max-w-full  sm:max-w-[70%]   ">
                    <Swiper
                        navigation
                        effect="slide"
                        loop
                        modules={[Navigation]}
                        className="rounded-t-lg overflow-hidden  "
                    >
                        {slides}
                        <div className="flex gap-2 text-sm  original-available-tag absolute items-center z-10 bg-white/70 rounded top-2 left-4 px-1 ">
                            {originalAvailableTag()}
                        </div>
                        <div className={`text-[#eb4b1b] rounded-md text-3xl absolute z-10 bottom-12 right-4   border bg-white/70  cursor-pointer scale-[1.5] `} >
                            <LikeButton productId={product.id} />
                        </div>

                    </Swiper>

                    <div className="border-b-4 border-x-4 rounded-b-md border-black">
                        <span className="block p-2">{product.name}</span>
                    </div>

                    <div className="px-3">
                        <div className="mt-4 w-full break-words   ">
                            <span className="font-semibold">Description:</span>{" "}
                            {product.description}
                        </div>

                        <div className="mt-2 w-auto break-words">
                            <span className="font-semibold">Category:</span>{" "}
                            {product.productTypeEnum}
                        </div>
                    </div>


                </div>
            </div>

            <div className="w-full md:flex-1 min-w-0 flex flex-col gap-4">
                <OriginalSelector product={product} />
                {renderProperties()}
            </div>
        </div>
    );
}

export default ProductPage;