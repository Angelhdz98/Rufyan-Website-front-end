
import FavoriteProducts from "../../components/FavoriteProducts";
import SlideBanner from "../../components/SlideBanner";
import ImgBanner from "../../components/ImgBanner";
import Panel from "../../components/Panel";
import FavoriteProjects from "../../components/FavoriteProjects";
import OtherProductsChart from "../../components/OtherProductsChart";
import { StorePageModalContext } from "../galleryStore/StorePageModalContext";
import { useState } from "react";
import Modal from "../../components/Modal";
//import ProjectCard from "../../components/ProjectCard";

function HomePage() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const initialContent = <div>Contenido inicial</div>
    const [modalContent, setModalContent] = useState(initialContent);

    return <StorePageModalContext.Provider value={{ isModalOpen: isModalOpen, content: modalContent, setIsModalOpen: setIsModalOpen, setModalContent: setModalContent }}>
        <div className=" h-fit flex-grow">
            <SlideBanner />
            <Panel name={"Favorite Artworks"}>
                <FavoriteProducts />
            </Panel>


            <ImgBanner />
            <Panel name={"Projects"} >
                <FavoriteProjects />
            </Panel>
            <Panel name="Other Products">
                <OtherProductsChart />
            </Panel>




        </div>

        <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false) }} >{modalContent} </Modal>

    </StorePageModalContext.Provider>

}

export default HomePage;
