import { useParams } from "react-router-dom";
import ImageSwiper from "../../components/ImageSwiper";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { fetchProductById, RequestParams } from "../../store/thunks/fetchProductById";
import { useSelector } from "react-redux";

   
 
function ProductPage(){
    const{category, id} = useParams<{category?: string, id?:string}>();
    const dispatch = useDispatch<AppDispatch>();
    const {data, isLoading, error} = useSelector((state:RootState) =>state.singleProduct);

    
   
     
    
    useEffect(()=>{

        if(category && id ){
            const request: RequestParams= {category: category, id: Number(id)};
       dispatch(fetchProductById(request));
       console.log("se hace el fetch category: ", category, " id: ", id );
        }
        
    },[category, id, dispatch]);

    if(isLoading){
        return <div>Is loading. . . </div>
    }
    
    
        return <div className="main-body w-full flex flex-row  gap-4 p-2 h-dvh">
        <div className="first-column bg-cyan-500 w-4/12 h-full">
           { 
           
           <ImageSwiper image={data[0].image } title="" />

}        </div>
        <div className="second-column  bg-slate-500 w-8/12">
        columna 2 
        </div>
    </div>
    
    

}

export default ProductPage;