import classNames from "classnames";
import SorterButton from "./SorterButton";
import { useContext } from "react";
import { ProductsEditingContext } from "../pages/ControlPanel/useEditProductsContext";
//import { useState } from "react";


interface SorterProps {
    className?: string;
    onChange?: (sortBy: SorterTypeEnum, pageNumber: number, order: SortOrderEnum) => void;

}

export enum SorterTypeEnum {
    CREATION_DATE = "creationDate",
    NAME = "name",
    PRICE = "price"

}
export enum SortOrderEnum {
    ASCENDING = "ascending",
    DESCENDING = "descending"

}


function Sorter(props: SorterProps) {

    const productsEditingContext = useContext(ProductsEditingContext);

    // const {sortBy /*, sortOrder*/} = useSelector((state: RootState)=>state.sortProducts);

    if (productsEditingContext == undefined) {
        throw new Error("sorter should use productEditingContext");
    }


    const changeSortingHandle = (sortingValue: string) => {

        console.log("sorting value: ", sortingValue, "sort type en conetext: ", productsEditingContext.sortType);

        if (sortingValue == productsEditingContext.sortType) {
            productsEditingContext.setSortOrder((prev) => {
                if (prev == SortOrderEnum.ASCENDING) {
                    return SortOrderEnum.DESCENDING;
                } else {
                    return SortOrderEnum.ASCENDING;
                }
            })
        } else {
            //dispatch(setSortBy(sortingValue));
            let sortType: SorterTypeEnum = SorterTypeEnum.CREATION_DATE;

            switch (sortingValue) {
                case SorterTypeEnum.CREATION_DATE:
                    {
                        sortType = SorterTypeEnum.CREATION_DATE;
                        break;
                    }
                case SorterTypeEnum.NAME: {
                    sortType = SorterTypeEnum.NAME;
                    break;
                }
                case SorterTypeEnum.PRICE: {
                    sortType = SorterTypeEnum.PRICE;
                }

            }
            productsEditingContext.setSortType(sortType);
            productsEditingContext.setSortOrder(SortOrderEnum.DESCENDING);


        }
        console.log("sortBy: " + productsEditingContext.sortType + " sorOrder: " + productsEditingContext.sortOrder);






    };

    const sortableValues = [
        { label: 'Fecha', value: SorterTypeEnum.CREATION_DATE },
        { label: 'Titulo', value: SorterTypeEnum.NAME },
        { label: 'Precio', value: SorterTypeEnum.PRICE }
    ];

    const renderedSorterButtons = sortableValues.map((valuesToSort) => {
        const sortByValue = valuesToSort.value;
        console.log("sorted by in sortByValue:", sortByValue, " sorted by in sortBy: ", productsEditingContext.sortType)
        const isSorted = sortByValue == productsEditingContext.sortType;
        return <SorterButton key={valuesToSort.value} isSorted={isSorted}
            sortBy={valuesToSort.value}
            onClick={() => changeSortingHandle(sortByValue)}
            sortOrder={productsEditingContext.sortOrder ? productsEditingContext.sortOrder : SortOrderEnum.DESCENDING}>
            {valuesToSort.label}
        </SorterButton>
    });

    return <div className={classNames(" ", props.className, {})}>
        <div className="flex flex-row w-full justify-between items-end mt-2   ">
            <span >Ordenar por:</span>
            {renderedSorterButtons}
        </div>
    </div>
}

export default Sorter;
