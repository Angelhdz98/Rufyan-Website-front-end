import {Outlet} from "react-router-dom";
import Header from "../components/Header";
import DevBanner from "../components/DevBanner";
export default function Root(){
    return <div className="min-h-screen flex flex-col">
        <Header/>
        <div className="flex-grow">
        <Outlet/>
        </div>
        <DevBanner/>
        
    </div>
}
