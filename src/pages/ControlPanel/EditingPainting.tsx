import { HTMLAttributes,  useEffect,  useState } from "react";
import { Painting } from "../../types/typesIndex";
import FormInput from "../../components/FormInput";
import CheckFormInput from "../../components/CheckFormInput";

import Button from "../../components/Button";
import FormImage from "./FormImage";
import { useSelector } from "react-redux";
import { AppDispatch, deleteImagePainting, fetchPaintingById, RootState } from "../../store";
import { useDispatch } from "react-redux";
import { deleteStateImage, updateStatePainting } from "../../store/slices/singlePaintingSlice";


export interface EditingPaintingProps extends HTMLAttributes<HTMLDivElement> {
paintingId: number;
}

function EditingPainting({paintingId, ...rest}:EditingPaintingProps){
  const {data, isLoading, error} = useSelector((state: RootState)=> state.singlePainting);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(()=>{
    dispatch(fetchPaintingById(paintingId));    
  },[])
  
  //const [data, setdata ] = useState<Painting>(data);
    const [uploadedRenderedImages, setUploadedRenderedImages] = useState<string[]>([]);
     const[uploadedFiles, setUploadedFiles]= useState<File[]>([]);
  
    let renderedComponent= <div></div>;
   
        
  

    //const painting= data;

        

        

        //const [uploadedImages, setUploadedImages] = useState<File[]>([]);


  if(isLoading){
    renderedComponent=<div>Is Loading</div>;
    
  }
  else if(error){
    renderedComponent =<div>{error as string}</div>
  }
  else if(!isLoading && error==null){
    

    //const dispatch = useDispatch<AppDispatch>();

  //setdata(data);
  const handleImageUpload = (e:React.ChangeEvent<HTMLInputElement>) =>{
    e.preventDefault();
    const files = e.target.files;
    if(files){
      const selectedFiles = Array.from(files);
      //setUploadedImages(selectedFiles);

      const imageUrls = selectedFiles.map((file)=>{

        return URL.createObjectURL(file);
      });
      console.log("uploaded images: "+imageUrls );
      
          setUploadedRenderedImages(imageUrls);
          setUploadedFiles(selectedFiles);



    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const {name, value} = e.target;
  //dispatch(updateForm({...data, [name]:value}));
  dispatch(updateStatePainting({...data, [name]:value}))
};
const toggleValueHandler = (field: keyof Painting) => {
  //dispatch(updateForm({ ...data, [field]: !data[field] }));
  dispatch(updateStatePainting({ ...data, [field]: !data[field] }))
};

const updatePaintingHandler = (event: React.FormEvent<HTMLFormElement>)=>{
  event.preventDefault();
  const form = new FormData();
  form.append('altura_cm',data.altura_cm.toString());
  form.append('largo_cm',data.largo_cm.toString());
  form.append('medium',data.medium);
  form.append('support_material',data.support_material);
  form.append('available_copies',data.available_copies.toString());
  form.append('copies_made',data.copies_made.toString());
  form.append('price_copy',data.price_copy.toString());
  form.append('original_available',data.original_availability.valueOf().toString());
  form.append('name',data.name);
  form.append('description',data.description);
  form.append('price',data.price.toString());
  form.append('favorite',data.favorite.valueOf().toString());
  //form.append('category',formData.category.toString()); // prueba ambas opciones 
  form.append('category', data.category.name);
  /*

  data.image.forEach((singleimage) =>{
      form.append("image", singleimage.);
  })
      */

  uploadedFiles.forEach((image)=>{
    form.append('image', image);
  });

  
}

const deletePaintingImageHandler = (paintingId:number,imageId: number) =>{
  console.log("valores image id" + imageId, " paintingId: ", paintingId)
  //dispatch(deleteStateImage(imageId));
  dispatch(deleteImagePainting({paintingId, imageId}));

}

const renderedImages = data.image.map((singleImage)=>{
  return <FormImage img={singleImage} onClick={()=>deletePaintingImageHandler( data.id,singleImage.id)} key={singleImage.id}/> 
});

const renderedUploadedImages = uploadedRenderedImages.map((image)=>{
    return <img src={image} alt="" />
});


//const uploadedImages; 

const stringOriginalAvailable = data.original_availability ? "true" : "false";
const stringFavorite = data.favorite ? "true" : "false";
  

    renderedComponent= <form onSubmit={updatePaintingHandler} className={"flex flex-col m-6 "+ rest.className} encType="multipart/form-data">

   <div className="flex flex-col"> <div className="flex flex-row flex-gow  gap-6">
    <div className="leftColumn flex flex-col w-1/2 ">
      <FormInput type={"text"} name={"name"}
        value={data.name}
        onChange={handleChange}>
        Titulo
      </FormInput>

      <FormInput type={"number"} name={"price"}
        value={data.price.toString()}
        onChange={handleChange}>
        Precio original
      </FormInput>

      <FormInput type={"text"} name={"description"}
        value={data.description}
        onChange={handleChange}>
        Descripción
      </FormInput>

      <FormInput type={"text"} name={"category"}
        value={data.category.name}
        onChange={handleChange}>
        Estilo
      </FormInput>
      <div className="flex flex-row">
        <div className="flex flex-col w-1/2">
          <FormInput type={"number"} name={"altura_cm"}
            value={data.altura_cm.toString()}
            onChange={handleChange}>
            Alto
          </FormInput>
        </div>


        <div className="flex flex-col w-1/2">
          <FormInput type={"number"} name={"largo_cm"}
            value={data.largo_cm.toString()}
            onChange={handleChange}>
            Ancho
          </FormInput>
        </div>

      </div>

      <div className="flex flex-row">
        <div className="flex flex-col w-1/2">
          <FormInput type={"number"} name={"available_copies"}
            value={data.available_copies.toString()}
            onChange={handleChange}>
            Copias disponibles
          </FormInput></div>

        <div className="flex flex-col w-1/2"><FormInput type={"number"} 
          name={"copies_made"}
          value={data.copies_made.toString()}
          onChange={handleChange}>
          Copias realizadas
        </FormInput>
        </div>
      </div>

      <div className="flex flex-row">
        <div className="w-4/5">
          <FormInput type={"number"} name={"price_copy"}
            value={data.price_copy.toString()}
            onChange={handleChange}>
            Precio por copia
          </FormInput>
        </div>

        <div className="flex flex-col items-center w-full ">

          <div className="flex flex-row w-4/5 items-center">

            <CheckFormInput type={"checkbox"} name={"original_availability"}
              checked={data.original_availability}
              value={stringOriginalAvailable}
              onChange={() => toggleValueHandler("original_availability")}
              labelClassname="w-full"
            >
              Original disponible
            </CheckFormInput>

          </div>
          <div className="flex flex-row w-4/5 items-center">
            <CheckFormInput type={"checkbox"} name={"favorite"}
              checked={data.favorite}
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
        value={data.support_material}
        onChange={handleChange}>
        Material de soporte
      </FormInput>

      <FormInput type={"text"} name={"medium"}
        value={data.medium}
        onChange={handleChange}>
        Medio
      </FormInput>
      {/**
             * Faltan las imagenes
             */}
             <div className="flex flex-col gap-12"> 
              <div className="recuadro-imagenes-obra h-[120px]">
            <div className="flex flex-row items-center justify-between ">
                <label className="block my-2">
                Imágenes
                </label>
                {/*<div className="flex justify-center">
            <label className="cursor-pointer flex items-center justify-center px-4  border-[#C04D2A] bg-[#EBAF9D]/[.70] text-[#8B351C] font-bold rounded-lg hover:bg-gray-300">
              + Imagen
              <input
                type="file"
                name="image"
                multiple
                //onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div> */}
                 {/*<Button primary rounded onClick={handleImageUpload}>+Imagen</Button>
            
          */}
                
            </div>
            

            <div className="p-4 border border-gray-300 rounded-md  overflow-scroll h-full">
          
          <div className="grid grid-cols-3 gap-2 mb-4   overflow-scroll">
           {renderedImages}  
             
          </div>
          
        </div>
        
        </div> 

        <div className="recuadro-imagenes-obra h-[120px]">
            <div className="flex flex-row items-center justify-between ">
                <label className="block my-2 text-xs">
                Imágenes cargadas
                </label>
                <div className="flex justify-center">
            <label className="cursor-pointer flex items-center justify-center px-2  border-[#C04D2A] bg-[#EBAF9D]/[.70] text-[#8B351C] font-bold rounded-lg hover:bg-gray-300">
              + Imagenes 
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
            

            <div className="p-4 border border-gray-300 rounded-md  overflow-scroll h-full">
          
          <div className="grid grid-cols-3 gap-2 mb-4   overflow-scroll">
           {renderedUploadedImages}  
             
          </div>
          
        </div>
        
        </div> 
        </div>
      


       
      
        
      
    </div>
 
   </div>
<Button rounded primary className="w-fit  place-self-end  " >Update painting</Button>

  </div>
       
  </form>
  }
  return renderedComponent;
  


}

export default EditingPainting;