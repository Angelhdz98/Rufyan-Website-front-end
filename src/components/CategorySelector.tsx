import axios from "axios";
import classNames from "classnames";
import { Fragment, useEffect, useState } from "react";
import { IoIosArrowDropleft } from "react-icons/io";
import { useParams } from "react-router-dom";

export interface productCategoryInterface {
    id: number;
    name: string;
}

function CategorySelector() {
    const [isSelected, setIsSelected] = useState(false);
    const [categoriesAvailable , setCategoriesAvailable ] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    //const [error, setError] = useState(null);
    const {category} = useParams<{category?: string}>();
    
    const categoriesClickHandler = () => {
        setIsSelected(!isSelected);
    }
    const renderedCategories = categoriesAvailable.map(
        (singleCategory)=>
    {
        return <li key={singleCategory} className="list-none cursor-pointer" >{singleCategory}</li>
    })
    useEffect(()=>{
        const fetchCategories= async () =>{
            try{
                const response = await 
                axios.get(`http://localhost:8080/products-category`);
                const data = response.data.map((category:productCategoryInterface)=>{
                    return category.name;
                })
                setCategoriesAvailable(data);
            }catch(error){
                //setError(error);
            }
            finally{
                setLoading(false);
                console.log(categoriesAvailable);
            }
        };
        fetchCategories();

    },[])

    return <div onClick={categoriesClickHandler}
        className=
        {
            classNames("bg-gray-500 rounded-lg h-fit flex flex-col   mx-2 z-10 px-1 pl-2 transition-all duration-300 ease-in-out overflow-hidden w-fit ",{"max-h-6": !isSelected,
              "max-h-40 overflow-scroll":isSelected  
            })
        }>
        <div className="flex w-full flex-row items-center gap-4  cursor-pointer justify-between ">
            <span className=" font-semibold">Categorías</span>
            <IoIosArrowDropleft className={classNames("text-xl font-bold stroke-current stroke-2 trasition-transform duration-300 ", {
                "transform -rotate-90": isSelected,
            })} />
        </div>
           <div className="flex flex-col px-2 gap-1">{renderedCategories}</div> 
    </div>

}

export default CategorySelector;