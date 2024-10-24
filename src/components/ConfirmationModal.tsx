
import { HTMLAttributes } from "react";
import Button from "./Button";
import Modal, { ModalProps } from "./Modal";


export interface ConfirmationModalProps extends HTMLAttributes<HTMLDivElement> {
    onAccept: () => void;
    onCancel: () => void;
    data:any;
    //warrningMessage: string


}

function ConfirmationModal(props: ConfirmationModalProps) {


    return <div className={"flex flex-col  justify-center items-center gap-8 w-full h-full"
        + props.className}>
            <div>
                {props.children}
            </div>
            <div className="flex flex-row gap-4">
               <Button success 
               rounded onClick={props.onAccept} >
                 Continuar
                 </Button>  
               <Button primary rounded
               onClick={props.onCancel}>
                Cancelar</Button>
            </div>

        </div>

   
}

export default ConfirmationModal;