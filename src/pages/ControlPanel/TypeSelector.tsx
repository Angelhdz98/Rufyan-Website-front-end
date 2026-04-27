import { ProductTypeEnum } from "../../types/typesIndex";

export type typeSelectorProps = {
    productTypeEnum: ProductTypeEnum;
    handleProductchange: (event: React.ChangeEvent<HTMLSelectElement>) => void;}

 function TypeSelector({ productTypeEnum, handleProductchange }: typeSelectorProps)  {
        return (
            <div className="flex flex-col w-fit">
                <label htmlFor="productType" className="mb-2 font-medium">
                    Product Type
                </label>
                <select
                    id="productType"
                    value={productTypeEnum.toString()}
                    onChange={handleProductchange}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value={ProductTypeEnum.PAINTING}>Painting</option>
                    <option value={ProductTypeEnum.CLOTHING}>Body Clothing</option>
                    <option value={ProductTypeEnum.SINGLE}>Single</option>
                </select>
            </div>
        );
    }

    export default TypeSelector;