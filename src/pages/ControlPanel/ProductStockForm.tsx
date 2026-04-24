import React, { useState } from "react";
import CheckFormInput from "../../components/CheckFormInput";
import FormInput from "../../components/FormInput";
import { BodyClothingSizeEnum, ClothingStock, PaintingStock, ProductStock, ProductTypeEnum, SingleStock } from "../../types/typesIndex";

type ProductStockFormProps = {
    productType: ProductTypeEnum,
    handleStockChange: (stock: ProductStock) => void
}

function ProductStockForm({ productType, handleStockChange }: ProductStockFormProps) {
    const initialStockPerSize: Record<BodyClothingSizeEnum, number> = {
        [BodyClothingSizeEnum.XS]: 0,
        [BodyClothingSizeEnum.S]: 0,
        [BodyClothingSizeEnum.M]: 0,
        [BodyClothingSizeEnum.L]: 0,
        [BodyClothingSizeEnum.XL]: 0
    };

    const [paintingStockData, setPaintingStockData] = useState<PaintingStock>({
        isOriginalAvailable: true,
        availableCopies: 1,
        copiesMade: 1,
        stockType: "PAINTING_STOCK"
    });

    const [bodyClothingStock, setBodyClothingStock] = useState<ClothingStock>({
        stockType: "CLOTHING_STOCK",
        stockPerSize: initialStockPerSize
    });

    const [singleStock, setSigleStock] = useState<SingleStock>({ stock: 1, stockType: "SINGLE_STOCK" });

    const paintingStockForm = () => {

        const paintingStockHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            const parsedValue = parseInt(value);
            const updatedStock = {
                ...paintingStockData, [name]: isNaN(parsedValue) ? paintingStockData[name as keyof PaintingStock] : parsedValue
            };
            console.log("painting stockData: " + JSON.stringify(updatedStock))

            setPaintingStockData(updatedStock);
            handleStockChange(updatedStock);


        }
        const toggleIsOriginalAvailable = () => {
            const updatedStock = { ...paintingStockData, ["isOriginalAvailable"]: !paintingStockData.isOriginalAvailable } as PaintingStock;
            setPaintingStockData(updatedStock);
            handleStockChange(updatedStock);
        };

        return <div>
            <CheckFormInput type={"checkbox"} name={"isOriginalAvailable"}
                checked={paintingStockData.isOriginalAvailable}
                value={paintingStockData.isOriginalAvailable ? "true" : "false"}
                onChange={toggleIsOriginalAvailable}
                labelClassname="w-full"
            >
                Original disponible
            </CheckFormInput>
            <FormInput name="availableCopies"
                onChange={paintingStockHandleChange}
                type="number"
                value={paintingStockData.availableCopies.toString()}
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

    const handleBodyClothingStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const parsedValue = parseInt(value);
        const updatedStock = {
            ...bodyClothingStock.stockPerSize,
            [name]: isNaN(parsedValue) ? bodyClothingStock.stockPerSize[name as BodyClothingSizeEnum] : parsedValue
        };


        const updatedClothingStock: ClothingStock = { ["stockPerSize"]: updatedStock, stockType: "CLOTHING_STOCK" };
        handleStockChange(updatedClothingStock);
        setBodyClothingStock(updatedClothingStock);
        console.log("Valor de stock actualizado: " + JSON.stringify(updatedClothingStock));


    };

    const bodyClothingStockForm = () => {


        const renderedStock = Object.entries(bodyClothingStock.stockPerSize).map(([size, quantity]) => (
            <FormInput
                key={size}
                name={size}
                type="number"
                value={quantity.toString()}
                onChange={
                    handleBodyClothingStockChange
                }
            >
                {`Talla ${size}`}
            </FormInput>
        ));

        return <div>{renderedStock}</div>;
    }
    const handleSingleStockFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const parsedValue = parseInt(value);
        const updatedSingleStock: SingleStock = {
            ...singleStock,
            stock: isNaN(parsedValue) ? singleStock.stock : parsedValue
        }
        handleStockChange(updatedSingleStock);
        setSigleStock(updatedSingleStock);

    }

    const singleStockForm = () => {
        return <FormInput type="number" name="stock" value={singleStock.stock.toString()} onChange={handleSingleStockFormChange}  >Piezas disponibles</FormInput>
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