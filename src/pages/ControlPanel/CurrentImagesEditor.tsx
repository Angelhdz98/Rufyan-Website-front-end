import { HTMLAttributes, useEffect } from "react";
import { ImageProduct } from "../../types/typesIndex";
import UploadedImagePreview from "../../components/UploadedImagePreview";
import { useProductForm } from "./useProducForm";

interface CurrentImagesEditorProps extends HTMLAttributes<HTMLDivElement> {

    images: ImageProduct[];
    imageChartClassName?: string;
}

function CurrentImagesEditor(props: CurrentImagesEditorProps) {


    const { currentImages, setCurrentImages } = useProductForm();

    useEffect(() => {
        setCurrentImages(props.images);
    }, [props.images])


    const deleteImage = (imageId: number) => {
        const updatedImages = currentImages.filter((image) => image.id !== imageId);
        console.log("imagenes actualizadas: ", updatedImages)
        setCurrentImages(updatedImages);
    }

    const renderedImages = currentImages.map((img: ImageProduct) => {
        return <UploadedImagePreview onClick={() => {
            console.log("imagen a eliminar:" + img.id)
            deleteImage(img.id)
        }} srcImage={img.url} />
    });

    return <div className={"" + props.className}> <span>Imagenes </span>
        <div className={" grid grid-cols-3 gap-4 " + props.imageChartClassName}>
            {renderedImages}
        </div>

    </div>
}

export default CurrentImagesEditor;