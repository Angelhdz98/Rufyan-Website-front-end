import Button from "./Button";
import { FaWhatsapp } from "react-icons/fa";



function BuyNowButton(){
 const buyPainting = ()=>{
    const phoneNumber = "523313481672"; 
    const message = encodeURIComponent("¡Hola! Estoy interesado en tu producto: ");
    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    
    window.open(url, "_blank");
 };
    return    <Button onClick={buyPainting} rounded secondary  
    className="text-xs px-1">
        <FaWhatsapp /> for selling
        </Button>
}

export default BuyNowButton;