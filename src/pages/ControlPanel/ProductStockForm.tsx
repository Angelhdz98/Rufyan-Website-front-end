import React, { useState } from "react";
import FormInput from "../../components/FormInput";
import { BodyClothingSizeEnum, ClothingStock, PaintingStock, ProductTypeEnum } from "../../types/typesIndex";
import CheckFormInput from "../../components/CheckFormInput";

type ProductStockFormProps = {
    productType: ProductTypeEnum
}

function ProductStockForm({ productType }: ProductStockFormProps) {
    const initialStockPerSize = new Map<BodyClothingSizeEnum, number>();
    initialStockPerSize.set(BodyClothingSizeEnum.XS, 0);
    initialStockPerSize.set(BodyClothingSizeEnum.S, 0);
    initialStockPerSize.set(BodyClothingSizeEnum.M, 0);
    initialStockPerSize.set(BodyClothingSizeEnum.L, 0);
    initialStockPerSize.set(BodyClothingSizeEnum.XL, 0);

    const [paintingStockData, setPaintingStockData] = useState<PaintingStock>({
        isOriginalAvailable: true,
        stockCopies: 1,
        copiesMade: 1,
        stockType: "ORIGINAL_STOCK"
    });

    const [bodyClothingStock, setBodyClothingStock] = useState<ClothingStock>({
        stockType: "CLOTHING_STOCK",
        stock: initialStockPerSize
    });

    const [singleStock, setSigleStock] = useState<number>(1);

    const paintingStockForm = () => {
        const paintingStockHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            const parsedValue = parseInt(value);
            setPaintingStockData((prev) => ({
                ...prev,
                [name]: isNaN(parsedValue) ? prev[name as keyof PaintingStock] : parsedValue
            }))
        }

        return <div>
            <CheckFormInput type={"checkbox"} name={"isOriginalAvailable"}
                checked={paintingStockData.isOriginalAvailable}
                value={paintingStockData.isOriginalAvailable ? "true" : "false"}
                onChange={() => setPaintingStockData((prev) => {
                    return { ...prev, ["isOriginalAvailable"]: !prev.isOriginalAvailable }
                })}
                labelClassname="w-full"
            >
                Original disponible
            </CheckFormInput>
            <FormInput name="stockCopies"
                onChange={paintingStockHandleChange}
                type="number"
                value={paintingStockData.stockCopies.toString()}
            >
                Copias disponibles
            </FormInput>
            <FormInput name="copiesMade"
                onChange={paintingStockHandleChange}
                type="number"
                value={paintingStockData.copiesMade.toString()}
            >
                Copias hechas
            </FormInput>
        </div>
    }

    const bodyClothingStockForm = () => {
        const handleBodyClothingStockChange = (size: BodyClothingSizeEnum, value: string) => {
            setBodyClothingStock((prev) => {
                const updatedStock = new Map(prev.stock);
                const parsedValue = parseInt(value);
                updatedStock.set(size, isNaN(parsedValue) ? (prev.stock.get(size) || 0) : parsedValue);
                return {
                    ...prev,
                    stock: updatedStock
                };
            });
        };

        const renderedStock = Array.from(bodyClothingStock.stock.entries()).map(([size, quantity]) => (
            <FormInput
                key={size}
                name={`size_${size}`}
                type="number"
                value={quantity.toString()}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleBodyClothingStockChange(size, e.target.value)
                }
            >
                {`Talla ${BodyClothingSizeEnum[size]}`}
            </FormInput>
        ));

        return <div>{renderedStock}</div>;
    }

    const singleStockForm = () => {
        return <FormInput type="number" name="stock" value={singleStock.toString()} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setSigleStock((prev) => parseInt(value) || prev);
        }}  >Piezas disponibles</FormInput>
    };

    let stockForm: React.ReactNode;

    switch (productType) {
        case ProductTypeEnum.PAINTING:
            stockForm = paintingStockForm();
            break;
        case ProductTypeEnum.SINGLE:
            stockForm = singleStockForm();
            break;
        case ProductTypeEnum.CLOTHING:
            stockForm = bodyClothingStockForm();
            break;
        case ProductTypeEnum.PRINT:
            break;
    }

    return <div>{stockForm}</div>;
}

export default ProductStockForm;