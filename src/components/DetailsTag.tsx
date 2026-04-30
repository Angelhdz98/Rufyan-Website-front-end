import { ProductDomainDetails, ProductTypeEnum } from "../types/typesIndex"

export type DetailsTagProps={
    productDetails:ProductDomainDetails
};


function DetailsTag({productDetails}: DetailsTagProps){
     let details:React.ReactNode;
       switch (productDetails.productType){
                case ProductTypeEnum.PAINTING:{
                    details = (<div>
                        <span> Pintura</span>
                        <span> Altura: {productDetails.alturaCm} cm </span>
                        <span> Largo: {productDetails.largoCm} cm</span>
                        <span> Medio: {productDetails.medium}</span>
                        <span> Material de soporte {productDetails.supportMaterial}</span>
                        <span> Fecha de creación {productDetails.creationDate.toDateString()} </span>
                        
                    </div>)

                    break;  
        };
        case ProductTypeEnum.CLOTHING:{
            details = (<div>
                <span>Ropa</span>
                <span>Material: {productDetails.material} </span>
                <span>Tecnica de impresión: {productDetails.printingTechnique}

                </span>
                </div>)
            break;
        };
        
       }
    return details; 
}

export default DetailsTag