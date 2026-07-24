import { createContext } from "react";
import {  ProductDTO } from "../../types/typesIndex";

export interface ProductContextProp{
    products: ProductDTO[];
    setProducts: React.Dispatch<React.SetStateAction<ProductDTO[]>>
    selectedProductId: number|null;
    setSelectedProductId: React.Dispatch<React.SetStateAction<number>>; 
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
    error: string|null;
    setError: React.Dispatch<React.SetStateAction<string|null>>
}

export const ProductContext = createContext<ProductContextProp|null >(null); 

