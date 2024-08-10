import classNames from "classnames";
import { ReactNode } from "react";
import { IoIosArrowDropleft } from "react-icons/io";

export interface ExpandablePanelProps  {
    id:number;
    title: string;
    children?: ReactNode;
    className?: string;
    expanded: boolean;
    
    onClick: () => void;

}


function ExpandablePanel({title, children, expanded, className, onClick}:ExpandablePanelProps){
/**const renderedChildrens = () =>{
if(children && expanded){
    return <div>Aqui va el children</div>;
}
else{
    return;
}
}
*/
const finalClassname= classNames("flex flex-col w-[95%] m-auto rounded-2xl bg-slate-100 drop-shadow-lg my-4", className, {});

return <div className={finalClassname} onClick={onClick}> 
<div className="flex flex-row items-center w-full  justify-between   py-1 px-2  rounded-2xl  cursor-pointer ">
    <span className="text-lg font-semibold">
        {title}
    </span>

    <IoIosArrowDropleft className={classNames("text-3xl trasition-transform duration-300 ", {
        "transform -rotate-90": expanded,
    })} />
     
     </div>
      { expanded && <div > <hr className="border-t-2 border-black" />
      <div className="px-4">
        Aqui va el children 
        </div>
        </div>}
      </div>
   
}

export default ExpandablePanel;