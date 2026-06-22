import Button from "./Button"
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { SortOrderEnum } from "./Sorter";

interface SorterButtonProps {
    children: string;
    onClick: () => void;
    isSorted: boolean;
    sortOrder: SortOrderEnum;

};

function SorterButton(props: SorterButtonProps) {

    //const { sortOrder } = useSelector((state: RootState) => state.sortProducts)
    return <Button onClick={props.onClick} rounded sorter className="flex flex-row gap-3 max-h-8 px-2 py-0 ">
        {props.children}
        <div className="flex flex-col text-[#E88769]">
            {
                (props.isSorted && props.sortOrder == SortOrderEnum.DESCENDING) ?
                    <FaArrowUp className="text-xs opacity-0 " /> :
                    <FaArrowUp className="text-xs opacity-100 " />
            }
            {
                (props.isSorted && props.sortOrder == SortOrderEnum.ASCENDING) ?
                    <FaArrowDown className="text-xs opacity-0" /> :
                    <FaArrowDown className="text-xs opacity-100" />
            }
        </div>
    </Button>
}

export default SorterButton