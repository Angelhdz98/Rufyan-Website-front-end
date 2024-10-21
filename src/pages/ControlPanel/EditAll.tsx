import { useSelector } from "react-redux";
import NavProduct from "../../components/NavProduct";
import { RootState } from "../../store";
import { isPainting } from "../../hooks/isPainting";
import { Painting, Product } from "../../types/typesIndex";
import EditablePainting from "./EditablePainting";
import EditableProduct from "./EditableProduct";
import { useState } from "react";
import Modal from "../../components/Modal";
import EditingProduct from "./EditingProduct";
import EditingPainting from "./EditingPainting";


function EditAll(){


    const {data, isLoading, error} = useSelector((state:RootState)=> state.products);
    const [selectedProduct, setSelectedProduct] = useState<number>(-1);

        const [showModal, setShowModal] = useState(false);

        const products = data.map((product)=>{
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
                return <EditableProduct  product={product} key={product.id}/>
            }
                    
            })
         



        

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