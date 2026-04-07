import { useSelector } from "react-redux";
import NavProduct from "../../components/NavProduct";
import { RootState } from "../../store";
import { isPainting } from "../../hooks/isPainting";
import { Painting, Product } from "../../types/typesIndex";
import EditablePainting from "./EditablePainting";
import EditableProduct from "./EditableProduct";
import { Fragment, useState } from "react";
import Modal from "../../components/Modal";
import EditingPainting from "./EditingPainting";
import PaintingLoader from "../../components/PaintingLoader";


function EditAll(){


    const {data, isLoading, error} = useSelector((state:RootState)=> state.products);
    const [selectedProduct, setSelectedProduct] = useState<number>(-1);

        const [showModal, setShowModal] = useState(false);

        let products = <div>Inicio</div>

        if(isLoading){
            products = <PaintingLoader/>
        }else if (error){
          products=   <div>ha ocurrido un error</div>
        }


         products = <Fragment>
                     {data.map((product:Product)=>{
            if (isPainting(product)) {
                return <EditablePainting 
                onClick={() =>{ 
                    setSelectedProduct(product.id);
                    setShowModal(true);}}
                paint={product as Painting} 
                key={product.id}/>
            }    
            // Mas typeguards
            else{
                return <EditableProduct  product={product} />
            }
                    
            })}
            
         </Fragment>

         



        

return <div>
    <NavProduct/>
    Edit All component
    <div className="grid grid-cols-3 gap-4 p-2">
    {products}
    </div>
    
    <Modal  className="h-5/6 w-5/6"  isOpen={showModal} onClose={()=> setShowModal(false)  } > 
        <div> <EditingPainting paintingId={selectedProduct} /></div>
    </Modal>

</div>

}

export default EditAll;