
import FavoritePaints from "../../components/FavoritePaints";
import SlideBanner from "../../components/SlideBanner";
import ImgBanner from "../../components/ImgBanner";
import losDelParaiso from "../../assets/Images/los-del-paraiso.png"
import Panel from "../../components/Panel";
import FavoriteProjects from "../../components/FavoriteProjects";
function HomePage(){

    

    return <div>
        <SlideBanner/>
        <FavoritePaints/>
        <ImgBanner linkRef="https://www.instagram.com/losdelparaiso.music?igsh=a3VtdWw5cWtudjNo" src={losDelParaiso}/>
        <Panel name={"Projects"} > <FavoriteProjects/> </Panel>
        
        
        
    </div>
    }
    
    export default HomePage;
    