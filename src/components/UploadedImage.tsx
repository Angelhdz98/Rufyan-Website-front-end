
interface UploadedImageProps{
    src: string;
    onDelete: ()=>void
    id: number;
}

function UploadedImage(props:UploadedImageProps){

    return <div className="w-full"><img src={props.src} alt="" />
                <div className="w-full h-full ">Delete</div>
                </div>
}
export default UploadedImage; 