import {Outlet} from "react-router-dom";
import Header from "../components/Header";
import DevBanner from "../components/DevBanner";
export default function Root(){
    return <div>
        <Header/>
        <Outlet/>
        <DevBanner/>
        
    </div>
}
