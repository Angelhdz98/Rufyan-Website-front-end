import React, { ReactNode, useState } from "react";
import { PaintingPricing, PricingTypeEnum, ProductPricing, SinglePricing } from "../../types/typesIndex"
import FormInput from "../../components/FormInput";

type ProductPricingFormProps = {
    pricingType: PricingTypeEnum
}

function ProductPricingForm({pricingType}:ProductPricingFormProps){
    
    const [singlePrice, setSinglePrice] = useState<SinglePricing>({price:500 , pricingType:"SINGLE_PRICE"});
    const singlePriceForm = ()=>{

        return <FormInput name="price"
         type="number"
          onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
            const value = e.target.value;
            setSinglePrice((prev)=>{
                const parsedValue = parseInt(value);
               return {...prev, ["price"]:isNaN(parsedValue)?  prev.price||0:parsedValue}
            });}}
            value={singlePrice.price.toString()}
           >Price</FormInput>

    }
    const [originalPrice, setOriginalPrice] = useState<PaintingPricing>({
        pricePerCopy:500,
        pricePerOriginal:500,
        pricingType:"ORIGINAL"
    });

    const originalPriceForm = () =>{
const originalPricFormHandler =  (e:React.ChangeEvent<HTMLInputElement>)=>{
                const {value, name} = e.target;
                const parsedValue = parseInt(value);
                 
                setOriginalPrice((prev)=>{
                    return {...prev, [name]: isNaN(parsedValue) ? prev[name as keyof PaintingPricing] : parsedValue}
                })

            }
        return <div>
            <FormInput name="pricePerOriginal"
            type="number"
            value={originalPrice.pricePerOriginal.toString()}
            onChange={originalPricFormHandler}
             >Price por la pieza Original</FormInput>
            <FormInput name="pricePerCopy"
            type="number"
            value={originalPrice.pricePerCopy.toString()}
            onChange={originalPricFormHandler}
            >
                Precio por copia seriada
            </FormInput>
        </div>

    }
    let stockForm:ReactNode;
    switch (pricingType){
        case PricingTypeEnum.ORIGINAL:
        stockForm = originalPriceForm();
        break; 
        case PricingTypeEnum.SINGLE:
        stockForm= singlePriceForm();    
        break;

    }

    return stockForm; 
    
}


export default ProductPricingForm;
