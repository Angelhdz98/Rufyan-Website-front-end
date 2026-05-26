import { Product, ProductTypeEnum, ProductDTO } from "../../types/typesIndex";

function mapProductToProductDTO(product: Product): ProductDTO {
    return {
        id: product.id,
        name: product.name,
        images: product.images,
        description: product.description,
        productStockDTO: product.productStock,
        productPricingDTO: product.productPricing,
        productTypeEnum: product.productTypeEnum,
        productDetails: product.productDomainDetails,
    };
}

function mapProductDTOToProduct(productDTO: ProductDTO, isFavorite: boolean = false): Product {
    return {
        id: productDTO.id,
        name: productDTO.name,
        images: productDTO.images,
        description: productDTO.description,
        productStock: productDTO.productStockDTO,
        productPricing: productDTO.productPricingDTO,
        productTypeEnum: productDTO.productTypeEnum,
        productDomainDetails: productDTO.productDetails,
        isFavorite,
    };
}

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

export { mapProductToProductDTO, mapProductDTOToProduct };
export default mapBackendProductToFrontend;