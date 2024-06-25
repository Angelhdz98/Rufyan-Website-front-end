import type { Project } from "../types/typesIndex"
import Button from "./Button"

interface ProjectCardProps {
    project: Project
}

function ProjectCard({project}:ProjectCardProps){

    return <div className="w-auto m-2 flex flex-col overflow-hidden relative rounded-lg drop-shadow-lg bg-white "> {/** contenedo tarjetas */}
        <div className="h-[40%] " > {/** Contenedor imagen  */}
            <img className="w-full h-full  " src={project.images[1]} alt="" />
        </div>
        <div className="">
        <div className="h-[45%] overflow-hidden px-2" >{/** Contenedor texto  */}
            <h2 className="font-bold my-0 p-0">{project.title}</h2>
        <p><span className="text-sm h-full">{project.description}</span></p>
         </div>
        <div> <Button className="mx-auto my-1 text-sm" rounded success>See more</Button>  </div>
       </div>
        
    </div>
}


export default ProjectCard