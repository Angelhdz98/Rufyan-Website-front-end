import { useState } from "react";
//import Button from "../../components/Button";

function ImageUploader(){
const [images, setImages] = useState<string[]>([]);

        const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
          const files = event.target.files;
          if (files) {
            const uploadedImages = Array.from(files).map(file =>
              URL.createObjectURL(file)
            );
            setImages(prevImages => [...prevImages, ...uploadedImages]);
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
            {images.map((image, index) => (
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