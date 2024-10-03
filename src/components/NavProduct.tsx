import CategorySelector from "./CategorySelector";
import SearchBar from "./SearchBar";
import Sorter from "./Sorter";


function NavProduct(){



    return <div className="flex flex-row gap-4 w-full items-start my-3 max-h-16 ">
        <CategorySelector/>
        
        <div className="flex flex-col gap-1 w-full px-12 ">
           <SearchBar className="w-full"/>
            <Sorter/>
        </div>
    </div>
}

export default NavProduct;