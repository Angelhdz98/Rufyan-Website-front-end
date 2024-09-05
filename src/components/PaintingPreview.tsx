import { Painting } from "../types/typesIndex";
import { IoIosCheckmarkCircle } from "react-icons/io";

import { CiNoWaitingSign } from "react-icons/ci";

interface PaintingPreviewProps {
    paint: Painting;
}


function PaintingPreview({paint}:PaintingPreviewProps){

    //const availabilityTag= paint.original_availability? <IoIosCheckmarkCircle />: <CiNoWaitingSign/> ;

    return <div className="relative"> <img src={paint.image[1].url} alt="" /> 
    <div className="original-available-tag absolute">Original {/*availabilityTag*/} </div>
    <div className="Available-copies absolute"></div>
    <div className="prices absolute "></div>

    </div>

}

export default PaintingPreview; 