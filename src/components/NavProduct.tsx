import SearchBar from "./SearchBar";
import Sorter from "./Sorter";


function NavProduct(){



    return <div className="flex flex-row gap-4 w-full">
        <div>categorías</div>
        <div className="w-full">
           <SearchBar className="w-1/2"/>
            <Sorter/>
        </div>
    </div>
}

export default NavProduct;