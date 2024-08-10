import { createContext, useState, useEffect } from "react";

interface NavigationContextProps {
    currentPath: string;
    navigate: (to: string) => void;
  }
const NavigationContext= createContext<NavigationContextProps| undefined>(undefined);
/*
interface NavigationProviderProps {
    children: ReactNode; // El tipo ReactNode se utiliza para definir cualquier cosa que pueda ser renderizada en React
  }
  */

function NavigationProvider({children}:{children: React.ReactNode}){
    const [currentPath, setCurrentPath] = useState(window.location.pathname);

useEffect(()=>{
    const handler = ()=> {
setCurrentPath(window.location.pathname)
    }
    window.addEventListener('popstate', handler);

    return () =>{
        window.removeEventListener('popstate', handler);
    }
},[]);
const navigate = (to:string) => {
    window.history.pushState({},'',to);
    setCurrentPath(to);
}

return <NavigationContext.Provider value= {{currentPath, navigate}}>
    {children}
</NavigationContext.Provider>
};

export {NavigationProvider};
export default NavigationContext;