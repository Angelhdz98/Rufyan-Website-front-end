import { useEffect, useState } from "react";
import FormInput from "../../components/FormInput";
import { BodyClotheTypeEnum, BodyClothingDomainDetails, ClothingMaterial, MediumEnum, PaintingDomainDetails, PrintingTechniqueEnum, ProductDomainDetails, ProductTypeEnum, SupportMaterialEnum } from "../../types/typesIndex";
import { fromLocalDateString } from "./dateMapper";

interface ProductDomainDetailsFormProps extends React.HTMLAttributes<HTMLDivElement> {
    productTypeEnum: ProductTypeEnum;
    onDetailsChange: (details: ProductDomainDetails) => void;
    productDetails?: ProductDomainDetails
};

function ProductDomainDetailsForm(props: ProductDomainDetailsFormProps) {
    const [currentDetails, setCurrentDetails] = useState<ProductDomainDetails | undefined>(props.productDetails);





    // Sincronizar clothingDetails cuando cambia el productTypeEnum
    useEffect(() => {
        if (props.productDetails) {
            setCurrentDetails(props.productDetails);
        }
    }, [props.productDetails,]);


    // Mapear enums a valores legibles
    const mediumOptions = Object.keys(MediumEnum).filter(key => isNaN(Number(key)));
    const supportMaterialOptions = Object.keys(SupportMaterialEnum).filter(key => isNaN(Number(key)));
    const clothingMaterialOptions = Object.keys(ClothingMaterial).filter(key => isNaN(Number(key)));
    const clothingTypeOptions = Object.keys(BodyClotheTypeEnum).filter(key => isNaN(Number(key)));
    const printingTechniqueOptions = Object.keys(PrintingTechniqueEnum).filter(key => isNaN(Number(key)));

    const renderPaintingForm = () => {

        const details = currentDetails as PaintingDomainDetails || {
            alturaCm: 30,
            largoCm: 20,
            creationDate: new Date(),
            medium: MediumEnum.ACRYLYC_PAINT
        };

        const handlePaintingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            const { name, value, type } = e.target;
            let parsedValue: number | boolean | Date | string = value;
            if (type === "number") {
                parsedValue = parseInt(value);
            } else if (type === "date") {
                const paintingDetails = props.productDetails as PaintingDomainDetails;
                const possibleDate = new Date(value);
                // Validar si la fecha es válida
                if (!isNaN(possibleDate.getTime())) {
                    parsedValue = possibleDate;
                } else {
                    // Si la fecha no es válida, mantener la fecha anterior
                    parsedValue = paintingDetails.creationDate;
                }
            } else if (type === "checkbox") {
                parsedValue = (e.target as HTMLInputElement).checked;
            }

            const updatedDetails = { ...currentDetails, [name]: parsedValue } as PaintingDomainDetails;
            setCurrentDetails(updatedDetails);
            props.onDetailsChange(updatedDetails);
            console.log("cambio en details: " + JSON.stringify(updatedDetails));
        };

        const processorDay = () => {
            if (props !== undefined && props.productDetails?.productTypeEnum == ProductTypeEnum.PAINTING) {
                return props.productDetails.creationDate instanceof Date
                    ? props.productDetails.creationDate.toISOString().split("T")[0]
                    : "";
            }
            else {
                return "";
            }

        }



        const processedDay: string = processorDay();


        return <div className="flex flex-col gap-4 p-4 border border-gray-300 rounded-lg">
            <h3 className="font-semibold text-lg">Painting Details</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <FormInput
                    type="number"
                    name="largoCm"
                    value={details.largoCm.toString()}
                    onChange={handlePaintingChange}
                >
                    Largo (cm)
                </FormInput>

                <FormInput
                    type="number"
                    name="alturaCm"
                    value={details.alturaCm.toString()}
                    onChange={handlePaintingChange}
                >
                    Altura (cm)
                </FormInput>

                <div className="flex flex-col gap-2">
                    <label className="font-medium">Medium</label>
                    <select
                        name="medium"
                        value={details.medium}
                        onChange={handlePaintingChange}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {mediumOptions.map((key) => (
                            <option key={key} value={key}>
                                {key.replace(/_/g, " ")}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-medium">Support Material</label>
                    <select
                        name="supportMaterial"
                        value={details.supportMaterial}
                        onChange={handlePaintingChange}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {supportMaterialOptions.map((key) => (
                            <option key={key} value={key}>
                                {key.replace(/_/g, " ")}
                            </option>
                        ))}
                    </select>
                </div>

                <FormInput
                    type="date"
                    name="creationDate"
                    value={processedDay
                    }
                    onChange={handlePaintingChange}
                >
                    Creation Date
                </FormInput>
            </div>
        </div>
    };

    const renderClothingForm = () => {
        const clothingDetails = currentDetails as BodyClothingDomainDetails || { material: ClothingMaterial.COTTON, printingTechnique: PrintingTechniqueEnum.SERIGRAPHY, productTypeEnum: ProductTypeEnum.CLOTHING, type: BodyClotheTypeEnum.T_SHIRT };
        const handleClothingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            const { name, value, type } = e.target;
            let parsedValue: number | boolean | Date | string = value;
            if (type === "number") {
                parsedValue = parseInt(value);
            } else if (type === "date") {
                parsedValue = new Date(value);
            } else if (type === "checkbox") {
                parsedValue = (e.target as HTMLInputElement).checked;
            }

            const updatedDetails = { ...clothingDetails, [name]: parsedValue };
            setCurrentDetails(updatedDetails);
            props.onDetailsChange(updatedDetails);
            console.log("cambio en details: " + JSON.stringify(updatedDetails));
        };
        return <div className="flex flex-col gap-4 p-4 border border-gray-300 rounded-lg">
            <h3 className="font-semibold text-lg">Clothing Details</h3>

            <div className="flex flex-col gap-2">
                <label className="font-medium">Material</label>
                <select
                    name="material"
                    value={clothingDetails.material}
                    onChange={handleClothingChange}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {clothingMaterialOptions.map((key) => (
                        <option key={key} value={key}>
                            {key.replace(/_/g, " ")}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-2">
                <label className="font-medium">Type</label>
                <select
                    name="type"
                    value={clothingDetails.type}
                    onChange={handleClothingChange}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {clothingTypeOptions.map((key) => (
                        <option key={key} value={key}>
                            {key.replace(/_/g, " ")}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-2">
                <label className="font-medium">Printing Technique</label>
                <select
                    name="printingTechnique"
                    value={clothingDetails.printingTechnique}
                    onChange={handleClothingChange}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {printingTechniqueOptions.map((key) => (
                        <option key={key} value={key}>
                            {key.replace(/_/g, " ")}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    };

    const renderPrintForm = () => {
        return <div className="p-4 border border-gray-300 rounded-lg">Print Form details</div>;
    };

    const renderSingleForm = () => {
        return <div className="p-4 border border-gray-300 rounded-lg bg-gray-50">
            <p className="text-gray-600">No additional details required for Single products</p>
        </div>;
    };

    const getRenderForm = (): JSX.Element => {
        switch (props.productTypeEnum) {
            case ProductTypeEnum.PAINTING:
                return renderPaintingForm();
            case ProductTypeEnum.CLOTHING:
                return renderClothingForm();
            case ProductTypeEnum.PRINT:
                return renderPrintForm();
            case ProductTypeEnum.SINGLE:
                return renderSingleForm();
            default:
                return <div>Unknown product type</div>;
        }
    };

    return <div className="w-full\">{getRenderForm()}</div>;
}

export default ProductDomainDetailsForm;