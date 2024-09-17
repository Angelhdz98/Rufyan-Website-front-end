import Button, { buttonProps } from "./Button";
    
interface addTCartButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    onClick: ()=>void;
}

 function AddToCartButton ({onClick}: addTCartButtonProps){

    return <Button onClick={onClick} primary rounded 
    className="text-xs px-1">
        Add to cart
        </Button> 
}

export default AddToCartButton;