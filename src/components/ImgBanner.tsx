

interface ImgBannerProps {
linkRef: string;
src: string;
}

function ImgBanner({linkRef, src}:ImgBannerProps){
    return <div className="w-full h-auto">
        <a href={linkRef} target="_blank" ><img src={src} className="w-full"  /></a>
    </div>
}

export default ImgBanner;