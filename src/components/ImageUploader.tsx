import { HtmlHTMLAttributes } from "react";
import Button from "./Button";
import UploadedImagePreview from "./UploadedImagePreview";

export interface ImageUploaderProps extends HtmlHTMLAttributes<HTMLDivElement> {
    handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    deleteImageUpload: (value: number | string) => void;
    imagePreview: string[];
    uploadedFiles: File[];
    single?: boolean
}


export function ImageUploader(props: ImageUploaderProps) {
    //const divClassname = classNames(" flex flex-col w-full h-full  ", props.className,{});

    const renderedImages = props.imagePreview.map((img, index) => {
        return (
            <UploadedImagePreview className="relative w-full pb-[100%]" srcImage={img} key={index} />
        );
    });

    return (
        <div className={"flex flex-col w-full h-full md:h-2/3 flex-grow " + props.className}>
            <div className="flex flex-row justify-between items-center mb-2">
                <label className="block">Imágenes</label>
                <label className="cursor-pointer flex items-center justify-center px-4 border-[#C04D2A] bg-[#EBAF9D]/[.70] text-[#8B351C] font-bold rounded-lg hover:bg-gray-300">
                    + Imagen
                    <input
                        type="file"
                        name="image"
                        multiple={true}
                        accept="image/*"
                        onChange={props.handleImageUpload}
                        className="hidden"
                    />
                </label>
            </div>

            {/* Contenedor de imágenes - usando auto-rows-max pero con min-h explicita */}
            <div className="flex-1 overflow-auto border border-gray-300 rounded-md">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 p-2">
                    {renderedImages}
                </div>
            </div>
            <Button rounded primary className="w-fit  place-self-end my-2  " >Add </Button>
        </div>
    );
}