import { useState } from "react";
import { ProductTypeEnum, ProductStock, PaintingStock, ProductPricing, PaintingPricing, ProductSpecs, PaintingDomainDetails, MediumEnum, SupportMaterialEnum, BodyClothingDomainDetails, ClothingMaterial, PrintingTechniqueEnum, BodyClotheTypeEnum, ProductDomainDetails, CreateProductCommand, UpdateProductCommand, Product, ImageProduct, Page } from "../../types/typesIndex";
import { useImageUpload } from "../../hooks/useImageUpload";
import mapBackendProductToFrontend from "./ProductBackendMapper";
import { api } from "./axios";

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



    const initialPaintingStock: ProductStock = { copiesMade: 0, isOriginalAvailable: true, stockCopies: 0, stockType: "PAINTING_STOCK" } as PaintingStock;

    const initialProductPricing: ProductPricing = { pricePerCopy: 500, pricePerOriginal: 1000, pricingType: "ORIGINAL" } as PaintingPricing;

    const [commonData, setCommonData] = useState<ProductSpecs>({
        name: "",
        description: "",
        productStock: initialPaintingStock,
        productPricing: initialProductPricing,
        productTypeEnum,
        isFavorite: false,
    });

    const [selectedProductId, setSelectedProductId] = useState<number>(-1);

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
            //console.log("uploaded files: " + uploadedFiles);

            //{...command,["creationDate"]:}
            // Añadir comando como JSON

            if (command.productDetails.productTypeEnum == ProductTypeEnum.PAINTING) {
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
                // console.log("los archivos subidos son" + file.name);
            });

            formData.forEach((value, key) => {
                if (value instanceof File) {
                    console.log(`${key}: File(${value.name})`);
                } else {
                    console.log(`${key}: ${value}`);
                }
            });

            // Enviar petición POST con axios
            const response = await api.post("/products", formData/*, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }*/
            );

            if (response.status !== 200 && response.status !== 201) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            console.log("Producto creado exitosamente:", response.data);
            return response.data as Product;
        } catch (error) {
            console.error("Error al crear el producto:", error);
            throw error;
        }
    };

    const [currentImages, setCurrentImages] = useState<ImageProduct[]>([]);

    const handleUpdateFormSubmit = async () => {
        try {
            // Preparar los detalles del producto con la fecha adaptada si es necesario
            //  let productDetailsToSend = productDomainDetails;

            if (productDomainDetails.productTypeEnum === ProductTypeEnum.PAINTING) {
                const paintingDetails = productDomainDetails;
                //const adaptedDate = paintingDetails.creationDate.toISOString().split("T")[0];
                /*productDetailsToSend = {
                    ...paintingDetails,
                    creationDate: new Date(adaptedDate),
                };*/
                console.log("Details: " + JSON.stringify(paintingDetails));

            }

            // Crear el comando de actualización
            const updateCommand: UpdateProductCommand = {
                productId: selectedProductId,
                productSpecs: { ...commonData, productTypeEnum: productTypeEnum },
                productDomainDetails: productDomainDetails,
                images: currentImages,
            };



            console.log("updateCommand a enviar:" + JSON.stringify(updateCommand));


            // Crear FormData para enviar multipart
            const formData = new FormData();

            // Añadir el comando como JSON con el nombre correcto "updateCommand"
            formData.append(
                "updateCommand",
                new Blob([JSON.stringify(updateCommand)], { type: "application/json" })
            );
            console.log("Archivos subidos: " + JSON.stringify(uploadedFiles))

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
            return data as Product;
        } catch (error) {
            console.error("Error al actualizar el producto:", error);

        }
    };
    const handleGetPagedProducts = async (pageNumber: number, pageSize: number) => {
        try {
            // Construir la URL con parámetros de paginación
            //const url = new URL("/admin/products-paged-custom", window.location.origin);



            // Realizar petición GET
            const response = await api.get("/admin/products-paged-custom", {
                params: {
                    pageNumber,
                    pageSize
                }
            });

            if (response.status !== 200 && response.status !== 201) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.data as Page<Product>;
            console.log("Productos obtenidos exitosamente:", data);
            return data; // Retorna Page<Product>
        } catch (error) {
            console.error("Error al obtener los productos paginados:", error);
            throw error;
        }
    };

    const handleGetProductEntityForEditingById = async (productId: number) => {
        try {
            const response = await fetch("/api/admin/find-product-entity-by-id/" + productId, {
                method: "GET"
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            console.log("Productos obtenidos exitosamente:", data);
            return mapBackendProductToFrontend(data);
        } catch (error) {
            console.error("Error al obtener el producto por id:", error);
            throw error;
        }
    }

    const handleDeleteProductById = async (idToDelete: number) => {



        const response = await fetch("/api/products/" + idToDelete, {
            method: "DELETE"
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

    }



    const paintingDetails: PaintingDomainDetails = {
        alturaCm: 30,
        largoCm: 25,
        creationDate: new Date(),
        medium: MediumEnum.ACRYLYC_PAINT.toString(),
        supportMaterial: SupportMaterialEnum.COTTON_PAPER.toString(),
        productTypeEnum: ProductTypeEnum.PAINTING
    };
    const clothingDetails: BodyClothingDomainDetails = { material: ClothingMaterial.COTTON.toString(), printingTechnique: PrintingTechniqueEnum.AEROGRAPHY.toString(), productTypeEnum: ProductTypeEnum.CLOTHING, type: BodyClotheTypeEnum.HOODIE.toString() };
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
        handleChange,
        toggleIsFavorite,
        handleProductTypeChange,
        handleDetailsChange,
        handleStockChanging,
        handlePriceChanging,
        /*     handleUpdateProductChange,*/
        handleUpdateFormSubmit,
        currentImages,
        setCurrentImages,
        handleImageUpload,
        deleteImageUpload,
        imagePreview,
        uploadedFiles,
        setImagePreview,
        setUploadedFiles,
        handleAddFormSubmit, productTypeEnum, commonData, setCommonData, productDomainDetails, handleGetPagedProducts, handleGetProductEntityForEditingById,
        selectedProductId,
        setSelectedProductId,
        handleDeleteProductById
    };
}

