import { useState } from "react";
import FormInput from "../../components/FormInput";
import { BodyClotheTypeEnum, BodyClothingDomainDetails, ClothingMaterial, CreateProductCommand, MediumEnum, PaintingDomainDetails, PaintingPricing, PaintingStock, PricingTypeEnum, PrintingTechniqueEnum, ProductDomainDetails, ProductPricing, ProductSpecs, ProductStock, ProductTypeEnum, SupportMaterialEnum } from "../../types/typesIndex";

import Button from "../../components/Button";
import CheckFormInput from "../../components/CheckFormInput";
import { ImageUploader } from "../../components/ImageUploader";
import { useImageUpload } from "../../hooks/useImageUpload";
import ProductDomainDetailsForm from "./ProductDomainDetailsForm";
import ProductPricingForm from "./ProductPricingForm";
import ProductStockForm from "./ProductStockForm";

/*import image1 from "../../../public/assets/Images/imgObras/obra1.jpg"
import image2 from "../../../public/assets/Images/imgObras/obra2.jpg"
import image3 from "../../../public/assets/Images/imgObras/obra3.jpg"
import styled from "styled-components";
*/
function AddProductForm() {
    const { handleImageUpload, deleteImageUpload, imagePreview, uploadedFiles } = useImageUpload();

    const [productTypeEnum, setProductTypeEnum] = useState<ProductTypeEnum>(ProductTypeEnum.PAINTING)
    const productPricing: PricingTypeEnum = productTypeEnum === ProductTypeEnum.PAINTING ? PricingTypeEnum.ORIGINAL : PricingTypeEnum.SINGLE;

    const handleProductchange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
    const typeSelector = () => {
        return (
            <div className="flex flex-col w-fit">
                <label htmlFor="productType" className="mb-2 font-medium">
                    Product Type
                </label>
                <select
                    id="productType"
                    value={productTypeEnum.toString()}
                    onChange={handleProductchange}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value={ProductTypeEnum.PAINTING}>Painting</option>
                    <option value={ProductTypeEnum.CLOTHING}>Body Clothing</option>
                    <option value={ProductTypeEnum.SINGLE}>Single</option>
                </select>
            </div>
        );
    }
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

    const handleFormSubmit = async () => {
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
                const adaptedDated = command.productDetails.creationDate.toISOString().split("T")[0];
                const paintingDetailsCommand = { ...command.productDetails, creationDate: adaptedDated };

                const newCommand = { ...command, productDomainDetails: paintingDetailsCommand };
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

    return <div>
        <FormInput
            type={"text"} name="name"
            value={commonData.name} onChange={handleChange}
            className=" w-min "  >
            Name
        </FormInput>
        <FormInput
            type={"text"} name="description"
            value={commonData.description} onChange={handleChange}
            className=" w-min "  >
            Description
        </FormInput>

        <CheckFormInput
            type={"checkbox"} name="isFavorite"
            value={commonData.isFavorite ? "true" : "false"}
            onChange={toggleIsFavorite}
            className=" w-full " checked={commonData.isFavorite}   >
            Obra favorita
        </CheckFormInput>

        <ImageUploader deleteImageUpload={deleteImageUpload}
            handleImageUpload={handleImageUpload}
            imagePreview={imagePreview}
            uploadedFiles={uploadedFiles}
            className={"flex-1 min-h-96"} />

        {typeSelector()}

        <h2> Stock</h2>
        <ProductStockForm handleStockChange={handleStockChanging} productType={productTypeEnum} />

        <span>Details</span>
        <ProductDomainDetailsForm onDetailsChange={handleDetailsChange} productTypeEnum={productTypeEnum} />



        <span>Pricing</span>
        <ProductPricingForm pricingType={productPricing} onChangePrice={handlePriceChanging} />
        <div className="my-4">
            <Button success rounded onClick={handleFormSubmit} >Subir producto</Button>
        </div>

    </div>

    /*
     const [formData, setFormData] =  useState<Product>({id:0, name:"", 
     description:"", productDomainDetails, productPricing,productStock,productTypeEnum, ,  favorite:false, 
         creation_date:"", userId:0, images:[], available:true});
 
     const [uploadedFiles, setUploadedFiles] = useState<File[] >([]);
     const [imagePreview, setImagePreview] = useState<string[]>([]);
 
     const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
         const {name, value} = e.target;
 
         setFormData((prev)=>{
             return {...prev, [name]:value}
         })
         
     }
     const toggleValueHandler =(field: keyof Product)=>{
         setFormData((prev)=>{
             return {...prev, [field]:!prev[field]}
         })
 
     }
     const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>)=>{
         e.preventDefault();    
             if (!e.target.files || e.target.files.length===0) {
                 return
             }
             
         
             const selectedFiles = Array.from(e.target.files);
 
             //verification for size and file type 
             selectedFiles.forEach((file)=>{
                 
                 if (!file.type.match("image.*")){
                     alert("Por favor, selecciona un archivo de imagen valido");
                 }
                 if(file.size>2*1024*1024){
                     alert("La imagen no debe superar los 2 MB");
                     return;
                 }
             })  
             
             setUploadedFiles(selectedFiles);
 
 
             const readers= selectedFiles.map((file)=>{
                 return new Promise<string>((resolve,reject)=>{
                     const reader = new FileReader();
 
                     reader.onload =()=>{
                         if(typeof reader.result === "string"){
                             resolve(reader.result);
                         }
                     };
                     reader.onerror = () => reject(reader.error);
                     reader.readAsDataURL(file);
                 
 
                 })
             });
 
             Promise.all(readers).then(results=>{
                 setImagePreview([...imagePreview,...results]);
             })
 
  
 
             setUploadedFiles((prev)=>{
                 return [...prev, ...selectedFiles]
             })
     
         
         
     }
     const deleteImageUpload = (value:number| string)=>{
 if(typeof value === "number"){
 
         setUploadedFiles((prev)=>{
             return prev.filter((_,index )=> index!== value );
         });
         setImagePreview((prev)=>{
             return prev.filter((_, index)=> index!==value)
         });
     }else{
         //delete by name
     }    }
 
 
 
     return <div className="flex flex-col h-full p-4">
         <span>Add a product</span>
         <hr />
         <div className="flex flex-col md:flex-row justify-between flex-1 min-h-0 gap-4 my-2">
   <div className="flex flex-col w-full md:w-1/2  h-full overflow-auto">
  <FormInput type={"text"} name={"name"}
         value={formData.name}
         onChange={handleChange}>
         Título
       </FormInput>
       <FormInput type={"text"} name={"description"}
         value={formData.description}
         onChange={handleChange}>
         Descripción
       </FormInput>
       <FormInput type={"number"} name={"price"}
         value={formData.price.toString()}
         onChange={handleChange}>
         Precio
       </FormInput>
       <FormInput type={"text"} name={"creation_date"}
         value={formData.creation_date}
         onChange={handleChange}>
         Fecha de creación
       </FormInput>
       <CheckFormInput type={"checkbox"} name={"favorite"}
               checked={formData.favorite}
               value={formData.favorite.toString()}
 
               onChange={() => toggleValueHandler("favorite")}
               labelClassname="w-full"
             >
               Favorita(o)
             </CheckFormInput>
        </div>
 
     <div className="flex flex-col w-full md:w-1/2 flex-1 min-h-0 ">
          <ImageUploader  deleteImageUpload={deleteImageUpload} handleImageUpload={handleImageUpload} imagePreview={imagePreview} uploadedFiles={uploadedFiles} className="  h-full "/>
              
 
     </div>
      
         </div>
 
      
        
         </div>
          
         */

}

export default AddProductForm;