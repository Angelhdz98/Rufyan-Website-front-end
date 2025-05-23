import FormInput from "../../components/FormInput";
import CheckFormInput from "../../components/CheckFormInput";
import Button from "../../components/Button";
import { useDispatch } from "react-redux";
import {  addImage, AppDispatch, RootState, updateForm } from "../../store";
import { addPainting } from "../../store/thunks/addPainting";
import { useSelector } from "react-redux";
import { FaTrashAlt } from "react-icons/fa";
import { deleteImage } from "../../store/slices/formPaintingSlice";
import { ImageProduct } from "../../types/typesIndex";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import FormApiSelect from "../../components/FormApiSelect";
import { Form } from "react-router-dom";
import { useState } from "react";
import { ImageUploader } from "../../components/ImageUploader";


export interface PaintingFormProps {
    
  name: string;
  price: number;
  description: string;
  category: 
  {
    id: number,
    category: string;
  }
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
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  
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
    //form.append('original_available',formData.original_available.valueOf().toString());
    form.append('name',formData.name);
    form.append('description',formData.description);
    form.append('price',formData.price.toString());
    form.append('favorite',formData.favorite.valueOf().toString());
    form.append('category',formData.category.toString()); // prueba ambas opciones 
    //form.append('category',"paintings");
    formData.image.forEach((image) =>{
        form.append("image", image);
    })

    console.log (form); 
    
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
    e.preventDefault();
    const files = e.target.files;
    if (files && files.length === 0) {
 const selectedFiles = Array.from(files);


      
     

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

        //dispatch(updateForm({...formData, "image":[...formData.image,files]}))
     dispatch(addImage(selectedFiles));

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

    
    };

    const handleOptionSelect = (e: React.ChangeEvent<HTMLSelectElement>) =>{
      e.preventDefault();
      const {name, value} = e.target;
      //console.log("name: ",name, " value: ", value);

      dispatch(updateForm({...formData, [name]:value}));

      //console.log("formData: ", formData);
    };

    const deleteImageUpload = (value:string|number) =>{

      if(typeof value === "number"){

        setUploadedFiles((prev)=>{
            return prev.filter((item,index )=> index!== value );
        });
        setImagePreview((prev)=>{
            return prev.filter((item, index)=> index!==value)
        });
    }else{
        //delete by name 
         dispatch(deleteImage(value));
      

    }
     
    }
  

  
    const renderedImages = formData.image.map((img: File, index)=>{
            if(img != null && img instanceof File ){  
        return <div className="relative" key={index}>
            <img className="h-full w-full object-cover" src={URL.createObjectURL(img)} key={index} alt="" />
            <div className="flex h-full w-full opacity-0 hover:opacity-85 absolute left-0 top-0 bg-slate-300 place-content-center items-center ">
            <FaTrashAlt className="text-3xl" onClick={()=>deleteImageUpload(img.name)} />
              </div>
            </div>
      }
      else  {
        const imageProduct = img as ImageProduct;

        return <div className="relative w-full h-full object-cover" key={index} >
            <div className="flex justify-center items-center absolute top-0 left-0 w-full z-10 bg-green-600 opacity-75">
            <FaCloudUploadAlt className="text-xl" /><FaRegCheckCircle />
            </div>
           <img className="object-cover h-full w-full" src={`http://localhost:8080${imageProduct.url}`} alt="" />          
        </div>
      }
      
    })


  /*
  const  renderedImages = formData.previewImages?.map((previewImg, index)=>{

    return <div className="relative">
            <img className="h-full w-full object-cover" src={previewImg} key={index} alt="" />
            <div className="flex h-full w-full opacity-0 hover:opacity-85 absolute left-0 top-0 bg-slate-300 place-content-center items-center ">
            <FaTrashAlt className="text-3xl" onClick={()=>deleteImageUpload(previewImg.)} />
              </div>
            </div>
  })
            */

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
        value={formData.category.category}
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


          <FormApiSelect  field={"category"} 
                          label={"Categoría"} 
                          apiEndpoint={"https://catfact.ninja/facts"} 
                           onChange={ handleOptionSelect} 
                           value={formData.category.category}
                           onOptionSelect={handleOptionSelect}
                           />

                          



    </div>

    <div className="rightColumn flex flex-col w-1/2">
      <FormInput type={"text"} name={"support_material"}
        value={formData.support_material}
        onChange={handleChange}>
        Material de soporte
      </FormInput>

  {/*    <FormApiSelect 
                field="support_material" 
                label={"Material de soporte"}
                apiEndpoint={"https://catfact.ninja/facts"}
                onChange={handleOptionSelect} >
                Material de soporte
      </FormApiSelect>
*/
}
      <FormInput type={"text"} name={"medium"}
        value={formData.medium}
        onChange={handleChange}>
        Medio
      </FormInput>
      {/**
             * Faltan las imagenes
             */}
      {/* <div className="h-[500px]">
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
                 {<Button primary rounded onClick={handleImageUpload}>+Imagen</Button>
            
          }
                
            </div>
            

            <div className="p-4 border border-gray-300 rounded-md h-5/6 ">
          
          <div className="grid grid-cols-3 gap-2 mb-4 h-full overflow-scroll">
           {renderedImages}  
             
          </div>
          
        </div>
        
        </div> */}
       
      
        
       {/*<Button rounded primary className="w-fit  place-self-end  " >Add painting</Button>*/}
       <ImageUploader  handleImageUpload={handleImageUpload} deleteImageUpload={deleteImageUpload} imagePreview={imagePreview} uploadedFiles={uploadedFiles} className={" my-2"} />
    </div>

  </div>
       
  </form>
}

export default AddPaintingForm;






