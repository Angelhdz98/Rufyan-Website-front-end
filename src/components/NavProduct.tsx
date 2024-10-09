import CategorySelector from "./CategorySelector";
import SearchBar from "./SearchBar";
import Sorter from "./Sorter";


function NavProduct(){



    return <div className="flex flex-col gap-4 w-full items-start my-3 h-fit ">
        <div className=" flex flex-row max-h-7 w-full">
        <CategorySelector/>
        <SearchBar className="md:w-4/5 lg:w-9/10 h-6"/>
        </div>
        

        <div className="flex flex-col gap-1 w-full px-12 ">
           
            <Sorter/>
        </div>
    </div>
}

export default NavProduct;