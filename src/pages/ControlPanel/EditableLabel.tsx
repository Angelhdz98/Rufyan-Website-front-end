import { IoIosCheckmarkCircle } from "react-icons/io";
import { isPainting } from "../../hooks/isPainting";
import { Painting, Product } from "../../types/typesIndex";
import { CiNoWaitingSign } from "react-icons/ci";


export interface EditableLabel extends React.HTMLAttributes<HTMLDivElement> {
    product: Product
}

function EditableLabel({ product, ...rest }: EditableLabel) {

  /*  if(isPainting(product)){
        const paint = product as Painting;
        return <div
        className="flex flex-col gap-2  p-2">
        <div >
            <span className="font-bold">
                {product.name}
            </span>
        </div>
        <div>
            <span className="font-bold">
                {product.category.name}
            </span>
        </div>

    </div>
    }
*/

    return <div
        className={"flex flex-col  px-2 border-x-2  "+ rest.className}>
        <div >
            <span className="font-bold">
                {product.name}
            </span>
        </div>
        <div className="flex flex-row items-center">
            
            <div className="flex flex-row gap-2 px-1 items-center">
            
            <span className="font-semibold">
                Favorite:
            </span>
            
            {
            product.favorite ? 
            <IoIosCheckmarkCircle 
            className="text-green-500 "/> : 
            <CiNoWaitingSign 
            className="text-red-500 stroke-2 " />}

            </div>
                        <div className="flex flex-row items-center gap-2 p-1">
                <span className="font-semibold" >Available: </span>
                {product.available ? <IoIosCheckmarkCircle className="text-green-500 "/>: <CiNoWaitingSign className="text-red-500 stroke-2 " />}
            </div>
        </div>

        <div className="flex flex-row gap-2 px-1">
        <span className="font-semibold" >Category: </span>
        {product.category.name}
        </div>

        <div className=" px-1 " >
            <span className="font-semibold ">Description: </span> 
            {product.description}
            </div>

    </div>
}

export default EditableLabel;