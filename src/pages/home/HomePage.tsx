
import FavoritePaints from "../../components/FavoritePaints";
import SlideBanner from "../../components/SlideBanner";
import ImgBanner from "../../components/ImgBanner";
import losDelParaiso from "../../../public/assets/Images/los-del-paraiso.png"
import Panel from "../../components/Panel";
import FavoriteProjects from "../../components/FavoriteProjects";
import OtherProductsChart from "../../components/OtherProductsChart";
//import ProjectCard from "../../components/ProjectCard";

function HomePage(){

    

    return <div>
        <SlideBanner/>
        <Panel name={"Favorite Artworks"}>
        <FavoritePaints/>
        </Panel>
        
        
        <ImgBanner linkRef="https://www.instagram.com/losdelparaiso.music?igsh=a3VtdWw5cWtudjNo" src={losDelParaiso}/>
        <Panel name={"Projects"} >
            <FavoriteProjects/> 
        </Panel>
        <Panel name="Other Products">
            <OtherProductsChart/>
        </Panel>
        
        
        
        
    </div>
    }
    
    export default HomePage;
    