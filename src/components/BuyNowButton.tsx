import Button from "./Button";



function BuyNowButton(){
 const buyPainting = ()=>{
    const phoneNumber = "523313481672"; 
    const message = encodeURIComponent("¡Hola! Estoy interesado en tu producto: ");
    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    
    window.open(url, "_blank");
 };
    return    <Button onClick={buyPainting} rounded secondary  
    className="text-xs sm:px-1 h-min ">
         Comprar
        </Button>
}

export default BuyNowButton;