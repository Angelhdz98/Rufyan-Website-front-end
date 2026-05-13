import React, { Fragment, useEffect } from "react";
import { ProductDomainDetails } from "../types/typesIndex"

export interface DetailsTagProps extends React.HTMLAttributes<HTMLDivElement> {
    productDetails: ProductDomainDetails
};


function DetailsTag(props: DetailsTagProps) {
    useEffect(() => {
        console.log(" details in details tag: " + JSON.stringify(props.productDetails));
    }, [props.productDetails]);

    let details: React.ReactNode;
    switch (props.productDetails.productTypeEnum) {
        case "PAINTING": {
            details = (<Fragment>
                <span> Pintura</span>
                <span> Altura: {props.productDetails.alturaCm} cm </span>
                <span> Largo: {props.productDetails.largoCm} cm</span>
                <span> Medio: {props.productDetails.medium}</span>
                <span> Material de soporte {props.productDetails.supportMaterial}</span>
                <span> Fecha de creación {props.productDetails.creationDate.toDateString()} </span>

            </Fragment>)

            break;
        };
        case "CLOTHING": {
            details = (<Fragment>
                <span>Ropa</span>
                <span>Material: {props.productDetails.material} </span>
                <span>Tecnica de impresión: {props.productDetails.printingTechnique}

                </span>
            </Fragment>)
            break;
        };
        default:
            {
                details = <div> no productTypeEnum</div>
            }

    }
    return <div className={props.className}>
        {details}
    </div>;
}

export default DetailsTag