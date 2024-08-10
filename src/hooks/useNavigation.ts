import { useContext } from "react";
import NavigationContext from "../panelcontext/PanelNavigation";

function useNavigation(){
    const context = useContext(NavigationContext);
    if(!context){
        throw new Error("useNavigation must ve used within a navigationProvider");
    }
    return context;
}

export default useNavigation;