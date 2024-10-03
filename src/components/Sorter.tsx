import classNames from "classnames";

import SorterButton from "./SorterButton";
import { useDispatch } from "react-redux";
import { AppDispatch, beginSorting, RootState, setSortBy, toggleSortOrder } from "../store";
import { useSelector } from "react-redux";


interface SorterProps {
    className?: string;

}



function Sorter(props: SorterProps) {
    const dispatch = useDispatch<AppDispatch>();
    const {sortBy, sortOrder} = useSelector((state: RootState)=>state.sortProducts);
    const changeSortingHandle = (sortingValue:string) =>{
        
        if(sortingValue==sortBy){
            dispatch(toggleSortOrder());
        } else {
            dispatch(setSortBy(sortingValue));
            dispatch(beginSorting());
        }
        //console.log("sortBy: "+ sortBy +" sorOrder: "+ sortOrder);
        
    };

    const sortableValues= ['Fecha', 'Titulo', 'Precio'];

    const renderedSorterButtons= sortableValues.map((value)=>{
        const sortByValue= value.toLowerCase();
        const isSorted= sortByValue== sortBy;
        return <SorterButton  key={value} isSorted={isSorted}
        sortBy={sortByValue} 
        
        onClick={()=>changeSortingHandle(sortByValue)} >
            {value}
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
