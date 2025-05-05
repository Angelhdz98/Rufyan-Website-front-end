import { useState } from "react";
import FormInput from "../../components/FormInput";
import { ArtEvent, ImageProduct } from "../../types/typesIndex";
import { FaCloudUploadAlt, FaRegCheckCircle, FaTrashAlt } from "react-icons/fa";
import { resolve } from "path";
import { ImageUploader } from "../../components/ImageUploader";


function AddEventForm(){
    const [formData, setFormData] =  useState<ArtEvent>({id:0, title:"", date:"", images:[], place:"",finishDate:""});

    const [uploadedFiles, setUploadedFiles] = useState<File[] >([]);
    const [imagePreview, setImagePreview] = useState<string[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = e.target;

        setFormData((prev)=>{
            return {...prev, [name]:value}
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
            return prev.filter((item,index )=> index!== value );
        });
        setImagePreview((prev)=>{
            return prev.filter((item, index)=> index!==value)
        });
    }else{
        //delete by name
    }    }

 

    return <div className="flex flex-row h-full">
        <div className="flex flex-col md:flex-row w-full gap-4 px-4 py-2 min-h-screen  ">
        
        <div className="flex-col w-full md:w-1/2 ">

        <FormInput type={"text"} name={"title"}
        value={formData.title}
        onChange={handleChange}>
        Título
      </FormInput>
      <FormInput type={"text"} name={"date"}
        value={formData.date}
        onChange={handleChange}>
        Date
      </FormInput>


       

       
        <FormInput type={"text"} name={"finishDate"}
        value={formData.finishDate}
        onChange={handleChange}>
        Finish date
      </FormInput>
      <FormInput type={"text"} name={"place"}
        value={formData.place}
        onChange={handleChange}>
        place
      </FormInput>
        
      
        </div>

        
        <ImageUploader  handleImageUpload={handleImageUpload} deleteImageUpload={deleteImageUpload} imagePreview={imagePreview} uploadedFiles={uploadedFiles} className={" h-full md:h-1/2  flex-1 flex-col "} />






    </div>
    
       

    </div>
    
    }
    
    export default AddEventForm;