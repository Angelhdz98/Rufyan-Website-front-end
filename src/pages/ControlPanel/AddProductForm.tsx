import PaintingLoader from "../../components/PaintingLoader";
import ProjectLoader from "../../components/ProjectLoader";

/*import image1 from "../../../public/assets/Images/imgObras/obra1.jpg"
import image2 from "../../../public/assets/Images/imgObras/obra2.jpg"
import image3 from "../../../public/assets/Images/imgObras/obra3.jpg"
import styled from "styled-components";
*/
function AddProductForm(){

    return <div className="h-full">
        AddProductForm component and new slider test
        <hr />
        Prueba de Loader
        <div className="flex content-center justify-center">
        <PaintingLoader/>
        <ProjectLoader/>
        </div>
         



        
        


    </div>
    
    }
    
    export default AddProductForm;