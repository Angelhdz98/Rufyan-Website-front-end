
import classNames from "classnames";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
    className:string;
}

function SearchBar({className}:SearchBarProps){
    
    
   return  <div className={classNames("flex flex-row rounded-lg bg-white drop-shadow-lg mx-4 px-6 gap-14 justify-between ", className)}>
    Barra de busqueda
    <FaSearch />
    </div>    
}

export default SearchBar;
