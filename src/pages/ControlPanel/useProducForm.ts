import { useState } from "react";
import { ProductTypeEnum, ProductStock, PaintingStock, ProductPricing, PaintingPricing, ProductSpecs, PaintingDomainDetails, MediumEnum, SupportMaterialEnum, BodyClothingDomainDetails, ClothingMaterial, PrintingTechniqueEnum, BodyClotheTypeEnum, ProductDomainDetails, CreateProductCommand, UpdateProductCommand} from "../../types/typesIndex";
import { useImageUpload } from "./AddPaintingForm";
export const useProductForm = () => {

    const {
        handleImageUpload,
        deleteImageUpload,
        imagePreview,
        uploadedFiles,
        setImagePreview,
        setUploadedFiles,
    } = useImageUpload();
    const [productTypeEnum, setProductTypeEnum] = useState<ProductTypeEnum>(ProductTypeEnum.PAINTING)

    /*const productPricing: PricingTypeEnum = productTypeEnum === ProductTypeEnum.PAINTING ? PricingTypeEnum.ORIGINAL : PricingTypeEnum.SINGLE;
    */


    const initialPaintingStock: ProductStock = { copiesMade: 0, isOriginalAvailable: true, availableCopies: 0, stockType: "PAINTING_STOCK" } as PaintingStock;

    const initialProductPricing: ProductPricing = { pricePerCopy: 500, pricePerOriginal: 1000, pricingType: "ORIGINAL" } as PaintingPricing;

    const [commonData, setCommonData] = useState<ProductSpecs>({
        name: "",
        description: "",
        productStock: initialPaintingStock,
        productPricing: initialProductPricing,
        productTypeEnum,
        isFavorite: false,
    });

    const handleAddFormSubmit = async () => {
        try {
            // Crear el objeto de detalles según el tipo de producto


            // Crear el comando
            const command: CreateProductCommand = {
                productSpecs: { ...commonData, productTypeEnum: productTypeEnum },
                productDetails: productDomainDetails,
            };

            // Crear FormData para enviar multipart
            const formData = new FormData();

            console.log("Comando a enviar:", JSON.stringify(command, null, 2));

            //{...command,["creationDate"]:}
            // Añadir comando como JSON

            if (command.productDetails.productType == ProductTypeEnum.PAINTING) {
                const adaptedDate = command.productDetails.creationDate.toISOString().split("T")[0];

                const paintingDetailsCommand: PaintingDomainDetails = { ...command.productDetails, creationDate: new Date(adaptedDate) };

                const newCommand = { ...command, productDetails: paintingDetailsCommand } as CreateProductCommand;
                formData.append("command", new Blob([JSON.stringify(newCommand)], { type: "application/json" }));
            } else {
                formData.append("command", new Blob([JSON.stringify(command)], { type: "application/json" }));
                console.log("FormData entries:");
                formData.forEach((value, key) => {
                    if (value instanceof File) {
                        console.log(`${key}: File(${value.name})`);
                    } else {
                        console.log(`${key}: ${value}`);
                    }
                });


            }



            // Añadir imágenes
            uploadedFiles.forEach((file: File) => {
                formData.append("images", file);
            });

            console.log("FormData entries:");
            formData.forEach((value, key) => {
                if (value instanceof File) {
                    console.log(`${key}: File(${value.name})`);
                } else {
                    console.log(`${key}: ${value}`);
                }
            });

            // Enviar petición POST
            const response = await fetch("/api/products", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            console.log("Producto creado exitosamente:", data);
            // Aquí puedes redirigir o mostrar un mensaje de éxito
        } catch (error) {
            console.error("Error al crear el producto:", error);
            // Mostrar mensaje de error al usuario
        }
    };

    const handleUpdateFormSubmit = async () => {
        try {
            // Preparar los detalles del producto con la fecha adaptada si es necesario
            let productDetailsToSend = productDomainDetails;

            if (productDomainDetails.productType === ProductTypeEnum.PAINTING) {
                const paintingDetails = productDomainDetails as PaintingDomainDetails;
                const adaptedDate = paintingDetails.creationDate.toISOString().split("T")[0];
                productDetailsToSend = {
                    ...paintingDetails,
                    creationDate: new Date(adaptedDate),
                };
            }

            // Crear el comando de actualización
            const updateCommand: UpdateProductCommand = {
                productSpecs: { ...commonData, productTypeEnum: productTypeEnum },
                productDetails: productDetailsToSend,
                images: [],
            };

            // Crear FormData para enviar multipart
            const formData = new FormData();

            // Añadir el comando como JSON con el nombre correcto "updateCommand"
            formData.append(
                "updateCommand",
                new Blob([JSON.stringify(updateCommand)], { type: "application/json" })
            );

            // Añadir las nuevas imágenes con el nombre "addedImages"
            uploadedFiles.forEach((file: File) => {
                formData.append("addedImages", file);
            });

            console.log("FormData a enviar:");
            formData.forEach((value, key) => {
                if (value instanceof File) {
                    console.log(`${key}: File(${value.name})`);
                } else {
                    console.log(`${key}: ${value}`);
                }
            });

            // Enviar petición PUT
            const response = await fetch("/api/products", {
                method: "PUT",
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            console.log("Producto actualizado exitosamente:", data);
        } catch (error) {
            console.error("Error al actualizar el producto:", error);

        }
    };
    const handleGetPagedProducts = async (pageNumber: number, pageSize: number) => {
        try {
            // Construir la URL con parámetros de paginación
            const url = new URL("/api/admin/products-paged-custom", window.location.origin);
            url.searchParams.append("pageNumber", pageNumber.toString());
            url.searchParams.append("pageSize", pageSize.toString());

            console.log("Obteniendo productos paginados desde:", url.toString());

            // Realizar petición GET
            const response = await fetch(url.toString(), {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            console.log("Productos obtenidos exitosamente:", data);
            return data; // Retorna Page<Product>
        } catch (error) {
            console.error("Error al obtener los productos paginados:", error);
            throw error;
        }
    };

    const handleGetProductEntityForEditingById = async (productId: number) => {
        try{
            const response = await fetch("/find-product-entity-by-id/"+productId, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                },
            });
        if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            console.log("Productos obtenidos exitosamente:", data);
            return data;
        }catch (error) {
            console.error("Error al obtener el producto por id:", error);
            throw error;
        }
    }



    const paintingDetails: PaintingDomainDetails = {
        alturaCm: 30,
        largoCm: 25,
        creationDate: new Date(),
        medium: MediumEnum.ACRYLYC_PAINT.toString(),
        supportMaterial: SupportMaterialEnum.COTTON_PAPER.toString(),
        productType: ProductTypeEnum.PAINTING
    };
    const clothingDetails: BodyClothingDomainDetails = { material: ClothingMaterial.COTTON.toString(), printingTechnique: PrintingTechniqueEnum.AEROGRAPHY.toString(), productType: ProductTypeEnum.CLOTHING, type: BodyClotheTypeEnum.HOODIE.toString() };
    const [productDomainDetails, setProductDomainDetails] = useState<ProductDomainDetails>(paintingDetails);

    const handlePriceChanging = (pricing: ProductPricing) => {
        setCommonData((prev) => {
            return { ...prev, productPricing: pricing };
        });
    };
    const handleStockChanging = (stock: ProductStock) => {
        setCommonData((prev) => {
            return { ...prev, ["productStock"]: stock };
        });

    }
    const toggleIsFavorite = () => {
        const updateCommonData = { ...commonData, ["isFavorite"]: !commonData.isFavorite } as ProductSpecs;
        console.log("commonData en is Favoritee: " + JSON.stringify(updateCommonData));
        setCommonData(updateCommonData);
    }

    const handleDetailsChange = (details: ProductDomainDetails) => {
        setProductDomainDetails(details);

    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCommonData((prev) => {
            return { ...prev, [name]: value }
        })

    };


    const handleProductTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        let productTypeSelected: ProductTypeEnum;
        switch (value) {
            case ProductTypeEnum.PAINTING.toString():
                productTypeSelected = ProductTypeEnum.PAINTING;
                setProductDomainDetails(paintingDetails);

                break;

            case ProductTypeEnum.CLOTHING.toString():
                productTypeSelected = ProductTypeEnum.CLOTHING;
                setProductDomainDetails(clothingDetails);
                break;
            case ProductTypeEnum.SINGLE.toString():
                productTypeSelected = ProductTypeEnum.SINGLE;

                break;
            default:
                productTypeSelected = ProductTypeEnum.PAINTING;
        }

        setProductTypeEnum(productTypeSelected);
        const updatedCommonData: ProductSpecs = {
            ...commonData, ["productTypeEnum"]: productTypeSelected
        }
        setCommonData(updatedCommonData);

    }

    /*  const handleUpdateProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  
      }*/


    return {
        handleChange, toggleIsFavorite, handleProductTypeChange, handleDetailsChange, handleStockChanging, handlePriceChanging,
        /*     handleUpdateProductChange,*/
        handleUpdateFormSubmit,
        handleImageUpload,
        deleteImageUpload,
        imagePreview,
        uploadedFiles,
        setImagePreview,
        setUploadedFiles, handleAddFormSubmit, productTypeEnum, commonData, productDomainDetails, handleGetPagedProducts,handleGetProductEntityForEditingById
    };
}

