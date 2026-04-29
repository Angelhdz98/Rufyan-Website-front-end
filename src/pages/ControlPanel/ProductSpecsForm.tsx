
import CheckFormInput from "../../components/CheckFormInput";
import FormInput from "../../components/FormInput";
import { ProductTypeEnum, PricingTypeEnum, ProductSpecs, ProductStock, ProductPricing, ProductDomainDetails } from "../../types/typesIndex";
import ProductDomainDetailsForm from "./ProductDomainDetailsForm";
import ProductPricingForm from "./ProductPricingForm";
import ProductStockForm from "./ProductStockForm";
import TypeSelector from "./TypeSelector";


export type ProductSpecsFormProps = {
    productSpecs: ProductSpecs,
    productTypeEnum: ProductTypeEnum;
    handleProductTypeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    toggleIsFavorite: () => void;
    handleStockChanging: (stock: ProductStock) => void;
    handleDetailsChange: (productDetails: ProductDomainDetails) => void;
    handlePriceChanging: (pricing: ProductPricing) => void;
   
}

function ProductSpecsForm(props: ProductSpecsFormProps) {


    return <div>
        <FormInput
            type={"text"} name="name"
            value={props.productSpecs.name} onChange={props.handleChange}
            className=" w-min "  >
            Name
        </FormInput>
        <FormInput
            type={"text"} name="description"
            value={props.productSpecs.description} onChange={props.handleChange}
            className=" w-min "  >
            Description
        </FormInput>

        <CheckFormInput
            type={"checkbox"} name="isFavorite"
            value={props.productSpecs.isFavorite ? "true" : "false"}
            onChange={props.toggleIsFavorite}
            className=" w-full " checked={props.productSpecs.isFavorite}   >
            Obra favorita
        </CheckFormInput>
        <TypeSelector productTypeEnum={props.productTypeEnum} handleProductchange={props.handleProductTypeChange} />


        <h2> Stock</h2>
        <ProductStockForm handleStockChange={props.handleStockChanging} productType={props.productTypeEnum} />

        <span>Details</span>
        <ProductDomainDetailsForm onDetailsChange={props.handleDetailsChange} productTypeEnum={props.productTypeEnum} />



        <span>Pricing</span>
        <ProductPricingForm pricingType={props.productTypeEnum === ProductTypeEnum.PAINTING ? PricingTypeEnum.ORIGINAL : PricingTypeEnum.SINGLE} onChangePrice={props.handlePriceChanging} />

    </div>

}


export default ProductSpecsForm;