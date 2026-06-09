
import CheckFormInput from "../../components/CheckFormInput";
import FormInput from "../../components/FormInput";
import { ProductTypeEnum, PricingTypeEnum, ProductSpecs, ProductStock, ProductPricing, ProductDomainDetails } from "../../types/typesIndex";
import ProductDomainDetailsForm from "./ProductDomainDetailsForm";
import ProductPricingForm from "./ProductPricingForm";
import ProductStockForm from "./ProductStockForm";
import TypeSelector from "./TypeSelector";
import React from "react";


export interface ProductSpecsFormProps extends React.HTMLAttributes<HTMLDivElement> {
    productDetails?: ProductDomainDetails;
    productSpecs: ProductSpecs;
    productTypeEnum: ProductTypeEnum;
    handleProductTypeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    toggleIsFavorite: () => void;
    handleStockChanging: (stock: ProductStock) => void;
    handleDetailsChange: (productDetails: ProductDomainDetails) => void;
    handlePriceChanging: (pricing: ProductPricing) => void;
    firstBlockClassName?: string;
    secondBlockClassName?: string;
    thirdBlockClassName?: string;


}

function ProductSpecsForm(props: ProductSpecsFormProps) {


    return <div className={`w-full space-y-6 p-4 md:p-6 ${props.className}`}>
        {/* Nombre y Descripción */}
        <div className={"flex flex-col md:flex-row gap-3 p-3 " + props.firstBlockClassName}>
            <FormInput
                type={"text"} name="name"
                value={props.productSpecs.name} onChange={props.handleChange}
                className="w-full " >
                Name
            </FormInput>
            <FormInput
                type={"text"} name="description"
                value={props.productSpecs.description} onChange={props.handleChange}
                className="w-full " >
                Descripción
            </FormInput>
        </div>

        {/* Tipo de Producto, Favorito, Pricing y Stock */}
        <div className={"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full " + props.secondBlockClassName} >
            <div className="sm:col-span-1">
                <TypeSelector productTypeEnum={props.productTypeEnum} handleProductchange={props.handleProductTypeChange} />
            </div>
            <div className="sm:col-span-1">
                <CheckFormInput
                    type={"checkbox"} name="isFavorite"
                    value={props.productSpecs.isFavorite ? "true" : "false"}
                    onChange={props.toggleIsFavorite}
                    className="flex flex-col" checked={props.productSpecs.isFavorite} >
                    Producto favorito
                </CheckFormInput>
            </div>
            <div className="grid grid-cols-2  ">
                <div className="sm:col-span-1 w-fit">
                    <span className="block text-sm font-medium mb-2">Pricing</span>
                    <ProductPricingForm pricingType={props.productTypeEnum === ProductTypeEnum.PAINTING ? PricingTypeEnum.ORIGINAL : PricingTypeEnum.SIMPLE} onChangePrice={props.handlePriceChanging}

                        className=""
                        pricing={props.productSpecs.productPricing}
                    />
                </div>
                <div className="sm:col-span-1 w-fit">
                    <h3 className="text-sm font-medium mb-2">Stock</h3>
                    <ProductStockForm handleStockChange={props.handleStockChanging} productType={props.productTypeEnum}
                        stock={props.productSpecs.productStock} />
                </div>
            </div>
        </div>

        {/* Detalles del Producto */}
        <div className={"space-y-1 "}>
            <h3 className="text-lg font-semibold">Detalles del Producto</h3>
            <ProductDomainDetailsForm onDetailsChange={props.handleDetailsChange} productTypeEnum={props.productTypeEnum} productDetails={props.productDetails} />
        </div>
    </div>

}


export default ProductSpecsForm;