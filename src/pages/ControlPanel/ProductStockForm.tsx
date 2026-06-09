import React, { useEffect, useState } from "react";
import CheckFormInput from "../../components/CheckFormInput";
import FormInput from "../../components/FormInput";
import { BodyClothingSizeEnum, ClothingStock, PaintingStock, ProductStock, ProductTypeEnum, SingleStock, StockTypeEnum } from "../../types/typesIndex";

type ProductStockFormProps = {
    stock?: ProductStock,
    productType: ProductTypeEnum,
    handleStockChange: (stock: ProductStock) => void
}

function ProductStockForm(props: ProductStockFormProps) {
    const initialStockPerSize: Record<BodyClothingSizeEnum, number> = {
        [BodyClothingSizeEnum.XS]: 0,
        [BodyClothingSizeEnum.S]: 0,
        [BodyClothingSizeEnum.M]: 0,
        [BodyClothingSizeEnum.L]: 0,
        [BodyClothingSizeEnum.XL]: 0
    };

    const [currentStock, setCurrentStock] = useState<ProductStock | undefined>(props.stock);

    useEffect(() => {
        if (props.stock) {
            setCurrentStock(props.stock);
        } else {
            // Inicializar con valores por defecto según el tipo de producto
            let defaultStock: ProductStock;

            if (props.productType === ProductTypeEnum.PAINTING) {
                defaultStock = {
                    isOriginalAvailable: true,
                    stockCopies: 0,
                    copiesMade: 0,
                    stockType: StockTypeEnum.PAINTING_STOCK
                } as PaintingStock;
            } else if (props.productType === ProductTypeEnum.CLOTHING) {
                defaultStock = {
                    stockPerSize: initialStockPerSize,
                    stockType: StockTypeEnum.CLOTHING_STOCK
                } as ClothingStock;
            } else if (props.productType === ProductTypeEnum.SINGLE) {
                defaultStock = {
                    stock: 1,
                    stockType: StockTypeEnum.SINGLE_STOCK
                } as SingleStock;
            } else {
                defaultStock = {
                    stock: 1,
                    stockType: StockTypeEnum.SINGLE_STOCK
                } as SingleStock;
            }

            setCurrentStock(defaultStock);
        }
    }, [props.stock, props.productType]);

    /* const [paintingStockData, setPaintingStockData] = useState<PaintingStock>({
         isOriginalAvailable: true,
         stockCopies: ,
         copiesMade: 1,
         stockType: StockTypeEnum.PAINTING_STOCK
     });
     if (props.stock && props.stock.stockType == StockTypeEnum.PAINTING_STOCK) {
         setPaintingStockData({
             isOriginalAvailable: props.stock.isOriginalAvailable,
             stockCopies: props.stock.stockCopies,
             copiesMade: props.stock.copiesMade,
             stockType: StockTypeEnum.PAINTING_STOCK
         })
     }
 
    
 
     const [bodyClothingStock, setBodyClothingStock] = useState<ClothingStock>({
         stockType: StockTypeEnum.CLOTHING_STOCK,
         stockPerSize: initialStockPerSize
     });
 
     if (props.stock && props.stock.stockType == StockTypeEnum.CLOTHING_STOCK) {
         setBodyClothingStock({
             stockType: StockTypeEnum.CLOTHING_STOCK,
             stockPerSize: props.stock.stockPerSize
         })
     }
 
     const [singleStock, setSigleStock] = useState<SingleStock>({ stock: 1, stockType: StockTypeEnum.SINGLE_STOCK });
 
     if (props.stock && props.stock.stockType == StockTypeEnum.SINGLE_STOCK) {
         setSigleStock({ stock: props.stock.stock, stockType: StockTypeEnum.SINGLE_STOCK })
     }
  */
    const paintingStockForm = () => {
        const stock: PaintingStock = (currentStock && 'stockCopies' in currentStock)
            ? currentStock as PaintingStock
            : { isOriginalAvailable: true, stockCopies: 0, copiesMade: 0, stockType: StockTypeEnum.PAINTING_STOCK };
        const paintingStockHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            const parsedValue = value === "" ? 0 : parseInt(value);
            if (currentStock?.stockType == StockTypeEnum.PAINTING_STOCK) {
                const updatedStock = {
                    ...currentStock, [name]: isNaN(parsedValue) ? currentStock[name as keyof PaintingStock] : parsedValue
                };
                console.log("painting stockData: " + JSON.stringify(updatedStock))

                setCurrentStock(updatedStock);
                props.handleStockChange(updatedStock);
            }


        }

        const toggleIsOriginalAvailable = () => {
            if (currentStock?.stockType == StockTypeEnum.PAINTING_STOCK) {
                const updatedStock = { ...currentStock, ["isOriginalAvailable"]: !currentStock.isOriginalAvailable } as PaintingStock;
                setCurrentStock(updatedStock);
                props.handleStockChange(updatedStock);
            }

        };

        return <div>
            <CheckFormInput type={"checkbox"} name={"isOriginalAvailable"}
                checked={stock.isOriginalAvailable}
                value={stock.isOriginalAvailable ? "true" : "false"}
                onChange={toggleIsOriginalAvailable}
                labelClassname="w-full"
            >
                Original disponible
            </CheckFormInput>
            <FormInput name="stockCopies"
                onChange={paintingStockHandleChange}
                type="number"
                value={stock.stockCopies.toString()}
            >
                Copias disponibles
            </FormInput>
            <FormInput name="copiesMade"
                onChange={paintingStockHandleChange}
                type="number"
                value={stock.copiesMade.toString()}
            >
                Copias hechas
            </FormInput>
        </div>
    }


    const bodyClothingStockForm = () => {

        const stock: ClothingStock = (currentStock && 'stockPerSize' in currentStock)
            ? currentStock as ClothingStock
            : { stockPerSize: initialStockPerSize, stockType: StockTypeEnum.CLOTHING_STOCK };

        const renderedStock = Object.entries(stock.stockPerSize).map(([size, quantity]) => (
            <FormInput
                key={size}
                name={size}
                type="number"
                value={quantity.toString()}
                onChange={
                    (e: React.ChangeEvent<HTMLInputElement>) => {
                        const { name, value } = e.target;
                        const parsedValue = parseInt(value);
                        const updatedStock = {
                            ...stock.stockPerSize,
                            [name]: isNaN(parsedValue) ? stock.stockPerSize[name as BodyClothingSizeEnum] : parsedValue
                        };


                        const updatedClothingStock: ClothingStock = { ["stockPerSize"]: updatedStock, stockType: StockTypeEnum.CLOTHING_STOCK };
                        props.handleStockChange(updatedClothingStock);
                        setCurrentStock(updatedClothingStock);
                        console.log("Valor de stock actualizado: " + JSON.stringify(updatedClothingStock));


                    }
                }
            >
                {`Talla ${size}`}
            </FormInput>
        ));

        return <div>{renderedStock}</div>;
    }


    const singleStockForm = () => {

        const stock: SingleStock = (currentStock && 'stock' in currentStock && !('stockPerSize' in currentStock))
            ? currentStock as SingleStock
            : { stock: 1, stockType: StockTypeEnum.SINGLE_STOCK };

        return <FormInput type="number" name="stock" value={stock.stock.toString()} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            const parsedValue = parseInt(value);
            const updatedSingleStock: SingleStock = {
                ...stock,
                stock: isNaN(parsedValue) ? stock.stock : parsedValue
            }
            props.handleStockChange(updatedSingleStock);
            setCurrentStock(updatedSingleStock);

        }}  >Piezas disponibles</FormInput>
    };

    let stockForm: React.ReactNode;

    switch (props.productType) {
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

    return <div className="w-fit space-y-2">{stockForm}</div>;
}

export default ProductStockForm;