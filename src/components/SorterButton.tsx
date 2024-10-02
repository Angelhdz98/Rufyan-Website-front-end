

import Button from "./Button"
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

interface SorterButtonProps{
    children:string;
    sortBy: string;
    onClick: ()=>void
};

function SorterButton(props:SorterButtonProps){


    return <Button onClick={props.onClick} rounded sorter className="max-h-8"> 
    {props.children}
    <div className="flex flex-col text-[#E88769]"> 
    <FaArrowUp  className="text-xs " /> 
    <FaArrowDown  className="text-xs" />
    </div>
</Button>
}

export default SorterButton