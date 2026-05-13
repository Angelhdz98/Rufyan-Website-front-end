import { Product, ProductTypeEnum } from "../../types/typesIndex";

function mapBackendProductToFrontend(backendProduct: any): Product {
    const { alturaCm, largoCm, medium, supportMaterial, creationDate, productTypeEnum, pricingTypeEnum, ...rest } = backendProduct;

    // Construir productDomainDetails según el tipo
    let productDomainDetails: any;
    if (productTypeEnum === ProductTypeEnum.PAINTING) {
        productDomainDetails = {
            alturaCm,
            largoCm,
            medium,
            supportMaterial,
            creationDate: new Date(creationDate),
            productTypeEnum: ProductTypeEnum.PAINTING,
        };
    } else {
        // Para otros tipos, adaptar según necesario
        productDomainDetails = {
            productTypeEnum,
        };
    }

    // Corregir pricingType en productPricing
    const productPricing = {
        ...backendProduct.productPricing,
        pricingType: pricingTypeEnum || backendProduct.productPricing.pricingTypeEnum,
    };
    delete productPricing.pricingTypeEnum;

    return {
        ...rest,
        productTypeEnum,
        productDomainDetails,
        productPricing,
    } as Product;
}
export default mapBackendProductToFrontend;