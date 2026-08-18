import { useEffect, useState } from "react";
import FormInput from "../../components/FormInput";
import { Banner } from "../../types/typesIndex";
import Button from "../../components/Button";
import { IoNavigateCircleOutline } from "react-icons/io5";
import { FaTrashAlt } from "react-icons/fa";
import { ImageUploader } from "../../components/ImageUploader";
import { addBannerRequest, addStaticBannerRequest, deleteBannerRequest, getBannersRequest, getStaticBannerRequest } from "./AdminRequests";


export function EditBanner() {
    const voidBanner: Banner = {
        id: 0, imageUrl: "", goTo: "",
        imagId: 0,
        bannerName: "",
        message: ""
    };
    const [newBannerData, setNewBannerData] = useState<Banner>(voidBanner);
    const [uploadedFile, setUploadedFile] = useState<File[]>([]);
    const [imagePreview, setImagePreview] = useState<string>("");

    const [actualBanners, setActualBanners] = useState<Banner[]>([]);

    const [newStaticBannerData, setNewStaticBannerData] = useState<Banner>(voidBanner);
    const [uploadedStaticFile, setUploadedStaticFile] = useState<File[]>([]);
    const [staticImagePreview, setStaticImagePreview] = useState<string>("");

    const [actualBannerStatic, setActualBannerStatic] = useState<Banner>();

    useEffect(() => {
        getBannersRequest().then((response) => {
            setActualBanners(response);


        }).catch((error) => {
            alert("Hubo un error obteniendo los banners:\n " + error);
        });

        getStaticBannerRequest()
            .then((response) => {
                setActualBannerStatic(response);
            })
            .catch()
    }, [])


    const deleteBanner = (idToDelete: number) => {

        deleteBannerRequest(idToDelete).then(() => {
            setActualBanners((prev) => {
                return prev.filter((banner) => banner.id !== idToDelete)
            });
            alert("Se eliminó correctamente el banner")
        }).catch((error) => {
            alert("Hubo un error eliminando el banner: \n " + error);
        })


    }



    //const [bannerNumber, setBannersNumber] = useState(3);


    const addBannerHandler = () => {
        const file: File = uploadedFile[0];
        addBannerRequest(newBannerData, file).then((response) => {
            alert("la respuesta recibida es: \n " + response);

        }).catch((error) => {
            alert("hubo un error subiendo el nuevo Banner: \n" + error);

        });


    }
    const addStaticBannerHandler = () => {
        const file: File = uploadedFile[0];
        addStaticBannerRequest(newStaticBannerData, file).then((response) => {
            alert("la respuesta recibida es: \n " + response);
            setActualBannerStatic(response)
        }).catch((error) => {
            alert("hubo un error subiendo el nuevo Banner: \n" + error);

        });


    }

    const onChangeBannerData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewBannerData((prev) => {
            return { ...prev, [name]: value }
        });
    }
    const onChangeStaticBannerData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewStaticBannerData((prev) => {
            return { ...prev, [name]: value }
        });
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if (files) {
            if (files.length > 1 || files.length === 0) {
                alert("Introduce solo una image");
                return;
            }
            // const fileArray = Array.from(files);
            const file = files.item(0);

            if (file) {
                if (file.type.match("iamge.*")) {
                    alert("Por favor, selecciona un archivo de imagen valido");
                    return
                }
                if (file.size > 2 * 1024 * 1024) {
                    alert("La imagen no debe superar los 2MB");
                    return;
                }
                setUploadedFile([file]);

                const reader = new FileReader();

                reader.onload = () => {

                    setImagePreview(reader.result as string);
                }

                reader.readAsDataURL(file);

            }



        }



    }

    const handleStaticImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if (files) {
            if (files.length > 1 || files.length === 0) {
                alert("Introduce solo una image");
                return;
            }
            // const fileArray = Array.from(files);
            const file = files.item(0);

            if (file) {
                if (file.type.match("iamge.*")) {
                    alert("Por favor, selecciona un archivo de imagen valido");
                    return
                }
                if (file.size > 2 * 1024 * 1024) {
                    alert("La imagen no debe superar los 2MB");
                    return;
                }
                setUploadedFile([file]);

                const reader = new FileReader();

                reader.onload = () => {

                    setStaticImagePreview(reader.result as string);
                }

                reader.readAsDataURL(file);

            }



        }



    }

    const deleteImageUpload = () => {
        setUploadedFile([]);
        setImagePreview("");
    }
    const deleteStaticImageUpload = () => {
        setUploadedStaticFile([]);
        setStaticImagePreview("");
    }

    const renderedBanners = actualBanners.map((banner) => {

        return <div className="w-full h-40 max-h-40 overflow-hidden" key={banner.id}>
            <div className="relative h-full w-full flex items-center justify-center bg-white">
                <img src={banner.imageUrl} className="h-full w-full object-contain object-center" />
                <div className="w-full h-full top-0 left-0 absolute z-10 opacity-0 hover:opacity-100 bg-slate-400/70">
                    <div className="absolute flex flex-row gap-2 top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 items-center content-center">
                        <a target={"blank"} href={banner.goTo} ><IoNavigateCircleOutline className="text-3xl cursor-pointer" /> </a>

                        <FaTrashAlt className="text-3xl cursor-pointer" onClick={() => {
                            deleteBanner(banner.id)
                        }} />
                    </div>
                </div>

            </div>
        </div>
    })
    const renderedStaticBanner = actualBannerStatic ? (

        <div className="w-full h-40 max-h-40 overflow-hidden" key={actualBannerStatic.id}>
            <div className="relative h-full w-full flex items-center justify-center bg-white">
                <img src={actualBannerStatic.imageUrl} className="h-full w-full object-contain object-center" />
                <div className="w-full h-full top-0 left-0 absolute z-10 opacity-0 hover:opacity-100 bg-slate-400/70">
                    <div className="absolute flex flex-row gap-2 top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 items-center content-center">
                        <a target={"blank"} href={actualBannerStatic.goTo} ><IoNavigateCircleOutline className="text-3xl cursor-pointer" /> </a>

                        <FaTrashAlt className="text-3xl cursor-pointer" onClick={() => {
                            deleteBanner(actualBannerStatic.id)
                        }} />
                    </div>
                </div>

            </div>
        </div>
    )
        : <div> No se ha cargado ningun banner static</div>


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

    const slideBannersUploadForm =
        <div className="flex flex-col items-end ">
            <div className="new-banner flex flex-row w-full gap-4 " >
                <div className="w-1/2">
                    <FormInput type="text" name="goTo" value={newBannerData.goTo} onChange={onChangeBannerData} > Link </FormInput>
                    <FormInput type="text" name="message" value={newBannerData.message} onChange={onChangeBannerData} > Message </FormInput>
                </div>
                <div className=" h-80 w-1/2">
                    <ImageUploader deleteImageUpload={deleteImageUpload} handleImageUpload={handleImageUpload} imagePreview={[imagePreview]} uploadedFiles={uploadedFile} />

                </div>

            </div>


            <Button className="w-fit" primary rounded onClick={addBannerHandler}> Add slide to banner </Button>

        </div>

    const staticBannersUploadForm =
        <div className="flex flex-col items-end ">
            <div className="new-banner flex flex-row w-full gap-4 " >
                <div className="w-1/2">
                    <FormInput type="text" name="goTo" value={newStaticBannerData.goTo} onChange={onChangeStaticBannerData} > Link </FormInput>
                    <FormInput type="text" name="message" value={newStaticBannerData.message} onChange={onChangeStaticBannerData} > Message </FormInput>
                </div>
                <div className=" h-40 w-1/2 ">
                    <ImageUploader deleteImageUpload={deleteStaticImageUpload} handleImageUpload={handleStaticImageUpload} imagePreview={[staticImagePreview]} uploadedFiles={uploadedStaticFile} />

                </div>

            </div>


            <Button className="w-fit" primary rounded onClick={addStaticBannerHandler}> Change static banner </Button>

        </div>


    return <div className="flex flex-col m-2">
        <span>Banners actuales (slider) </span>
        <span> Usa un formato vertical 1:4</span>
        <hr />


        {/*
        para evitar problemas de actualización por medio de estado solo se podrá eliminar y agregar el banner 1 por 1
        */}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 m-4 h-40 max-h-40 overflow-hidden  border border-blue-600">
            {renderedBanners}
        </div>

        {slideBannersUploadForm}


        <span>Static Banner</span>

        <div className="w-full h-40 max-h-40 overflow-hidden">{renderedStaticBanner}</div>

        {staticBannersUploadForm}

        {/** aqui se agrega el banner anterior para poder actualizarlo (no se puede borrar para no romper la estetica de la pagina) */}

    </div>
}