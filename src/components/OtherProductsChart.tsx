import { useSelector } from "react-redux";
import { RootState } from "../store";
//import ImgSlider from "./ImgSlider";
import ProductLabel from "./ProductLabel";
import Button from "./Button";
function OtherProductsChart() {

    const products = useSelector((state: RootState) => state.otherProducts.data)
    const renderendProducts = products.map((product) => {
        return <div key={product.name} className="h-[250px] rounded-lg overflow-hidden drop-shadow-lg">
            <div className="h-[55%] w-full ">
                <img className="h-full w-full " src={product.image[0].url} alt="" />
            </div>
            
            <ProductLabel className="h-[45%] mb-0" product={product} />
        </div>
    })

    return <div>
        <div className="grid grid-cols-1 min-[490px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6  gap-5 mt-4 mb-3">
            {renderendProducts} 
    </div>
    <div className="w-full flex flex-row  justify-between">
        {products.map((product)=>{
            return <Button key={product.name} primary rounded>{product.category}</Button>
        })}
    </div>
    </div>
     
}

<div >
        
    </div>
export default OtherProductsChart;