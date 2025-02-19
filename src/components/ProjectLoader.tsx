import Button from "./Button";
import LoaderTag from "./LoaderTag";


function ProjectLoader(){

    return <div className=" h-64 w-64 flex flex-col rounded-md border border-black relative">
        <div className="flex justify-center items-center h-3/5   bg-stone-800/30">
        <div className="animate-spin h-12 w-12 rounded-full border-t-2 border-b-2 border-blue-500 "></div>
        </div>
        <div className="h-2/5 w-full border">
        <div className="  flex flex-col loading-text relative  w-full h-4/5  p-2 ">
        <div className=" p-1 h-1/3 w-full ">
        <LoaderTag className="h-3 w-1/3 "/>
        </div>
                
            <div className="relative flex flex-col w-full flex-1 ">

                <div className="first-row h-full  p-0.5 flex gap-1">
                <LoaderTag className=" h-3 w-3/12"/>
                <LoaderTag className=" h-3 w-2/12 "/>
                <LoaderTag className=" h-3 w-1/12 "/>
                <LoaderTag className=" h-3 w-1/6"/>
                <LoaderTag className=" h-3 w-1/5"/>
                

                </div>

                <div className="second-row h-full flex p-0.5 gap-2">
                <LoaderTag className=" h-3 w-2/12 "/>
                <LoaderTag className=" h-3 w-3/12"/>

                <LoaderTag className=" h-3 w-1/6"/>
                <LoaderTag className=" h-3 w-1/5"/>
                <LoaderTag className=" h-3 w-1/12 "/>

                </div>


                <div className="third-row h-full flex p-0.5 gap-2">
                
                <LoaderTag className=" h-3 w-1/5"/>
               <LoaderTag className=" h-3 w-3/12"/>
                <LoaderTag className=" h-3 w-2/12 "/>
                <LoaderTag className=" h-3 w-1/6"/>
                <LoaderTag className=" h-3 w-1/12 "/>
                
                     
                </div>

                
            </div>
            <div className="flex self-center pt-1 h-auto">
                <Button rounded success className="mx-auto h-5 text-sm" > See more</Button>
            </div>
            </div>
        </div>
        
        
    </div>
}

export default ProjectLoader;


/*
<div className="flex flex-col label  border border-blue-400   h-max">

            <div className="loading-text relative  w-full h-4/5  ">
                <LoaderTag className="h-4 w-4/5 "/>
            </div>
            <div className="button-place  ">
                <Button success rounded  > see more</Button>
                </div>
            
        
        </div>
        */ 