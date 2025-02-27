import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { AiFillPlusSquare } from "react-icons/ai";
import { AiFillMinusSquare } from "react-icons/ai";


function PiecesSelector(){

    const [pieces, setPieces] = useState(1);
    const addAPieceHandler = () =>{
        setPieces(pieces+1);
    }
    const restAPieceHandler = () =>{
        setPieces(pieces-1);
    }


    const onePieceLessButton = 
    pieces==1? <FaRegTrashAlt onClick={restAPieceHandler} 
                className="text-xl" /> :
     <AiFillMinusSquare onClick={restAPieceHandler}
     className="text-xl"/>;

    const onePieceMoreButton = <AiFillPlusSquare onClick={addAPieceHandler}
    className="text-xl"/>;

    return <div className="">
        <div className="">Piezas</div>
        
<div className="flex flex-row  w-16 justify-around items-center border-black border-2 ">
        <div className="one-piece-less ">
            {onePieceLessButton}
        </div>
        <div className="pieces border-black border-x w-1/3 flex justify-center">{pieces}</div>
        <div className="one-piece-more "> {onePieceMoreButton} </div>
    </div>
    </div>
    
}

export default PiecesSelector;