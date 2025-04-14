import { ReactEventHandler, useRef, useState } from "react";
import { FaEdit } from "react-icons/fa";
import LoaderTag from "../../components/LoaderTag";
import Button from "../../components/Button";

function ProfilePictureHandler({userImage}:{userImage:string}){

    const imageFileRef = useRef<HTMLInputElement>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [newImage, setNewImage] = useState('');
        
    let file:File;

    const inputClickHandler =() =>{
        if(imageFileRef.current){
            imageFileRef.current.click();
        }
    };
        

    const uploadImageHandler = (e: React.ChangeEvent <HTMLInputElement>) =>{
        e.preventDefault();
        if(!e.target.files||e.target.files.length ===0) return
        file = e.target.files[0];
            setIsLoading(true);
        // validation for image type of file
        if(!file.type.match('image.*')){
            alert("Por favor, selecciona un archivo de imagen valido")
            setIsLoading(false);
            return;
        }
        // validation for max size
        if (file.size>2*1024*1024){
            alert('La imagen no debe superar los 2MB ');
            setIsLoading(false);
            return;
        }
        const reader = new FileReader();

        reader.onload=(e: ProgressEvent<FileReader>)=>{
            if(!e.target?.result) return;

            const newImagePreview= e.target.result as string;
            setNewImage(newImagePreview);
            setIsLoading(false);
            setIsEditing(true);
        }
        reader.readAsDataURL(file);

    };

    const changeImageHandler= (e: React.MouseEvent<HTMLButtonElement>) =>{
        console.log("Petición de cambio de imagen");
        setIsEditing(false);
    };

    const cancelChangingImage = () =>{
        setIsEditing(false)
    }
    
    const loadingContent = <div className="relative content-center h-80 w-80  ">{<LoaderTag className="h-80 w-80 rounded-full overflow-hidden "/>}
    <div>
        
    </div>
    <div className=" absolute top-1/2 left-1/2 w-1/3 h-1/3 transform -translate-x-1/2 -translate-y-1/2">
        <div className="animate-spin  rounded-full border-t-2 border-b-2 border-blue-500 w-full h-full  ">
    </div></div>
    
      
    </div>;



    const inputPiece =  <input type="file" className="hidden"  ref={ imageFileRef} onChange={uploadImageHandler} />;

    const viewingContent = <div  className=" flex flex-col ">
        <div onClick={inputClickHandler} className=" relative h-80 w-80 rounded-full border-gray-700 bg-gray-500 border-8 object-cover overflow-hidden  "> 
        
        {inputPiece}
        <img src={userImage} alt="Imagen del usuario"  className='h-full w-full z-0 '/>
        
        <div className='h-full w-full z-30 absolute bg-red-500/70 top-0 left-0 flex opacity-0 hover:opacity-100 cursor-pointer  '>
        <FaEdit className='h-4/5 w-4/5 m-auto    ' />
        </div>
        
        
        </div>
        
    </div>
     
const editingContent = <div className=" flex flex-col ">
    <span className="text-center"> New profile Image</span> <div 
className=" editing relative h-80 w-80 rounded-full border-gray-700 bg-gray-500 border-8 object-cover overflow-hidden  " 
onClick={inputClickHandler} > 
        
{inputPiece}
<img src={newImage} alt="Possible-new-image"  className='h-full w-full z-0 '/>

<div className='h-full w-full z-30 absolute bg-red-500/70 top-0 left-0 flex opacity-0 hover:opacity-100 cursor-pointer  '>
<FaEdit className='h-4/5 w-4/5 m-auto    ' />
</div>


</div>
<div className="flex flex-row w-full justify-between">
    <Button  rounded success onClick={changeImageHandler} >Ok</Button>
    <Button rounded danger onClick={cancelChangingImage}>Cancel</Button>


</div>
</div> 

let content = isLoading? loadingContent: isEditing? editingContent: viewingContent;

if(isLoading){
    return loadingContent
} else if(isEditing){
    return editingContent;
}
else{
     return viewingContent;

    
}
}

export default ProfilePictureHandler;