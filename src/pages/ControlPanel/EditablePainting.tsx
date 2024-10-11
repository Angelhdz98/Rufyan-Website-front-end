import { FaEdit } from "react-icons/fa";
import PaintingPreview from "../../components/PaintingPreview";
import { Painting } from "../../types/typesIndex";
import EditableLabel from "./EditableLabel";
import { HTMLAttributes, useState } from "react";
import classNames from "classnames";

interface EditablePaintingProps extends HTMLAttributes<HTMLDivElement> {
    paint: Painting

}



function EditablePainting({paint, ...rest}:EditablePaintingProps) {

    const [hovered, setHovered] = useState(false);

    return  <div onClick={rest.onClick}
    className="flex flex-col border-t-2 border-2 border-black rounded-xl overflow-hidden relative "
    onMouseEnter={()=>{
        setHovered(true)}}
    onMouseLeave={()=> {
        setHovered(false)}}>

        <div className="h-[90%] border-b-2 border-black  ">
            
    <img src={paint.image[0].url} 
    alt={paint.name+ " editable"}
     className="object-cover h-full w-full"  />      
</div>

<div>
    <EditableLabel product={paint} className=" "/>
</div>
<div className={ classNames(" absolute opacity-70 bg-red-800 h-full w-full flex justify-center items-center  ",
    {"flex":hovered,
        "hidden": ! hovered,
     }) }>
<FaEdit className=" scale-[5.0] pl-1" />
</div>
</div>
}

export default EditablePainting; 