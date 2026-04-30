import { Product } from "../types/typesIndex";
import ImageSwiper from "./ImageSwiper";
import ProductLabel from "./ProductLabel";

type ProductEditingPreviewProps ={
    product: Product;
    onClick: ()=>void;
}

function ProductEditingPreview(productEditingProps:ProductEditingPreviewProps){

    return <div>
        <ImageSwiper product={productEditingProps.product} title={productEditingProps.product.name+ " editable"} />
        <ProductLabel isVisible product={productEditingProps.product} className={""} onClick={productEditingProps.onClick}/>
    </div>
}

export default ProductEditingPreview;