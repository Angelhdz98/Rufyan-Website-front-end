import { HtmlHTMLAttributes, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { AiFillPlusSquare } from "react-icons/ai";
import { AiFillMinusSquare } from "react-icons/ai";

import { CartItemDTORecord } from "../types/typesIndex";




export interface PiecesSelecteroProps extends HtmlHTMLAttributes<HTMLDivElement>{
    cartItem: CartItemDTORecord;
    pieces: number;
    removeCartItem: (cartItemId: number) => void;
    addCartItem: (cartItem: CartItemDTORecord) => void;
         
}

function PiecesSelector(props:PiecesSelecteroProps){

    const [pieces, setPieces] = useState(props.pieces||1);
    
    const addAPieceHandler = () =>{
        setPieces(props.pieces+1);

        setPieces(pieces+1);
        //add CartItem first delete a similar cart item then add the new with updated values 
        props.addCartItem({...props.cartItem, details:{...props.cartItem.details, itemQuantity: props.cartItem.details.itemQuantity+1}})

    }

    const restAPieceHandler = () =>{
        if(pieces==1){
            props.removeCartItem(props.cartItem.id);
            return;
        }
            
        setPieces(pieces-1);
        //add CartItem first delete a similar cart item then add the new with updated values 
        props.addCartItem({...props.cartItem, details:{...props.cartItem.details, itemQuantity: props.cartItem.details.itemQuantity-1}})

    }


    const onePieceLessButton = 
    pieces==1? <FaRegTrashAlt onClick={restAPieceHandler} 
                className="text-md text-[#C04D2A] "  /> :
     <AiFillMinusSquare onClick={restAPieceHandler}
     className="text-xl text-[#C04D2A] "/>;

    const onePieceMoreButton = <AiFillPlusSquare  onClick={addAPieceHandler}
    className="text-xl text-[#C04D2A]"/>;

    return <div className={props.className}>
        <div className="">Piezas</div>
        
<div className="flex flex-row  w-16 justify-around items-center border-black border rounded-md ">
        <div className="one-piece-less ">
            {onePieceLessButton}
        </div>
        <div className="pieces border-black border-x w-1/3 flex justify-center">{pieces}</div>
        <div className="one-piece-more "> {onePieceMoreButton} </div>
    </div>
    </div>
    
}

export default PiecesSelector;

