import Route from "./Route";
import { NavigationProvider } from "../../panelcontext/PanelNavigation";
import AddPaintingForm from "./AddPaintingForm";
import Navegacion from "./Navegacion";
import EditAll from "./EditAll";
import AddProductForm from "./AddProductForm";
import AddEventForm from "./AddEventForm";
import { EditBanner } from "./EditBanner";



function ControlPanel(){


    return  <NavigationProvider>
        <Navegacion/>
        <div>

            <Route path="/admin/edit">
                <EditAll/>
            </Route>
            <Route path="/admin/addProduct">
                <AddProductForm/>
            </Route>
            <Route path="/admin/addEvent">
                <AddEventForm/>
            </Route>
            <Route path="/admin">
                <AddPaintingForm/>
            </Route>
            <Route path="/admin/editBanners">
                <EditBanner/>
            </Route>
    </div>

    
    </NavigationProvider>
    
}

export default ControlPanel;