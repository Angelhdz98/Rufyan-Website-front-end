import {Outlet} from "react-router-dom";
import Header from "../components/Header";
import DevBanner from "../components/DevBanner";
export default function Root(){
    return <div className=" min-h-svh h-fit  flex flex-col max-w-full relative ">
        <Header/>

    <div className=" flex-grow"><Outlet  />
        </div>                
        <DevBanner/>
        
        
         
        
    </div>
}
