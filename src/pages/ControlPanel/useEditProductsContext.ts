import { createContext } from "react";
import { Product } from "../../types/typesIndex";
import { SorterTypeEnum, SortOrderEnum } from "../../components/Sorter";


export interface ProductEditingContextProp {
    products?: Product[],
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>,
    pageNumber?: number,
    setPageNumber: React.Dispatch<React.SetStateAction<number>>,
    pageSize?: number,
    setPageSize: React.Dispatch<React.SetStateAction<number>>,
    totalPages: number,
    setTotalPages: React.Dispatch<React.SetStateAction<number>>,
    sortOrder?: SortOrderEnum,
    setSortOrder: React.Dispatch<React.SetStateAction<SortOrderEnum>>,
    sortType?: SorterTypeEnum,
    setSortType: React.Dispatch<React.SetStateAction<SorterTypeEnum>>,
    searchTerm?: string,
    setSearchTerm: React.Dispatch<React.SetStateAction<string | undefined>>,
    //charging Flag
    isLoading?: boolean,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    error?: string,
    setError: React.Dispatch<React.SetStateAction<string | undefined>>




}

export const ProductsEditingContext = createContext<ProductEditingContextProp | undefined>(undefined);



