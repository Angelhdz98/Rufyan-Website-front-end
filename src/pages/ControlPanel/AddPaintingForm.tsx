import FormInput from "../../components/FormInput";
import { ImageProduct } from "../../types/typesIndex";
import { useState } from "react";
import ImageUploader from "./ImageUploader";
import CheckFormInput from "../../components/CheckFormInput";
import Button from "../../components/Button";
import { useDispatch } from "react-redux";
import {  addImage, AppDispatch, RootState, updateForm } from "../../store";
import { addPainting } from "../../store/thunks/addPainting";
import { useSelector } from "react-redux";
import { convertBlobToBase64 } from "../../store/thunks/convertBlobToBase64";


export interface PaintingFormProps {
    
  name: string;
  price: number;
  description: string;
  category: string;
  altura_cm: number;
  largo_cm: number;
  available_copies: number;
  copies_made: number;
  price_copy: number;
  original_available: boolean;
  favorite: boolean;
  support_material: string;
  medium: string;
  image: File[];
  previewImages: string[];
};


export interface formDataInterfacePainting {

  data: {
    name: string;
    price: number;
    description: string;
    category: string;
    altura_cm: number;
    largo_cm: number;
    available_copies: number;
    copies_made: number;
    price_copy: number;
    original_available: boolean;
    favorite: boolean;
    support_material: string;
    medium: string;
    image: File[];
    previewImages: string[];
  }
}

