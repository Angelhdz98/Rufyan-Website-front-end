import { useContext, useEffect, useState } from "react";
import ImageSwiper from "../../components/ImageSwiper";
import OriginalSelector from "./OriginalSelector";

import { ProductContext } from "./ProductsContext";
import { getProductByIdRequest } from "../../components/ProductRequests";
import { PaintingDomainDetails, PaintingStock, ProductDTO, ProductTypeEnum } from "../../types/typesIndex";
import { mapProductDTOToProduct } from "../ControlPanel/ProductBackendMapper";




function ProductPage() {

    const productContext = useContext(ProductContext); 

    const [product, setProduct] = useState<ProductDTO|null>(null)

    useEffect(()=>{ 
        if(productContext && productContext.selectedProductId){
            productContext.setIsLoading(true); 
                getProductByIdRequest(productContext.selectedProductId)
                .then((response)=>{
                        setProduct(response);
                })
                .catch((error)=>{
                    alert("Hubo un error encontrando la obra con el id: "+ productContext.selectedProductId + "\n error:"+ error); 
                }).finally(()=>{
                    productContext.setIsLoading(false);
                });
        }
         

    }, [])

    

    const renderedProperties = () => {

        if (product?.productTypeEnum == ProductTypeEnum.PAINTING) {

            const paintingDomainDetails: PaintingDomainDetails = product.productDetails as PaintingDomainDetails; 
            const paintingStock: PaintingStock = product.productStockDTO as PaintingStock; 


            return <div className=" flex flex-col w-full px-4">
                <div className="flex flex-row">
                    <span className="font-semibold">Medium</span>
                    <span>{": " + paintingDomainDetails.medium}</span>
                </div>
                <div className="flex flex-row">
                    <span className="font-semibold">Support material </span>
                    <span>{": " + paintingDomainDetails.supportMaterial}</span>
                </div>
                <div className="flex flex-row">
                    <span className="font-semibold">Available copies </span>
                    <span>{": " + paintingStock.stockCopies}/{paintingStock.copiesMade}</span>
                </div>
                <div className="flex flex-row">
                    <span className="font-semibold">Measures </span>
                    <span>{": Height: " + paintingDomainDetails.alturaCm + "cm Length: " + paintingDomainDetails.largoCm + "cm"}</span>
                </div>
            </div>
        }
        return <div> Is other thing</div>
    }

    if (productContext?.isLoading) {
        return <div>Is loading. . . </div>
    }

    else if (productContext?.error) {
        return <div> {productContext.error}</div>

    }
    console.log("data ", productContext?.products[0])
    if (!productContext?.isLoading && productContext?.error == null && product) {
        return <div className="main-body w-full flex flex-col md:flex-row  md_gap-4 p-4 py-4 h-fit">
            <div className="first-column md:w-4/12 h-fit">


                <ImageSwiper product={mapProductDTOToProduct(product)}  title={product.name} />
                <div className="p-2">
                    <div>
                        <span className="font-semibold">
                            Description:
                        </span>
                        {" " + product.description}
                    </div>
                    <div>
                        <span className="font-semibold">
                            Category:
                        </span>
                        {" " + product.productTypeEnum.toString()}
                    </div>
                </div>


            </div>
            <div className="second-column   md:w-8/12 ">
                <div>
                    <OriginalSelector />


                </div>

                {renderedProperties()}


            </div>
        </div>

    }








}

export default ProductPage;