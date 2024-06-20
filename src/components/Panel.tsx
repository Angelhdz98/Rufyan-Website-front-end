import { ReactNode } from "react";

interface PanelProps{
    name: string;
    children: ReactNode,
}
function Panel({children, name}:PanelProps){
    
    return <div className="p-2.5 m-4 bg-blue-200 rounded-xl">
        <div>{name}</div>
        <hr className=" border border-black " />
        {children}
    </div>
}

export default Panel;