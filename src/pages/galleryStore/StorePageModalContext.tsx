import { createContext } from "react";

export interface ModalContextProps {
    content: JSX.Element;
    setModalContent: React.Dispatch<React.SetStateAction<JSX.Element>>;
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const StorePageModalContext = createContext<ModalContextProps | null>(null);