import NavProduct from "../../components/NavProduct";
import { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import PaintingLoader from "../../components/PaintingLoader";
import EditProductForm from "./EditProductForm";
import { Product } from "../../types/typesIndex";
import { useProductForm } from "./useProducForm";


function EditAll() {

    const  [isLoading, setIsLoading ] = useState(false);
    const  [error, setError]  = useState<string | null>(null);
    const  [data, setData]  = useState<Product[]>([]);
   
    const  [pageNumber/*, setPageNumber*/]  = useState(0);
    const  [pageSize/*, setPageSize*/]  = useState(10);
    const [selectedProduct, setSelectedProduct] = useState<number>(-1);
    const  {handleGetPagedProducts}  = useProductForm();

    useEffect(() => {
        setIsLoading(true);
        handleGetPagedProducts(pageNumber, pageSize).then((products: Product[]) => {
            setData(products);
            setIsLoading(false);
        }).
            catch((error) => {
                setIsLoading(false);
                setError(error);
                console.error(error) });


    } ,[pageNumber,pageSize]);
    
    
    
    
    const [showModal, setShowModal] = useState(false);
    
    
    let products:JSX.Element = <div>Inicio</div>

    if (isLoading) {
        products = <PaintingLoader />
    } else if (error) {
        products = <div>ha ocurrido un error</div>
    }

        const handleProductSelectedForEditing= (id:number)=>{
        setSelectedProduct(id);
        
    }


  const renderedProducts = data.map((product )=>{
    
    return (<div key={product.name} onClick={() =>{handleProductSelectedForEditing(product.id)}}>
            <img src={product.images[0].url} alt={product.name} />
            <div >
            <h3>{product.name} </h3> 
            <hr />
            <span> {product.description}</span>
            {product.isFavorite?<span>Obra favorita</span>:""}
            
            </div>
        </div>)
   
});
products =<div>
        <NavProduct />
        Edit All component
        <div className="grid grid-cols-3 gap-4 p-2">
            {renderedProducts}
        </div>

        <Modal className="h-5/6 w-5/6" isOpen={showModal} onClose={() => setShowModal(false)} >
            <div> {/*<EditingPainting paintingId={selectedProduct} />*/}
                <EditProductForm productId={selectedProduct}  />
            </div>
        </Modal>

    </div>

    return products;

}

export default EditAll;