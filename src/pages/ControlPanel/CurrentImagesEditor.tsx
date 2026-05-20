import { HTMLAttributes} from "react";
import { ImageProduct } from "../../types/typesIndex";
import UploadedImagePreview from "../../components/UploadedImagePreview";


interface CurrentImagesEditorProps extends HTMLAttributes<HTMLDivElement> {

    imageChartClassName?: string;
    setCurrentImages: (images: ImageProduct[]) => void;
    currentImages?: ImageProduct[];
}

function    CurrentImagesEditor(props: CurrentImagesEditorProps) {




    /*    useEffect(() => {
            setCurrentImages(props.images);
        }, [props.images])
    */

    const deleteImage = (imageId: number) => {
        if (props.currentImages) {
            const updatedImages = props.currentImages.filter((image) => image.id !== imageId);
            console.log("imagenes actualizadas: ", updatedImages)
            props.setCurrentImages(updatedImages);
        }

    }

    const renderedImages = props.currentImages == null ? "" : props.currentImages.map((img: ImageProduct) => {
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