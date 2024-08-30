import { addImages, RootState } from "../../store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useState } from "react";

import { updateForm } from "../../store";
import { convertBlobToBase64 } from "../../store/thunks/convertBlobToBase64";
import { Console } from "console";
//import Button from "../../components/Button";
/*interface ImageUploaderProps {
  onUpload: (uploadedImages: Uint8Array[]) => void;
}
*/
function ImageUploader(/*{ onUpload }: ImageUploaderProps*/){
//const [images, setImages] = useState<Uint8Array[]>([]);
const images = useSelector((state:RootState) => state.formPainting.data.image);
//const images2 = useSelector((state:RootState)=>state.formPainting.data.image); 
const dispatch = useDispatch();
const [previewImages, setPreviewImages] = useState<string[]>([]);
        const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
          const file = event.target.files;
          if(file){
            const fileArray = Array.from(file);
            const uploadedImages= fileArray.map(file=>  URL.createObjectURL(file));

            setPreviewImages((prevImages)=>[...prevImages, ...uploadedImages]);
            
            fileArray.forEach(file=> {
              
                  dispatch(addImages(previewImages));
                })  
          }
          
          };

 
   
    return (
        <div className="h-[270px]">
            <div className="flex flex-row items-center justify-between ">
                <label className="block my-2">
                Imágenes
                </label>
                <div className="flex justify-center">
            <label className="cursor-pointer flex items-center justify-center px-4  border-[#C04D2A] bg-[#EBAF9D]/[.70] text-[#8B351C] font-bold rounded-lg hover:bg-gray-300">
              + Imagen
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
                 {/*<Button primary rounded onClick={handleImageUpload}>+Imagen</Button>
            
          */}
                
            </div>
            

            <div className="p-4 border border-gray-300 rounded-md h-full">
          
          <div className="grid grid-cols-3 gap-2 mb-4 ">
           
            {
            previewImages.map((image, index) => (
  <img
    key={index}
    src={image}
    alt={`Imagen ${index + 1}`}
    className="w-full h-full object-cover rounded-md"
  />
))}
          </div>
         
        </div>
        </div>
      
        
      );
}

export default ImageUploader;