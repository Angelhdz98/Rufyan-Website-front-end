import { FaTrashAlt, FaCloudUploadAlt, FaRegCheckCircle } from "react-icons/fa";

interface UploadedImagePreviewProps extends React.HTMLAttributes<HTMLDivElement> {
    srcImage: string;

}

function UploadedImagePreview(props: UploadedImagePreviewProps) {
    return (
        <div className=" w-full pb-[100%] rounded-lg " >
            <div className=" rounded-md relative inset-0 flex flex-col">
                <div className="flex h-full w-full    left-0 top-0 bg-slate-300 place-content-center items-center cursor-pointer absolute z-10 hover:opacity-85 opacity-0 "
                onClick={props.onClick}>
                    <FaTrashAlt className="text-3xl"  />
                </div>
                <div className="flex justify-center items-center absolute top-0 left-0 w-full z-10 bg-green-600 opacity-75 rounded-t-lg">
                    <FaCloudUploadAlt className="text-xl" /><FaRegCheckCircle />
                </div>
                <img className="object-fill rounded-lg  w-full h-full" src={props.srcImage} alt="" />
            </div>
        </div>
    );
}

export default UploadedImagePreview;