import SearchBar from "./SearchBar";


function NavProduct(){



    return <div className="flex flex-row gap-4">
        <div>categorías</div>
        <div>
           <SearchBar/>
            <div>Sorter</div>
        </div>
    </div>
}

export default NavProduct;