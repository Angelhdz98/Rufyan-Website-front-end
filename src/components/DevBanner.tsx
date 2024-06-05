
import { FaLinkedin } from "react-icons/fa";
import { CiMail } from "react-icons/ci";


function DevBanner(){
    return <div className="flex flex-row items-center w-auto bg-black justify-between px-5 py-.5">
        <div className="text-white text-lg">Website Designed and created by: José Ángel H.</div>
        <div className="flex flex-row items-center">
            <a href="https://www.linkedin.com/in/jose-angel-hernandez-torres98/">
                <FaLinkedin  size={24} color="white" />
                </a>
        
        <a href="mailto:hernandeztorresjoseangel@gmail.com">
        <CiMail className="p-0" size={30} color="white"/>
        </a>
        
            

        </div>
    </div>
    }
    
    export default DevBanner;
    