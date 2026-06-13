import { ProductTypeEnum } from "../../types/typesIndex";

export interface TypeSelectorProps extends React.HTMLAttributes<HTMLDivElement> {
    productTypeEnum: ProductTypeEnum;
    handleProductchange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

function TypeSelector(props: TypeSelectorProps) {
    return (
        <div className={`flex flex-col w-full ${props.className}`}>
            <label htmlFor="productType" className="mb-2 font-medium text-sm">
                Tipo de producto
            </label>
            <select
                id="productType"
                value={props.productTypeEnum.toString()}
                onChange={props.handleProductchange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
                <option value={ProductTypeEnum.PAINTING}>Painting</option>
                <option value={ProductTypeEnum.CLOTHING}>Body Clothing</option>
                <option value={ProductTypeEnum.SINGLE}>Single</option>
            </select>
        </div>
    );
}

export default TypeSelector;