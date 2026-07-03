import NavProduct from "../../components/NavProduct";
import {  useEffect, useState } from "react";
import Modal from "../../components/Modal";
import PaintingLoader from "../../components/PaintingLoader";
import EditProductForm from "./EditProductForm";
import { Page, Product } from "../../types/typesIndex";
import ProductEditingPreview from "../../components/ProductEditingPreview";
import mapBackendProductToFrontend from "./ProductBackendMapper";
//import { SorterTypeEnum, SortOrderEnum } from "../../components/Sorter";

//import StockTag from "../../components/StockTag";
import { ProductEditingContextProp, ProductsEditingContext } from "./useEditProductsContext";
import { SortOrderEnum, SorterTypeEnum } from "../../components/Sorter";
import { handleGetPagedProducts } from "../../components/ProductRequests";
// Función para mapear la respuesta del backend a la estructura esperada


function EditAll() {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | undefined>("");
    const [receivedProduct, setReceivedProducts] = useState<Product[]>([]);

    const [sortOrder, setSortOrder] = useState(SortOrderEnum.ASCENDING);
    const [sortBy, setSortBy] = useState(SorterTypeEnum.CREATION_DATE);
    const [pageNumber, setPageNumber] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const [selectedProduct, setSelectedProduct] = useState<number | undefined>(-1);
    const [searchTerm, setSearchTerm] = useState<string | undefined>();
    const [totalPages, setTotalPages] = useState<number | undefined>(20);




    // For testing 
    /* const initialTestState: Product[] = [
         {
             "id": 1,
             "name": "Obra de prueba",
             "images": [
                 {
                     "id": 2,
                     "productName": "Obra de prueba",
                     "url": "/public/assets/Images/imgObras/obra1.jpg"
                 },
                 {
                     "id": 1,
                     "productName": "Obra de prueba",
                     "url": "/public/assets/Images/imgObras/obra2.jpg"
                 }
             ],
             "description": "ya jalaa",
             "productStock": {
                 "isOriginalAvailable": true,
                 "stockCopies": 0,
                 "copiesMade": 0,
                 "stockType": "PAINTING_STOCK"
             },
             "productPricing": {
                 "pricePerOriginal": 49999,
                 "pricePerCopy": 4999,
                 "pricingType": "ORIGINAL"
             },
             "productTypeEnum": ProductTypeEnum.PAINTING,
             "productDomainDetails": {
                 "alturaCm": 40,
                 "largoCm": 30,
                 "medium": "OIL_PAINT",
                 "supportMaterial": "COTTON_PAPER",
                 "creationDate": new Date("2026-05-04"),
                 productTypeEnum: ProductTypeEnum.PAINTING
 
             },
             "isFavorite": true
         },
         {
             "id": 2,
             "name": "Obra de prueba 2 que parece que si funciona",
             "images": [
                 {
                     "id": 4,
                     "productName": "Obra de prueba 2 que parece que si funciona",
                     "url": "/public/assets/Images/imgObras/obra3.jpg"
                 },
                 {
                     "id": 3,
                     "productName": "Obra de prueba 2 que parece que si funciona",
                     "url": "/public/assets/Images/imgObras/obra4.png"
                 }
             ],
             "description": "Una obra que acabo de hacer con mocos",
             "productStock": {
                 "isOriginalAvailable": true,
                 "stockCopies": 0,
                 "copiesMade": 0,
                 "stockType": "PAINTING_STOCK"
             },
             "productPricing": {
                 "pricePerOriginal": 49996,
                 "pricePerCopy": 7000,
                 "pricingType": "ORIGINAL"
             },
             "productTypeEnum": ProductTypeEnum.PAINTING,
             "productDomainDetails": {
                 "productTypeEnum": "PAINTING",
                 "alturaCm": 40,
                 "largoCm": 30,
                 "medium": "OIL_PAINT",
                 "supportMaterial": "COTTON_PAPER",
                 "creationDate": new Date("2026-05-04")
             },
             "isFavorite": true
         },
         {
             "id": 3,
             "name": "Obra muestra modal",
             "images": [
                 {
                     "id": 6,
                     "productName": "Obra muestra modal",
                     "url": "/public/assets/Images/imgObras/obra5.png"
                 },
                 {
                     "id": 5,
                     "productName": "Obra muestra modal",
                     "url": "/public/assets/Images/imgObras/obra4.png"
                 }
             ],
             "description": "Ya quiero ver el modal",
             "productStock": {
                 "isOriginalAvailable": true,
                 "stockCopies": 0,
                 "copiesMade": 0,
                 "stockType": "PAINTING_STOCK"
             },
             "productPricing": {
                 "pricePerOriginal": 50000,
                 "pricePerCopy": 5000,
                 "pricingType": "ORIGINAL"
             },
             "productTypeEnum": ProductTypeEnum.PAINTING,
             "productDomainDetails": {
                 "productTypeEnum": "PAINTING",
                 "alturaCm": 30,
                 "largoCm": 40,
                 "medium": "OIL_PAINT",
                 "supportMaterial": "COTTON_PAPER",
                 "creationDate": new Date("2026-05-04")
             }, "isFavorite": true,
         },
         {
             "id": 4,
             "name": "Obra con modal",
             "images": [
                 {
                     "id": 7,
                     "productName": "Obra con modal",
                     "url": "/public/assets/Images/imgObras/obra6.png"
                 },
                 {
                     "id": 8,
                     "productName": "Obra con modal",
                     "url": "/public/assets/Images/imgObras/obra8.png"
                 }
             ],
             "description": "ya va a jalar o que ",
             "productStock": {
                 "isOriginalAvailable": true,
                 "stockCopies": 0,
                 "copiesMade": 0,
                 "stockType": "PAINTING_STOCK"
             },
             "productPricing": {
                 "pricePerOriginal": 1000,
                 "pricePerCopy": 500,
                 "pricingType": "ORIGINAL"
             },
             "productTypeEnum": ProductTypeEnum.PAINTING,
             "productDomainDetails": {
                 "productTypeEnum": "PAINTING",
                 "alturaCm": 20,
                 "largoCm": 30,
                 "medium": "OIL_PAINT",
                 "supportMaterial": "COTTON_PAPER",
                 "creationDate": new Date("2026-05-04")
             }, "isFavorite": false
         }
     ]
 */


    useEffect(() => {
        setIsLoading(true);
        handleGetPagedProducts(sortBy, pageNumber, pageSize, sortOrder).then((products: Page<any>) => {
            console.log(JSON.stringify(products));
            const content = products.content;
            console.log("contenido del pageeeee" + JSON.stringify(content));

            // Mapear cada producto del backend al formato esperado
            const mappedProducts = content.map(mapBackendProductToFrontend);
            setReceivedProducts(mappedProducts);


            console.log("State piece data: " + JSON.stringify(mappedProducts))
            setIsLoading(false);
        }).
            catch((error) => {
                setIsLoading(false);
                setError(error);
                console.error(error)
            });

    }, [pageNumber, pageSize, sortBy, sortOrder]);




    const [showModal, setShowModal] = useState(false);

    let products: JSX.Element = <div>Inicio</div>

    if (isLoading) {
        products = <PaintingLoader />
        return products;
    } else if (error) {
        products = <div>ha ocurrido un error</div>
    }




    const renderedProducts = receivedProduct.map((product) => {
        return <ProductEditingPreview className={" hover:cursor-pointer"} key={product.id}
            onClick={() => {
                setSelectedProduct(product.id);
                setShowModal(true);
                console.log("Id del producto: " + product.id);
            }}
            product={product} />;

    })
    /*<div key={product.name} onClick={() => { handleProductSelectedForEditing(product.id) }}>
        <img src={product.images[0].url} alt={product.name} />
        <div className="">
            <h3>{product.name} </h3>
            <hr />
            <span> {product.description}</span>
            <StockTag productStock={product.productStock} />
            <DetailsTag productDetails={product.productDomainDetails} />
            <PriceTag productPricing={product.productPricing} />


            {product.isFavorite ? <span>Obra favorita</span> : ""}

        </div>
    </div>)

}*/
    const producEditingState: ProductEditingContextProp = {
        products: receivedProduct,
        setProducts: setReceivedProducts,
        pageNumber: pageNumber,
        setPageNumber,
        pageSize: pageSize,
        setPageSize: setPageSize,
        sortOrder: sortOrder,
        setSortOrder: setSortOrder,
        sortType: sortBy,
        setSortType: setSortBy,
        searchTerm,
        setSearchTerm,
        isLoading: isLoading,
        setIsLoading: setIsLoading,
        error: error,
        setError: setError,
        totalPages: totalPages,
        setTotalPages: setTotalPages,

    };

    products = <div className={"w-full flex flex-col relative "}>

        <ProductsEditingContext.Provider value={producEditingState}>
            <NavProduct />
        </ProductsEditingContext.Provider>


        Edit All component
        <div className=" grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
            {renderedProducts}
        </div>

        <Modal className="h-5/6 w-11/12 " isOpen={showModal} onClose={() => setShowModal(false)} >
            <div>
                <EditProductForm productId={selectedProduct ? selectedProduct : -1} />
            </div>
        </Modal>

    </div>

    return products;

}

export default EditAll;