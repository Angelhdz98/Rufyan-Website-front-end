import { useEffect } from "react";
import { FaWindowClose } from "react-icons/fa";
interface ModalProps{
    isOpen: boolean;
    onClose: ()=> void;
    children: React.ReactNode;
}
function Modal({isOpen, onClose, children}:ModalProps){
    useEffect(()=>{
        if (isOpen){
            document.body.style.overflowY='hidden';
        }else{
            document.body.style.overflowY='auto';
    
        }
        return ()=>{
            document.body.style.overflowY= 'auto';
        };

    },[isOpen]);

    if (!isOpen){
        return null;
    }else{
        return(<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative bg-white shadow-lg rounded-lg w-2/3 h-2/3 overflow-y-auto p-4">
                <button onClick={onClose} className="absolute top-[7px] right-2 text-gray-700 hover:text-gray-900">
                <FaWindowClose className="text-[#D67254]"/>
                </button>
                {children}
            </div>
            </div>)
    }
    

}

export default Modal;
