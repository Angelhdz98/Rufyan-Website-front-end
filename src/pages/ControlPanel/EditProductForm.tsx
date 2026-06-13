import { useEffect, useState } from "react";
import Button from "../../components/Button";
import { ImageUploader } from "../../components/ImageUploader";
import ProductSpecsForm from "./ProductSpecsForm";
import { useProductForm } from "./useProducForm";
import CurrentImagesEditor from "./CurrentImagesEditor";
import { ImageProduct, PaintingPricing, PricingTypeEnum, ProductPricing, SinglePricing, } from "../../types/typesIndex";
import Modal from "../../components/Modal";


type EditProductFormProps = {
    productId: number;
    images?: ImageProduct[];

}






function EditProductForm(props: EditProductFormProps) {
    const maxSize = 2;//MB
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    // const [_, setError] = useState<""|undefined>();

    const { handleChange, toggleIsFavorite, handleProductTypeChange, handleDetailsChange, handleStockChanging, handlePriceChanging, productTypeEnum, commonData, handleUpdateFormSubmit, handleImageUpload, deleteImageUpload, imagePreview, uploadedFiles, setCommonData, handleGetProductEntityForEditingById,
        setSelectedProductId
        , currentImages, setCurrentImages, handleDeleteProductById, productDomainDetails } = useProductForm();


    const voidJsxElement = <div></div>;

    const [modalContent, setModalContent] = useState<JSX.Element>(voidJsxElement);


    useEffect(() => {
        //currentImages?setCurrentImages(currentImages): "";


        handleGetProductEntityForEditingById(props.productId).then((productData) => {
            // Aquí puedes manejar los datos del producto obtenidos
            let pricing: ProductPricing = productData.productPricing as PaintingPricing;

            if (productData.productPricing.pricingType == PricingTypeEnum.ORIGINAL) {

                pricing = productData.productPricing as PaintingPricing;
                console.log("Original pricing: " + JSON.stringify(pricing));
            }
            if (productData.productPricing.pricingType == PricingTypeEnum.SIMPLE) {

                pricing = productData.productPricing as SinglePricing;
                console.log("Simple pricing: " + JSON.stringify(pricing));
            }



            console.log("Datos del producto:", productData);
            setSelectedProductId(props.productId);
            setCommonData({
                name: productData.name,
                description: productData.description,
                isFavorite: productData.isFavorite,
                productPricing: pricing,
                productStock: productData.productStock,
                productTypeEnum: productData.productTypeEnum
            })
            handleDetailsChange(productData.productDomainDetails);
            setCurrentImages(productData.images);
            //console.log("Imagenes actuales: ", productData.images);
            // Puedes actualizar el estado con estos datos si es necesario
        }).catch((error) => {
            // Manejo de errores
            console.error("Error al obtener el producto:", error);
            //setError(error.message); // Suponiendo que tienes un estado de error
        }).finally(() => {
            console.log("common Data: " + JSON.stringify(commonData));
        });


    }

        , [props.productId]);




    const tryHandleUpdateFormSubmit = () => {
        let isThereALargeFile: boolean = false;
        let excededDocuments: string = '';
        console.log("currentImages before sending update: " + JSON.stringify(currentImages));
        if (currentImages.length + uploadedFiles.length < maxSize) {
            setModalContent(() => {
                return <div>A product need to have at least {maxSize} images:
                    <hr />
                    Current images: {currentImages.length}
                    <hr />
                    Uploaded image files: {uploadedFiles.length}
                </div>
            });
            setIsModalOpen(true)
            return
        } else {
            uploadedFiles.forEach((file: File) => {
                if (file.size > maxSize * 1024 * 1024) {
                    isThereALargeFile = true;
                    excededDocuments = excededDocuments + "," + file.name + " ";

                }
            })

            if (isThereALargeFile) {
                setModalContent(() => {
                    return <div>
                        Las imagenes: {excededDocuments} se exceden de los {maxSize}MB
                    </div>
                })

                setIsModalOpen(true);
                return
            }

            handleUpdateFormSubmit().then((product) => {
                // if(product){
                console.log("Update sended correctly, new product:" + JSON.stringify(product));

                setModalContent(() => {
                    return <div>Producto actualizado, correctamente por favor refresque la pagina </div>
                });
                // }

            })
                .catch((error: Error) => {
                    setModalContent(() => {
                        return <div>Hubo un error haciendo la petición:
                            <hr />
                            <span>{error.message}</span>
                        </div>
                    });
                })


        }





        setIsModalOpen(true);
    }

    /*        const deleteImage = (imageId: number) => {
            const updatedImages = currentImages.filter((image) => image.id !== imageId);
            console.log("imagenes actualizadas: ", updatedImages)
            setCurrentImages(updatedImages);
        }
    */

    return (
        <div>
            <ProductSpecsForm
                productSpecs={commonData}
                productTypeEnum={productTypeEnum}
                handleProductTypeChange={handleProductTypeChange}
                handleChange={handleChange}
                toggleIsFavorite={toggleIsFavorite}
                handleStockChanging={handleStockChanging}
                handleDetailsChange={handleDetailsChange}
                handlePriceChanging={handlePriceChanging}
                className=" grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-2 gap-4  p-4 border-4 border-red-600  "

                firstBlockClassName={"  flex flex-col md:flex-col w-full border-4 boder-blue-600  "}
                secondBlockClassName={"  grid lg:grid-cols-2 p-2 gap-4 border-4 border-orange-600  "}
                productDetails={productDomainDetails} />
            <CurrentImagesEditor currentImages={currentImages} setCurrentImages={setCurrentImages} />

            <ImageUploader
                deleteImageUpload={deleteImageUpload}
                handleImageUpload={handleImageUpload}
                imagePreview={imagePreview}
                uploadedFiles={uploadedFiles}
                className={"flex-1 min-h-96"}
            />
            <div className="my-4">
                <div className="flex flex-row justify-between p-4">
                    <Button success rounded onClick={tryHandleUpdateFormSubmit}>
                        Confirmar cambios
                    </Button>
                    <Button danger rounded onClick={() => {
                        handleDeleteProductById(props.productId).then(() => {
                            setModalContent(() => {
                                return <div>
                                    Producto eliminado correctamente actuliza la pagina
                                </div>
                            })
                        }).catch(
                            () => {
                                setModalContent(() => {
                                    return <div> Ha ocurrido un error eliminando el producto
                                    </div>
                                })
                            }
                        ).finally(() => {
                            setIsModalOpen(true);
                        })
                    }}  >🗑️ Eliminar producto</Button>

                </div>

            </div>
            <Modal onClose={() => {
                setIsModalOpen(false)
            }} isOpen={isModalOpen}  >{modalContent}</Modal>
        </div>
    );
}




export default EditProductForm;