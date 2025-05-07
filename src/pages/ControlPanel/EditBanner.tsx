import { useState } from "react";
import { Form } from "react-router-dom";
import FormInput from "../../components/FormInput";
import { Banner } from "../../types/typesIndex";
import img1 from "../../../public/assets/Images/imgObras/obra12.jpg"
import img2 from "../../../public/assets/Images/imgObras/obra2.jpg"
import img3 from "../../../public/assets/Images/imgObras/obra3.jpg"
import Button from "../../components/Button";
import { IoNavigateCircleOutline } from "react-icons/io5";
import { FaTrashAlt } from "react-icons/fa";
import { ImageUploader } from "../../components/ImageUploader";
import Link from "../../components/Link";


export function EditBanner(){
    const voidBanner:Banner = {id:0 ,image: {id:0, url:""}, link:""};
 const [newBannerData, setNewBannerData] = useState<Banner>({id:1, link:"", image:{id:0,url:""}});
    const [uploadedFile, setUploadedFile] = useState<File[]>([]);
    const [imagePreview, setImagePreview] = useState<string>("");

    const [actualBanners, setActualBanners] = useState<Banner[]>([{id:1, link:"http://localhost:5173/store", image:{id:1,url:img1}},
        {id:2, link:"http://localhost:5173", image:{id:1,url:img2}},
        {id:3, link:"http://localhost:5173/", image:{id:1,url:img3}}]

    ) ;



    
    const deleteBanner = (idToDelete:number) =>{

        setActualBanners((prev)=>{
return prev.filter((banner)=> banner.id!== idToDelete)
        });
    }

   

    //const [bannerNumber, setBannersNumber] = useState(3);

    
    const addBannerHandle = ()=>{
        
        setBannersData(prev=>{
            const newBanner:Banner ={
                ...voidBanner, id:(prev.length +1 ), image:{
                    ...voidBanner.image, id: prev.length+1
                }
            }
            return [...prev, newBanner];
        });
        
    }

    const onChangeBannerData = (e:React.ChangeEvent<HTMLInputElement>) =>{
        const {name, value} = e.target;
        setNewBannerData((prev)=>{
            return {...prev, [name]:value}
        });


    }

    const handleImageUpload = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const files = e.target.files;
        
        if(files){
            if(files.length>1 || files.length===0){
                alert("Introduce solo una image");
                return;
                }
                const file = Array.from(files).at(0);
                if(file){
                    if(file.type.match("iamge.*")){
                        alert("Por favor, selecciona un archivo de imagen valido");
                        return
                    }
                    if(file.size>2*1024*1024){
                        alert("La imagen no debe superar los 2MB");
                        return;
                        } 
                        setUploadedFile([file]);

                        const reader = new FileReader();

                        reader.onload = ()=>{
                            setImagePreview(reader.result as string);
                        }

                        reader.readAsDataURL(file);
            
                }
                
                
           
        }
        
        

    }

    const deleteImageUpload = () =>{
        setUploadedFile([]);
        setImagePreview("");        
    }
    const renderedBanners = actualBanners.map((banner)=>{

        return <div className="w-full h-full" key={banner.id}>
            <div className="relative h-full">
                <img src={banner.image.url}  className="h-full w-full object-cover"/>
                <div className="w-full h-full top-0 left-0 absolute  z-10 opacity-0 hover:opacity-100 bg-slate-400/70">
                   <div className="absolute flex flex-row gap-2 top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 items-center content-center">
                   <a target={"blank"} href={banner.link} ><IoNavigateCircleOutline className="text-3xl cursor-pointer" /> </a>
                
                <FaTrashAlt className="text-3xl cursor-pointer" onClick={()=>deleteBanner(banner.id)}/>
                </div>  
                </div>
               
            </div>
        </div>
    })

 /*   const bannerForm = bannersData.map((banner)=>{

        const editedLink= bannersData.at(0)?.link;

        if(editedLink){
            editedLink
        }

        if( bannersData.at(banner.id)?.link){
            
            return <div className="flex flex-col md:flex-row">
                <FormInput type="text" value={bannersData.at(banner.id)?.link}/>
            </div>

        }
        
    });*/


    

    return <div className="flex flex-col m-2"> 
    <span>Banners actuales (slider) </span>
      <hr />
      
    
        {/*
        para evitar problemas de actualización por medio de estado solo se podrá eliminar y agregar el banner 1 por 1
        */}
     
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 m-4">
        {renderedBanners}
         </div>
        
        <div className="flex flex-col items-end ">
            <div className="new-banner flex flex-row w-full gap-4 " >
            <div className="w-1/2">
            <FormInput type="text" name="link" value={newBannerData.link} onChange={onChangeBannerData} > Link </FormInput>
            </div>
            <div className=" h-80 w-1/2">
            <ImageUploader deleteImageUpload={deleteImageUpload} handleImageUpload={handleImageUpload} imagePreview={[imagePreview]} uploadedFiles={uploadedFile} />
           
            </div>
             
        </div>


    <Button className="w-fit" primary rounded onClick={addBannerHandle}> Add slide to banner </Button>

        </div>
        

     
        <span>Static Banner</span>

            {/** aqui se agrega el banner anterior para poder actualizarlo (no se puede borrar para no romper la estetica de la pagina) */}
     
    </div>
}