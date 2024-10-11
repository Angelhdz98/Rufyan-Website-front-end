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


function EditAll(){


    const {data, isLoading, error} = useSelector((state:RootState)=> state.products);
      
    const [selectedProduct, setSelectedProduct] = useState<Product>();

        const [showModal, setShowModal] = useState(false);

        const products = data.map((product)=>{
            if (isPainting(product)) {
                return <EditablePainting 
                onClick={() =>{ 
                    setSelectedProduct(product);
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
    
    <Modal isOpen={showModal} onClose={()=> setShowModal(false) }> 
        <div> {<EditingProduct product={selectedProduct as Product} />}</div>
    </Modal>

</div>

}

export default EditAll;