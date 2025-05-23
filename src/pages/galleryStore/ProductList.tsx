import { useEffect} from "react";
import { useParams } from "react-router-dom";
import { Painting, Product } from "../../types/typesIndex";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch,  RootState } from "../../store";
import PaintingPreview from "../../components/PaintingPreview";
import NavProduct from "../../components/NavProduct";
import { fetchSortedProduct } from "../../store/thunks/fetchSortedProducts";




function ProductList() {
    const {category} = useParams<{category?: string}>();
    //const [products, setProducts] = useState<Product[]>([]);
    const dispatch= useDispatch<AppDispatch>();
    const {data, isLoading, error}= useSelector((state: RootState)=>{return state.products
    })
    const {sortBy, sortOrder} = useSelector((state: RootState)=>state.sortProducts);
    useEffect(()=>{
        if (category){
        dispatch(fetchSortedProduct(category))
    }
    console.log("category: ",category, " order: ", sortOrder, " sortBy: ", sortBy);
    },[sortBy, sortOrder, category]);

    
    const products = data.map((product: Product)=>{
        if (category=="paintings") {
            return <PaintingPreview 
                    key={product.id} 
                    paint={product as Painting}/>
        }
        return <div>{product.name}</div>
     
    });
    
     
    if (isLoading) {
       return  <div>Loading. . . . </div>
    }
    if (error){
        return <div>Error: </div>;
        }
     
     

     return <div className="flex flex-col">
        <NavProduct/>
     <div>All  products from {category}</div>
     <div className="m-4 grid lg:grid-cols-5  gap-6 justify-center items-center" >{products}</div>
     </div>;
 ;
}

export default ProductList