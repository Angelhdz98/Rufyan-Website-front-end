import { useState } from "react";
//import AboutRufyanMain from "../../components/AboutRufyanMain";
import ExpandablePanel from "../../components/ExpandablePanel";
import { TextAroundImage } from "../../components/TextAroundImage";



function AboutRufyanPage(){
    const panels= [
      {id: 1,
      title:"My history"
      //thunk: (función de petición a la API o algo así o hasta el simple link, veremos )
      },
      {
        id: 2,
        title: "Art events management"
      }
    ]
    const [expandedPanels,setExpandedPanels] = useState<Record<number,boolean>>({});
    const handleOnclick= (id:number)=>{
      setExpandedPanels((prev)=>({...prev,[id]:!prev[id]}));
    }
    return <div>

       {/* <AboutRufyanMain/>*/}
       <TextAroundImage/>
        {panels.map((panel)=>{
          const isExpanded = (expandedPanels[panel.id])
          return <ExpandablePanel key={panel.id} id={panel.id} title={panel.title} expanded={isExpanded} onClick={()=>handleOnclick(panel.id)} />
        })}
          </div>
    }
    
    export default AboutRufyanPage;
    