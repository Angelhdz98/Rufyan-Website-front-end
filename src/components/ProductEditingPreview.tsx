
import { Product } from "../types/typesIndex";
import ImageSwiper from "./ImageSwiper";
import ProductLabel from "./ProductLabel";

interface ProductEditingPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
    product: Product;
    producLabelClassname?: string;
}

function ProductEditingPreview(productEditingProps: ProductEditingPreviewProps) {

    return <div onClick={productEditingProps.onClick} className={"border-2 rounded-lg p-4 flex flex-col gap-2  " + productEditingProps.className}>
        <ImageSwiper product={productEditingProps.product} title={productEditingProps.product.name + " editable"} />
        <ProductLabel isVisible product={productEditingProps.product} className={productEditingProps.producLabelClassname} isButtonsHidden />
    </div>
}

export default ProductEditingPreview;