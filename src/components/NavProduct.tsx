import { useContext } from "react";
import { ProductsEditingContext } from "../pages/ControlPanel/useEditProductsContext";
import CategorySelector from "./CategorySelector";
import SearchBar from "./SearchBar";
import Sorter, { SorterTypeEnum, SortOrderEnum } from "./Sorter";
import { handleGetPagedProducts } from "./ProductRequests";
import { Page } from "../types/typesIndex";
import mapBackendProductToFrontend from "../pages/ControlPanel/ProductBackendMapper";
import PageSelector from "./PageSelector";


function NavProduct() {

    const productsContext = useContext(ProductsEditingContext);

    const sortChange = (sortBy: SorterTypeEnum, pageNumber: number, order: SortOrderEnum) => {

        const response = handleGetPagedProducts(
            productsContext?.sortType ? productsContext?.sortType : SorterTypeEnum.CREATION_DATE,
            productsContext?.pageNumber ? productsContext?.pageNumber : 0,
            productsContext?.pageSize ? productsContext?.pageSize : 12,
            productsContext?.sortOrder ? productsContext?.sortOrder : SortOrderEnum.DESCENDING).then((products: Page<any>) => {

                const mappedProducts = products.content.map(mapBackendProductToFrontend);
                productsContext?.setProducts(mappedProducts);
            });

    };


    return <div className="flex flex-col gap-4 w-full items-start my-3 h-fit  ">

        <div className=" flex flex-row max-h-7 w-full">

            <CategorySelector />
            <SearchBar className="md:w-4/5 lg:w-9/10 h-6" />
        </div>


        <div className="flex flex-col gap-1 w-full px-12 ">
            <div className="flex flex-row gap-8">
                <PageSelector /> <Sorter onChange={sortChange} />
            </div>

        </div>
    </div>
}

export default NavProduct;