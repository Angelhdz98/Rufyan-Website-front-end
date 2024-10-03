

import { useSelector } from "react-redux";
import Button from "./Button"
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { RootState } from "../store";

interface SorterButtonProps {
    children: string;
    sortBy: string;
    onClick: () => void;
    isSorted: boolean;
};

function SorterButton(props: SorterButtonProps) {

    const { sortOrder } = useSelector((state: RootState) => state.sortProducts)
    return <Button onClick={props.onClick} rounded sorter className="flex flex-row gap-3 max-h-8 px-2 py-0 ">
        {props.children}
        <div className="flex flex-col text-[#E88769]">
            {
                (props.isSorted && sortOrder == 'desc') ?
                    <FaArrowUp className="text-xs opacity-0 " /> :
                    <FaArrowUp className="text-xs opacity-100 " />
            }
            {
                (props.isSorted && sortOrder == 'asc') ?
                    <FaArrowDown className="text-xs opacity-0" /> :
                    <FaArrowDown className="text-xs opacity-100" />
            }
        </div>
    </Button>
}

export default SorterButton