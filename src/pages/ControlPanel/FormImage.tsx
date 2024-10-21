import { HTMLAttributes } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { ImageProduct } from "../../types/typesIndex";


export interface FormImageProps extends HTMLAttributes<HTMLDivElement>{
img: ImageProduct;

}

function FormImage({img, ...rest}:FormImageProps){

    return <div className={"relative border border-black rounded-lg overflow-hidden "+ rest.className } >
            <img className="h-full w-full object-cover" src={img.url} alt="" />
            <div 
            className="flex h-full w-full opacity-0 hover:opacity-85 absolute left-0 top-0 bg-slate-300 place-content-center items-center "
            onClick={rest.onClick}>
            <FaTrashAlt className="text-3xl"  />
              </div>
            </div>
}

export default FormImage;