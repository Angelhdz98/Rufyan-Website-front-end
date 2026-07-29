import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//import ImageSwiper from "../../components/ImageSwiper";
import OriginalSelector from "./OriginalSelector";

import {
    PaintingDomainDetails,
    PaintingStock,
    ProductDTO,
    ProductTypeEnum,
} from "../../types/typesIndex";
import { getProductByIdRequest } from "../../components/ProductRequests";
import ImageSwiper from "../../components/ImageSwiper";
import { mapProductDTOToProduct } from "../ControlPanel/ProductBackendMapper";
//import { mapProductDTOToProduct } from "../ControlPanel/ProductBackendMapper";

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
        <div className="p-2">
            <ImageSwiper product={mapProductDTOToProduct(product)} title={product.name}/> 
            <div>
                <span className="font-semibold">Description:</span>{" "}
                {product.description}
            </div>
            <div>
                <span className="font-semibold">Category:</span>{" "}
                {product.productTypeEnum}
            </div>

            <div className="md:w-8/12 flex flex-col gap-4">
                <OriginalSelector />
                {renderProperties()}
            </div>
        </div>
    );
}

export default ProductPage;