import { MdShoppingCart } from "react-icons/md";
import Button from "./Button";
    
interface addTCartButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    onClick: ()=>void;
}

 function AddToCartButton ({onClick}: addTCartButtonProps){

    return <Button onClick={onClick} primary rounded 
    className="text-xs px-1">
        + <MdShoppingCart/>

        </Button> 
}

export default AddToCartButton;