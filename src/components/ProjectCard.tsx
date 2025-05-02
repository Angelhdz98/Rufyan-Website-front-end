import { Fragment } from "react/jsx-runtime"
import type { Project } from "../types/typesIndex"
import Button from "./Button"

interface ProjectCardProps {
    project: Project
}

function ProjectCard({project}:ProjectCardProps){

    return <div 
    className=" m-2 flex flex-col overflow-hidden relative rounded-lg drop-shadow-lg bg-white  border-blue-300 border  "> {/** contenedo tarjetas */}
        <div className="h-32  " > {/** Contenedor imagen  */}
            <img className="w-full h-full  " src={project.images[1]} alt="" />
        </div>
        <div className="">
        <div className="h-40    px-2" >{/** Contenedor texto  */}
            <div className=" h-4/5 overflow-scroll pb-4 ">
            <h2 className="font-bold my-0 p-0">{project.title}</h2>
        <p className="overflow-scroll " ><span className="text-sm h-full">{project.description}</span>
        <br />
        {project.collaborator ? <Fragment><span className=" font-bold  ">Colaborators:</span> <span className="">{project.collaborator}</span>:""</Fragment>: "" 
}        </p>
         
            </div>
            </div>
         <Button className="mx-auto my-1 text-sm absolute text-nowrap w-fit bottom-0 left-1/2 -translate-x-1/2 " rounded success>See more</Button>  
       </div>
        
    </div>
}


export default ProjectCard