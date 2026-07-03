import { createContext } from "react";
import { UserEntityDTO2State } from "../../types/typesIndex";

export interface UserEntityDTO2StateObjectContext {
    userInfo: UserEntityDTO2State; 
    setUserInfo: React.Dispatch<React.SetStateAction<UserEntityDTO2State>>; 
}



export const userInfoContext = createContext<UserEntityDTO2StateObjectContext|null>(null);
