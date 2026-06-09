import React, { ReactNode, useEffect, useState } from "react";
import FormInput from "../../components/FormInput";
import { PaintingPricing, PricingTypeEnum, ProductPricing, SinglePricing } from "../../types/typesIndex";

interface ProductPricingFormProps extends React.HTMLAttributes<HTMLDivElement> {
    pricing?: ProductPricing,
    pricingType: PricingTypeEnum;
    onChangePrice: (pricing: ProductPricing) => void;


}

function ProductPricingForm(props: ProductPricingFormProps) {
    const [currentPricing, setCurrentPricing] = useState<ProductPricing | undefined>(props.pricing);

    useEffect(() => {
        if (props.pricing) {
            setCurrentPricing(props.pricing);
        } else {
            // Inicializar con valores por defecto según el tipo de precio
            let defaultPricing: ProductPricing;

            if (props.pricingType === PricingTypeEnum.ORIGINAL) {
                defaultPricing = {
                    pricingType: "ORIGINAL",
                    pricePerCopy: 500,
                    pricePerOriginal: 1000
                } as PaintingPricing;
            } else {
                defaultPricing = {
                    pricingType: PricingTypeEnum.SIMPLE,
                    price: 5000
                } as SinglePricing;
            }

            setCurrentPricing(defaultPricing);
        }
    }, [props.pricing, props.pricingType]);



    const singlePriceForm = () => {
        const pricing: SinglePricing = (currentPricing && 'price' in currentPricing)
            ? currentPricing as SinglePricing
            : { pricingType: "SIMPLE", price: 5000 } as SinglePricing;

        const onChangeSinglePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            const parsedValue = parseInt(value);

            const updatedPricing = {
                ...pricing, ["price"]: isNaN(parsedValue) ? pricing.price : parsedValue
            } as SinglePricing;
            setCurrentPricing(updatedPricing);
            props.onChangePrice(updatedPricing);
        }

        return <FormInput name="price"
            type="number"
            onChange={onChangeSinglePrice}
            value={pricing.price.toString() || ""}
        >Price</FormInput>
    }
    /*    const singlePriceForm = () => {
            const pricing = currentPricing as SinglePricing || { pricingType: "SIMPLE", price: 5000 };
            return <FormInput name="price"
                type="number"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const value = e.target.value;
                    const parsedValue = parseInt(value);
                    if (currentPricing?.pricingType == PricingTypeEnum.SIMLE) {
                        const updatedPricing = {
                            ...currentPricing, ["price"]: isNaN(parsedValue) ? currentPricing.price || 0 : parsedValue
                        } as SinglePricing;
                        setCurrentPricing(updatedPricing);
                        props.onChangePrice(updatedPricing);
                    }
                }}
                value={pricing.price?.toString() || ""}
    
            >Price</FormInput>
        }
    */
    /*
        const originalPriceForm = () => {
            const pricing = currentPricing as PaintingPricing || { pricePerCopy: 1000, pricePerOriginal: 5000, pricingType: "ORIGINAL" };
            const originalPricFormHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    
                if (currentPricing && currentPricing.pricingType == PricingTypeEnum.ORIGINAL) {
                    const { value, name } = e.target;
                    const parsedValue = parseInt(value);
    
                    const updatedPricing =
                        { ...currentPricing, [name]: isNaN(parsedValue) ? currentPricing[name as keyof PaintingPricing] : parsedValue } as PaintingPricing;
    
                    setCurrentPricing(updatedPricing);
                    props.onChangePrice(updatedPricing);
                }
            }
            return <div>
                <FormInput name="pricePerOriginal"
                    type="number"
                    value={pricing.pricePerOriginal?.toString() || ""}
                    onChange={originalPricFormHandler}
                >Price por la pieza Original</FormInput>
                <FormInput name="pricePerCopy"
                    type="number"
                    value={pricing.pricePerCopy?.toString() || ""}
                    onChange={originalPricFormHandler}
                >
                    Precio por copia seriada
                </FormInput>
            </div>
    
        }
        */
    const originalPriceForm = () => {
        const pricing: PaintingPricing = (currentPricing && 'pricePerOriginal' in currentPricing)
            ? currentPricing as PaintingPricing
            : { pricePerCopy: 1000, pricePerOriginal: 5000, pricingType: "ORIGINAL" };

        const originalPricFormHandler = (e: React.ChangeEvent<HTMLInputElement>) => {

            if (pricing && pricing.pricingType == PricingTypeEnum.ORIGINAL) {
                const { value, name } = e.target;
                const parsedValue = parseInt(value);

                const updatedPricing =
                    { ...pricing, [name]: isNaN(parsedValue) ? pricing[name as keyof PaintingPricing] : parsedValue } as PaintingPricing;

                setCurrentPricing(updatedPricing);
                props.onChangePrice(updatedPricing);
            }
        }
        return <div>
            <FormInput name="pricePerOriginal"
                type="number"
                value={pricing.pricePerOriginal?.toString() || ""}
                onChange={originalPricFormHandler}
            >Price por la pieza Original</FormInput>
            <FormInput name="pricePerCopy"
                type="number"
                value={pricing.pricePerCopy?.toString() || ""}
                onChange={originalPricFormHandler}
            >
                Precio por copia seriada
            </FormInput>
        </div>
    }
    let stockForm: ReactNode;
    switch (props.pricingType) {
        case PricingTypeEnum.ORIGINAL:
            stockForm = originalPriceForm();
            //onChangePrice(originalPrice);
            break;
        case PricingTypeEnum.SIMPLE:
            stockForm = singlePriceForm();
            //onChangePrice(singlePrice);
            break;

    }

    return <div className={`w-fit space-y-3 ${props.className}`}>{stockForm}</div>;

}


export default ProductPricingForm;
