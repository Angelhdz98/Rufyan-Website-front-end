import Slider from "../../components/Slider";
/*import image1 from "../../../public/assets/Images/imgObras/obra1.jpg"
import image2 from "../../../public/assets/Images/imgObras/obra2.jpg"
import image3 from "../../../public/assets/Images/imgObras/obra3.jpg"
import styled from "styled-components";
*/
function AddProductForm(){

    return <div className="h-full">
        AddProductForm component and new slider test

        <Slider images={["obra1.jpg", "obra2.jpg", "obra3.jpg"]} type={"opacity"} autoplay={false} className="h-80 w-full" intervalAutoplay={1500}/>


    </div>
    
    }
    
    export default AddProductForm;