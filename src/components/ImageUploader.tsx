import { HtmlHTMLAttributes } from "react";
import { FaTrashAlt, FaCloudUploadAlt, FaRegCheckCircle } from "react-icons/fa";
import classNames from "classnames";
import Button from "./Button";

export interface ImageUploaderProps extends HtmlHTMLAttributes<HTMLDivElement>{
handleImageUpload:  (e: React.ChangeEvent<HTMLInputElement>) => void;
deleteImageUpload: (value: number | string) => void;
imagePreview: string[];
uploadedFiles: File[];
single?:boolean
}


export function ImageUploader(props: ImageUploaderProps) {
  //const divClassname = classNames(" flex flex-col w-full h-full  ", props.className,{});

  const renderedImages = props.imagePreview.map((img, index) => {
    if(img.length==0){
        return
    } else{    return <div className="relative aspect-square" key={index}> {/* Cambiado a aspect-square */}
          <div className="flex h-full w-full opacity-0 hover:opacity-85 absolute left-0 top-0 bg-slate-300 place-content-center items-center">
              <FaTrashAlt className="text-3xl" onClick={() => props.deleteImageUpload(index)} />
          </div>
          <div className="flex justify-center items-center absolute top-0 left-0 w-full z-10 bg-green-600 opacity-75">
              <FaCloudUploadAlt className="text-xl" /><FaRegCheckCircle />
          </div>
          <img className="object-cover h-full w-full" src={img} alt="" />
      </div>


    }
        });

  return (
      <div className={"flex flex-col w-full h-full md:h-2/3 flex-grow "+ props.className}>
          <div className="flex flex-row justify-between items-center mb-2"> {/* Simplificado este contenedor */}
              <label className="block">Imágenes</label>
              <label className="cursor-pointer flex items-center justify-center px-4 border-[#C04D2A] bg-[#EBAF9D]/[.70] text-[#8B351C] font-bold rounded-lg hover:bg-gray-300">
                  + Imagen
                  <input
                      type="file"
                      name="image"
                      multiple
                      onChange={props.handleImageUpload}
                      className="hidden"
                  />
              </label>
          </div>

          {/* Contenedor de imágenes modificado */}
          <div className="flex-1  flex-col border border-gray-300 rounded-md">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 auto-rows-min gap-2 h-full p-2 overflow-auto">
                  {renderedImages}
              </div>
          </div>
          <Button rounded primary className="w-fit  place-self-end my-2  " >Add </Button>
      </div>
  );
}