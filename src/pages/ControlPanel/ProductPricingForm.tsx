import React, { ReactNode, useState } from "react";
import FormInput from "../../components/FormInput";
import { PaintingPricing, PricingTypeEnum, ProductPricing, SinglePricing } from "../../types/typesIndex";

interface ProductPricingFormProps extends React.HTMLAttributes<HTMLDivElement> {
    pricingType: PricingTypeEnum;
    onChangePrice: (pricing: ProductPricing) => void;
}

function ProductPricingForm(props: ProductPricingFormProps) {

    const [singlePrice, setSinglePrice] = useState<SinglePricing>({ price: 500, pricingType: "SIMPLE" });


    const singlePriceForm = () => {

        return <FormInput name="price"
            type="number"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const value = e.target.value;
                const parsedValue = parseInt(value);
                const updatedPricing = {

                    ...singlePrice, ["price"]: isNaN(parsedValue) ? singlePrice.price || 0 : parsedValue
                }

                setSinglePrice(updatedPricing);
                props.onChangePrice(updatedPricing);
            }}
            value={singlePrice.price.toString()}
        >Price</FormInput>

    }
    const [originalPrice, setOriginalPrice] = useState<PaintingPricing>({
        pricePerCopy: 500,
        pricePerOriginal: 500,
        pricingType: "ORIGINAL"
    });

    const originalPriceForm = () => {
        const originalPricFormHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { value, name } = e.target;
            const parsedValue = parseInt(value);

            const updatePricing =
                { ...originalPrice, [name]: isNaN(parsedValue) ? originalPrice[name as keyof PaintingPricing] : parsedValue }

            setOriginalPrice(updatePricing)

            props.onChangePrice(updatePricing);


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
    let stockForm: ReactNode;
    switch (props.pricingType) {
        case PricingTypeEnum.ORIGINAL:
            stockForm = originalPriceForm();
            //onChangePrice(originalPrice);
            break;
        case PricingTypeEnum.SINGLE:
            stockForm = singlePriceForm();
            //onChangePrice(singlePrice);
            break;

    }

    return <div className={`w-fit space-y-3 ${props.className}`}>{stockForm}</div>;

}


export default ProductPricingForm;