//import type { Painting } from "../../types/typesIndex";
function AddPaintingForm() {
  
  const dispatch = useDispatch<AppDispatch>();
  const formData= useSelector((state: RootState)=>{
    return state.formPainting.data 
  } );
  
  
  const addProductHandler = (event: React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault();

    const form = new FormData();
    form.append('altura_cm',formData.altura_cm.toString());
    form.append('largo_cm',formData.largo_cm.toString());
    form.append('medium',formData.medium);
    form.append('support_material',formData.support_material);
    form.append('available_copies',formData.available_copies.toString());
    form.append('copies_made',formData.copies_made.toString());
    form.append('price_copy',formData.price_copy.toString());
    form.append('original_available',formData.original_available.valueOf().toString());
    form.append('name',formData.name);
    form.append('description',formData.description);
    form.append('price',formData.price.toString());
    form.append('favorite',formData.favorite.valueOf().toString());
    form.append('category',formData.category);
    formData.image.forEach((image) =>{
        form.append("image", image);
    })

    
    console.log(form);
    dispatch(addPainting(form));
    

  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    dispatch(updateForm({...formData, [name]:value}));
  };
  const toggleValueHandler = (field: keyof PaintingFormProps) => {
    dispatch(updateForm({ ...formData, [field]: !formData[field] }));
  };

  const handleImageUpload =  (e: React.ChangeEvent<HTMLInputElement>) =>{
    const files = e.target.files;
    if (files){
      const selectedFiles = Array.from(files);
      dispatch(addImage(selectedFiles));
        //dispatch(updateForm({...formData, "image":[...formData.image,files]}))
      }  

    
    };
  
    
  
  
  const  renderedImages = formData.previewImages?.map((previewImg, index)=>{

    return <img src={previewImg} key={index} alt="" />
  })

/*  const handleImageUpload = (uploadedImages: string[]) => {


    setFormData((prevState) => ({
      ...prevState,
      data: {...prevState.data, ["image"]:  uploadedImages  }
    }));
  };
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
  const toggleValueHandler = (field: "original_available" | "favorite") => {

    setFormData((prevState) => ({
      ...prevState,
      data: {
        ...prevState.data,
        [field]: !prevState.data[field],
      },
    }));

  };


  const [formData, setFormData] = useState<formDataInterfacePainting>({
    data: {
      name: '',
      price: 1000,
      description: '',
      category: '',
      altura_cm: 40,
      largo_cm: 30,
      available_copies: 12,
      copies_made: 15,
      price_copy: 300,
      original_available: true,
      favorite: false,
      support_material: '',
      medium: '',
      image: [],
    }
  });
  */
 

  const stringOriginalAvailable = formData.original_available ? "true" : "false";
  const stringFavorite = formData.favorite ? "true" : "false";
  return <form onSubmit={addProductHandler} className="flex flex-col m-6 " encType="multipart/form-data">
    <div className="flex flex-row flex-gow  gap-6">
    <div className="leftColumn flex flex-col w-1/2 ">
      <FormInput type={"text"} name={"name"}
        value={formData.name}
        onChange={handleChange}>
        Titulo
      </FormInput>

      <FormInput type={"number"} name={"price"}
        value={formData.price.toString()}
        onChange={handleChange}>
        Precio original
      </FormInput>

      <FormInput type={"text"} name={"description"}
        value={formData.description}
        onChange={handleChange}>
        Descripción
      </FormInput>

      <FormInput type={"text"} name={"category"}
        value={formData.category}
        onChange={handleChange}>
        Estilo
      </FormInput>
      <div className="flex flex-row">
        <div className="flex flex-col w-1/2">
          <FormInput type={"number"} name={"altura_cm"}
            value={formData.altura_cm.toString()}
            onChange={handleChange}>
            Alto
          </FormInput>
        </div>


        <div className="flex flex-col w-1/2">
          <FormInput type={"number"} name={"largo_cm"}
            value={formData.largo_cm.toString()}
            onChange={handleChange}>
            Ancho
          </FormInput>
        </div>

      </div>

      <div className="flex flex-row">
        <div className="flex flex-col w-1/2">
          <FormInput type={"number"} name={"available_copies"}
            value={formData.available_copies.toString()}
            onChange={handleChange}>
            Copias disponibles
          </FormInput></div>

        <div className="flex flex-col w-1/2"><FormInput type={"number"} 
          name={"copies_made"}
          value={formData.copies_made.toString()}
          onChange={handleChange}>
          Copias realizadas
        </FormInput>
        </div>
      </div>

      <div className="flex flex-row">
        <div className="w-4/5">
          <FormInput type={"number"} name={"price_copy"}
            value={formData.price_copy.toString()}
            onChange={handleChange}>
            Precio por copia
          </FormInput>
        </div>

        <div className="flex flex-col items-center w-full ">

          <div className="flex flex-row w-4/5 items-center">

            <CheckFormInput type={"checkbox"} name={"original_available"}
              checked={formData.original_available}
              value={stringOriginalAvailable}
              onChange={() => toggleValueHandler("original_available")}
              labelClassname="w-full"
            >
              Original disponible
            </CheckFormInput>

          </div>
          <div className="flex flex-row w-4/5 items-center">
            <CheckFormInput type={"checkbox"} name={"favorite"}
              checked={formData.favorite}
              value={stringFavorite}

              onChange={() => toggleValueHandler("favorite")}
              labelClassname="w-full"
            >
              Favorita(o)
            </CheckFormInput>
          </div>

        </div>
      </div>






    </div>

    <div className="rightColumn flex flex-col w-1/2">
      <FormInput type={"text"} name={"support_material"}
        value={formData.support_material}
        onChange={handleChange}>
        Material de soporte
      </FormInput>

      <FormInput type={"text"} name={"medium"}
        value={formData.medium}
        onChange={handleChange}>
        Medio
      </FormInput>
      {/**
             * Faltan las imagenes
             */}
       <div className="h-[500px]">
            <div className="flex flex-row items-center justify-between ">
                <label className="block my-2">
                Imágenes
                </label>
                <div className="flex justify-center">
            <label className="cursor-pointer flex items-center justify-center px-4  border-[#C04D2A] bg-[#EBAF9D]/[.70] text-[#8B351C] font-bold rounded-lg hover:bg-gray-300">
              + Imagen
              <input
                type="file"
                name="image"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
                 {/*<Button primary rounded onClick={handleImageUpload}>+Imagen</Button>
            
          */}
                
            </div>
            

            <div className="p-4 border border-gray-300 rounded-md h-5/6 ">
          
          <div className="grid grid-cols-3 gap-2 mb-4 h-full overflow-scroll">
           {renderedImages}  
             
          </div>
          
        </div>
        
        </div> 
       
      
        
       <Button rounded primary className="w-fit  place-self-end  " >Add painting</Button>
    </div>

  </div>
       
  </form>
}

export default AddPaintingForm;






