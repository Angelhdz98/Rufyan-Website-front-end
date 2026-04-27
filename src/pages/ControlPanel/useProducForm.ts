import { useState } from "react";
import { ProductTypeEnum, ProductStock, PaintingStock, ProductPricing, PaintingPricing, ProductSpecs, PaintingDomainDetails, MediumEnum, SupportMaterialEnum, BodyClothingDomainDetails, ClothingMaterial, PrintingTechniqueEnum, BodyClotheTypeEnum, ProductDomainDetails, CreateProductCommand, UpdateProductCommand, ImageProduct, UpdateProductSpecs } from "../../types/typesIndex";
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

    const handleUpdateFormSubmit = async ({ productSpecs, productTypeEnum, productDomainDetails, images }: UpdateProductSpecs) => {
        try {
            // Crear el objeto de detalles según el tipo de producto


            // Crear el comando
            const updateCommand: UpdateProductCommand = {
                productSpecs: { ...productSpecs, productTypeEnum: productTypeEnum },
                productDetails: productDomainDetails,
                images,
            };


            // Crear FormData para enviar multipart
            const formData = new FormData();

            console.log("Comando a enviar:", JSON.stringify(updateCommand, null, 2));

            //{...command,["creationDate"]:}
            // Añadir comando como JSON

            if (updateCommand.productDetails.productType == ProductTypeEnum.PAINTING) {
                const adaptedDated = updateCommand.productDetails.creationDate.toISOString().split("T")[0];
                const paintingDetailsCommand = { ...updateCommand.productDetails, creationDate: adaptedDated };

                const newCommand = { ...updateCommand, productDomainDetails: paintingDetailsCommand };
                formData.append("command", new Blob([JSON.stringify(newCommand)], { type: "application/json" }));
            } else {
                formData.append("command", new Blob([JSON.stringify(updateCommand)], { type: "application/json" }));
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
                formData.append("addedImages", file);
            });
            updateCommand.images.forEach((image: ImageProduct) => {
                formData.append("images", new Blob([JSON.stringify(image)], { type: "application/json" }));
            });

            console.log("FormData entries:");
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
            console.log("Producto creado exitosamente:", data);
            // Aquí puedes redirigir o mostrar un mensaje de éxito
        } catch (error) {
            console.error("Error al crear el producto:", error);
            // Mostrar mensaje de error al usuario
        }
    };

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


    const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
        handleChange, toggleIsFavorite, handleProductchange: handleProductChange, handleDetailsChange, handleStockChanging, handlePriceChanging,
        /*     handleUpdateProductChange,*/
        handleUpdateFormSubmit,
        handleImageUpload,
        deleteImageUpload,
        imagePreview,
        uploadedFiles,
        setImagePreview,
        setUploadedFiles, handleAddFormSubmit, productTypeEnum, commonData, productDomainDetails
    };
}

