import React, { Fragment } from "react";
import { BodyClothingSizeEnum, ClothingStock, PaintingStock, ProductStock, SingleStock } from "../types/typesIndex";

interface StockTagProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
    productStock: ProductStock
}

function StockTag(props: StockTagProps) {
    let stock: ProductStock;
    let stockTags;

    switch (props.productStock.stockType) {
        case "PAINTING_STOCK":
            stock = props.productStock as PaintingStock;
            stockTags = <Fragment >
                <div><span>
                    {stock.isOriginalAvailable ? "Obra original disponible" : "Obra original no disponible"}
                </span>
                </div>
                <div>
                    <span>
                        Copias disponibles {stock.stockCopies} / {stock.copiesMade}
                    </span>
                </div>

            </Fragment>
            break;
        case "SINGLE_STOCK":
            stock = props.productStock as SingleStock;
            stockTags = <Fragment>
                <span className=" text-orange-600">
                    {stock.stock > 0 ? "Disponible" : "No disponible"}
                </span>
            </Fragment>
            break;
        case "CLOTHING_STOCK": {
            stock = props.productStock as ClothingStock;
            const stockDisponible: Record<BodyClothingSizeEnum, number> = stock.stockPerSize;
            stockTags = <>{Object.entries(stockDisponible).map(([nombre, cantidad]) => {
                <span key={nombre}>
                    {nombre} : {cantidad > 0 ? "Disponible" : "No disponible"}
                </span>
            })}</>
            break;
        }
    }

    return <div className={props.className}>{stockTags}</div>


}

export default StockTag;      