

import { useEffect, useState } from "react";
import Button from "../../components/Button";
import { ImageUploader } from "../../components/ImageUploader";
import ProductSpecsForm from "./ProductSpecsForm";
import { useProductForm } from "./useProducForm";
import Modal from "../../components/Modal";
import { Product } from "../../types/typesIndex";

function AddProductForm() {




    const { handleChange, toggleIsFavorite, handleProductTypeChange,
        handleDetailsChange, handleStockChanging, handlePriceChanging,
        productTypeEnum, commonData, handleAddFormSubmit, handleImageUpload,
        deleteImageUpload, imagePreview, uploadedFiles } = useProductForm();
    useEffect(() => {
        console.log("uploadedFiles actualizado:", uploadedFiles);

    }, [uploadedFiles]);

    const [submitResponse, setSubmitResponse] = useState<Product | string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleResponseSubmit = async () => {
        try {
            setIsError(false);
            setSubmitResponse(null);
            const result = await handleAddFormSubmit();
            setSubmitResponse(result);
            setIsModalOpen(true);
        } catch (error) {
            setIsError(true);
            const errorMessage = error instanceof Error ? error.message : "Error desconocido al crear el producto";
            setSubmitResponse(errorMessage);
            setIsModalOpen(true);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSubmitResponse(null);
        setIsError(false);
    };

    return <div className="">

        <ProductSpecsForm productSpecs={commonData} productTypeEnum={productTypeEnum} handleProductTypeChange={handleProductTypeChange} handleChange={handleChange} toggleIsFavorite={toggleIsFavorite} handleStockChanging={handleStockChanging} handleDetailsChange={handleDetailsChange} handlePriceChanging={handlePriceChanging} />

        <ImageUploader deleteImageUpload={deleteImageUpload}
            handleImageUpload={handleImageUpload}
            imagePreview={imagePreview}
            uploadedFiles={uploadedFiles}
            className={"flex min-h-96 p-4"} />
        <div className="my-4">
            {/*() => {
                console.log("uploadedFiles en addProductForm:" + uploadedFiles);
                handleAddFormSubmit()
            }*/}
            <Button success rounded onClick={handleResponseSubmit}  >Subir producto</Button>
        </div>

        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
            <div className="p-6 rounded-lg bg-white shadow-lg max-w-md">
                {isError ? (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-red-600">❌ Error en la petición</h2>
                        <p className="text-gray-700 text-base">{submitResponse as string}</p>
                        <button
                            onClick={handleCloseModal}
                            className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                        >
                            Cerrar
                        </button>
                    </div>
                ) : submitResponse ? (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-green-600">✅ Producto creado exitosamente</h2>
                        <div className="bg-gray-50 p-4 rounded-md space-y-2 max-h-96 overflow-y-auto">
                            <p className="text-sm text-gray-600">
                                <strong>Nombre:</strong> {typeof submitResponse === 'string' ? 'N/A' : submitResponse.name}
                            </p>
                            <p className="text-sm text-gray-600">
                                <strong>ID:</strong> {typeof submitResponse === 'string' ? 'N/A' : submitResponse.id}
                            </p>
                            <p className="text-sm text-gray-600">
                                <strong>Descripción:</strong> {typeof submitResponse === 'string' ? 'N/A' : submitResponse.description}
                            </p>
                            <p className="text-sm text-gray-600">
                                <strong>Tipo de producto:</strong> {typeof submitResponse === 'string' ? 'N/A' : submitResponse.productTypeEnum}
                            </p>
                        </div>
                        <button
                            onClick={handleCloseModal}
                            className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                        >
                            Aceptar
                        </button>
                    </div>
                ) : null}
            </div>
        </Modal>

    </div>

}

export default AddProductForm;