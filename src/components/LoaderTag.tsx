import { HtmlHTMLAttributes } from "react";

interface loaderTag extends HtmlHTMLAttributes<HTMLDivElement>{
};

function LoaderTag({className}:loaderTag){

    return <div className={" overflow-hidden rounded-sm "+ className} >
<div className='loaderTag relative  bg-gray-200 w-full h-full rounded  '>
      <div className=" animate-shimmer rounded-sm absolute inset-0 -translate-x-full bg-gradient-to-r from-gray-200 via-white to-gray-200  w-full h-full transition-transform duration-500">
      </div>
      </div>
    </div>
    


}

export default LoaderTag;