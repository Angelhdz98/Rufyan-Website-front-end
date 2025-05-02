import ProjectCard from "../../components/ProjectCard";
import { Project } from "../../types/typesIndex";
import imgProject from "../../../public/assets/Images/imgProyectos/pexels-anastasia-shuraeva-8467265.jpg"
import imgProject2 from "../../../public/assets/Images/imgProyectos/pexels-felicity-tai-7952074.jpg"
import imgProject3 from "../../../public/assets/Images/imgProyectos/pexels-olgakalinina-9741685.jpg"
import imgProject4 from "../../../public/assets/Images/imgProyectos/pexels-ron-lach-8086373.jpg"
import imgProject5 from "../../../public/assets/Images/imgProyectos/pexels-taryn-elliott-6184415.jpg"
import imgProject6 from "../../../public/assets/Images/imgProyectos/pexels-vanessa-loring-7869837.jpg"


function ProjectsPage(){

    const projects: Project[] = [
        {
          id: 1,
          title: "Exposición de Arte Digital 'Reflejos'",
          date: "2024-03-15",
          collaborator: "Adobe",
          description: "Colección de ilustraciones digitales que exploran la identidad a través del color y la forma.",
          images: [imgProject, imgProject2]
        },
        {
          id: 2,
          title: "Instalación 'Luz y Sombra'",
          date: "2024-06-01",
          collaborator: "Philips Hue",
          description: "Instalación interactiva que utiliza iluminación inteligente para crear ambientes inmersivos Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos culpa veniam, consequatur deserunt omnis excepturi consequuntur, aliquid impedit iste illo repudiandae enim provident! Iure porro rem magni quibusdam, eligendi soluta?.",
          images: [imgProject3, imgProject4]
        },
        {
          id: 3,
          title: "Serie de Pinturas 'Naturaleza Fragmentada'",
          date: "2023-11-20",
          description: "Obras que reinterpretan paisajes naturales con técnicas de abstracción geométrica Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat delectus dolore quis explicabo ipsa voluptate autem dolorum! Quaerat, in tempore atque aspernatur cupiditate consequuntur optio harum sed voluptatibus autem debitis?.",
          images: [imgProject5, imgProject6]
        },
        {
            id: 4,
            title: "Exposición de Arte Digital 'Reflejos'",
            date: "2024-03-15",
            collaborator: "Adobe",
            description: "Colección de ilustraciones digitales que exploran la identidad a través del color y la forma.",
            images: [imgProject, imgProject2]
          },
          {
            id: 5,
            title: "Instalación 'Luz y Sombra'",
            date: "2024-06-01",
            collaborator: "Philips Hue",
            description: "Instalación interactiva que utiliza iluminación inteligente para crear ambientes inmersivos Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos culpa veniam, consequatur deserunt omnis excepturi consequuntur, aliquid impedit iste illo repudiandae enim provident! Iure porro rem magni quibusdam, eligendi soluta?.",
            images: [imgProject3, imgProject4]
          },
          {
            id: 6,
            title: "Serie de Pinturas 'Naturaleza Fragmentada'",
            date: "2023-11-20",
            description: "Obras que reinterpretan paisajes naturales con técnicas de abstracción geométrica Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat delectus dolore quis explicabo ipsa voluptate autem dolorum! Quaerat, in tempore atque aspernatur cupiditate consequuntur optio harum sed voluptatibus autem debitis?.",
            images: [imgProject5, imgProject6]
          },
       
      ];

  const renderedProjects = projects.map((project)=>{
    return  <ProjectCard project={project}/>
  });
  
    return <div className=" flex flex-col ">
        <span className=" w-full h-auto border-b-2 m-2 " > My projects</span>
        <div className="  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  xl:grid-cols-5 2xl:grid-cols-6 gap-2">
{renderedProjects}       
    </div>
    </div>
    }
export default ProjectsPage;