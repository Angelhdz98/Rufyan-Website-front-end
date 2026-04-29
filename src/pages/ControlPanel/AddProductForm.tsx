

import Button from "../../components/Button";
import { ImageUploader } from "../../components/ImageUploader";
import { useImageUpload } from "./AddPaintingForm";
import ProductSpecsForm from "./ProductSpecsForm";
import { useProductForm } from "./useProducForm";

function AddProductForm() {

    const { handleImageUpload, deleteImageUpload, imagePreview, uploadedFiles } = useImageUpload();

    const { handleChange, toggleIsFavorite, handleProductTypeChange, handleDetailsChange, handleStockChanging, handlePriceChanging, productTypeEnum, commonData, handleAddFormSubmit } = useProductForm();


    return <div>

        <ProductSpecsForm productSpecs={commonData} productTypeEnum={productTypeEnum} handleProductTypeChange={handleProductTypeChange} handleChange={handleChange} toggleIsFavorite={toggleIsFavorite} handleStockChanging={handleStockChanging} handleDetailsChange={handleDetailsChange} handlePriceChanging={handlePriceChanging} />

        <ImageUploader deleteImageUpload={deleteImageUpload}
            handleImageUpload={handleImageUpload}
            imagePreview={imagePreview}
            uploadedFiles={uploadedFiles}
            className={"flex-1 min-h-96"} />
        <div className="my-4">
            <Button success rounded onClick={handleAddFormSubmit} >Subir producto</Button>
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