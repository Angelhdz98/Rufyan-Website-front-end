import FormInput from "../../components/FormInput";
import { Image } from "../../types/typesIndex";
import { useState } from "react";
import ImageUploader from "./ImageUploader";
import CheckFormInput from "../../components/CheckFormInput";
/*
interface PaintingFormProps {
    title: string,
    priceOriginal: number,
    description: string,
    style: string,
    height: number,
    width: number,
    copiesAvailable: number,
    priceCopy: number,
    originalAvailable: boolean,
    favorite: boolean,
    supportMaterial: string,
    medium: string,
    images: Image []};

*/
interface formDataInterface {
  data:{
    title: string;
    priceOriginal: number;
    description: string;
    style: string;
    height: number;
    width: number;
    copiesAvailable: number;
    copiesMade: number;
    priceCopy: number;
    originalAvailable: boolean;
    favorite: boolean;
    supportMaterial: string;
    medium: string;
    images: Image[],
  }
}
//import type { Painting } from "../../types/typesIndex";
function AddPaintingForm(){

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
          ...prevState,
          data: {
            ...prevState.data,
            [name]: value,
          },
        }));
      };
      const toggleValueHandler = (field: "originalAvailable" | "favorite")=>{
        
        setFormData((prevState)=>({
          ...prevState,
          data:{
            ...prevState.data,
            [field]: !prevState.data[field],
          },
        }));

      };

    const [formData, setFormData] = useState<formDataInterface>({
        data :{
          title: '',
          priceOriginal:1000,
          description: '',
          style: '',
          height:40,
          width: 30,
          copiesAvailable: 12,
          copiesMade: 15,
          priceCopy: 300,
          originalAvailable: true,
          favorite: false,
          supportMaterial: '',
          medium: '',
          images: [],
    }
    });
const stringOriginalAvailable= formData.data.originalAvailable ? "true":"false"; 
const stringFavorite= formData.data.favorite ? "true":"false";
    return <div className="flex flex-row flex-gow">
        <div className="leftColumn flex flex-col w-1/2">
            <FormInput type={"text"} name={"title"} 
            value={formData.data.title} 
            onChange={handleChange}>
            Titulo
            </FormInput>    

            <FormInput type={"number"} name={"priceOriginal"} 
            value={formData.data.priceOriginal.toString()} 
            onChange={handleChange}>
            Precio original
            </FormInput>

            <FormInput type={"text"} name={"description"} 
            value={formData.data.description} 
            onChange={handleChange}>
            Descripción
            </FormInput>

            <FormInput type={"text"} name={"style"} 
            value={formData.data.style} 
            onChange={handleChange}>
            Estilo
            </FormInput>
            <div className="flex flex-row">
                <div className="flex flex-col w-1/2">
                  <FormInput type={"number"} name={"height"} 
                    value={formData.data.height.toString()} 
                    onChange={handleChange}>
                    Alto
                    </FormInput>
                </div>
                

            <div className="flex flex-col w-1/2">
                <FormInput type={"number"} name={"width"} 
            value={formData.data.width.toString()} 
            onChange={handleChange}>
            Ancho
            </FormInput>
            </div>
            
            </div>

            <div className="flex flex-row">
            <div className="flex flex-col w-1/2">
            <FormInput type={"number"} name={"copiesAvailable"} 
            value={formData.data.copiesAvailable.toString()} 
            onChange={handleChange}>
            Copias disponibles
            </FormInput></div>

            <div className="flex flex-col w-1/2"><FormInput type={"number"} name={"copiesMade"} 
            value={formData.data.copiesMade.toString()} 
            onChange={handleChange}>
            Copias realizadas
            </FormInput>
            </div>
            </div>
            
            <div className="flex flex-row">
               <div className="w-4/5">
            <FormInput type={"number"} name={"priceCopy"} 
            value={formData.data.priceCopy.toString()} 
            onChange={handleChange}>
            Precio por copia
            </FormInput>
            </div>

            <div className="flex flex-col items-center w-full ">
              
            <div className="flex flex-row w-4/5 items-center">
            
            <CheckFormInput type={"checkbox"} name={"originalAvailable"} 
            checked={ formData.data.originalAvailable} 
            value={stringOriginalAvailable }
            onClick={() =>toggleValueHandler("originalAvailable")}
            labelClassname="w-full"
            >
            Original disponible
            </CheckFormInput>

            </div>
            <div className="flex flex-row w-4/5 items-center">
              <CheckFormInput type={"checkbox"} name={"favorite"} 
            checked={formData.data.favorite}
            value={stringFavorite} 
          
            onClick={() =>toggleValueHandler("favorite")}
            labelClassname="w-full"
            >
            Favorita(o)
            </CheckFormInput>
            </div>
            
            </div>
            </div>
           
           
        
            
            

        </div>
       
        <div className="rightColumn flex flex-col w-1/2">
 <FormInput type={"text"} name={"supportMaterial"} 
            value={formData.data.supportMaterial} 
            onChange={handleChange}>
            Material de soporte
            </FormInput>

            <FormInput type={"text"} name={"medium"} 
            value={formData.data.medium} 
            onChange={handleChange}>
            Medio
            </FormInput>
            {/**
             * Faltan las imagenes
             */}
             <ImageUploader/>
        </div>
        
    </div>
}

export default AddPaintingForm;