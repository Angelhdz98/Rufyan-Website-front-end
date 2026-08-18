import { useEffect, useState } from "react";
import { getStaticBannerRequest } from "../pages/ControlPanel/AdminRequests";
import { Banner } from "../types/typesIndex";




function ImgBanner() {

    const [banner, setBanner] = useState<Banner>();

    useEffect(() => {
        getStaticBannerRequest()
            .then((response) => {
                setBanner(response);
            }).catch();
    }, []);

    const message = () => {
        if (banner && banner.message.length > 3) {
            return <div className="bg-white/70 rounded-lg px-2 absolute z-10 bottom-8 right-4  "> <span className="">{banner.message} </span>
            </div>
        } else return "";
    }


    return banner ? <div className="w-full h-80 overflow-hidden relative">
        <a href={banner.goTo} target="_blank" className="block w-full h-full">
            <img src={banner.imageUrl} className="w-full h-full object-cover object-center" />
            {message()}
        </a>
    </div> : ""
}

export default ImgBanner;