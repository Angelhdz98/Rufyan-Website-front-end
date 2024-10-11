import { Product } from "../../types/typesIndex"

interface EditableProductProps {
    product: Product;
}

function EditableProduct({product}:EditableProductProps) {



    return <div>Editable Product de: {product.name}
    
    </div>
}

export default EditableProduct