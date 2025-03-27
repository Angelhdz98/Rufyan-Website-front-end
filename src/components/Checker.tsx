

function Checker({selected}:{selected:boolean}){


    return <div className="flex  items-center justify-center h-[19px] w-[19px] rounded-full border-black border-[4px] ">
        <div className={`h-[12px] w-[12px] rounded-full border-[#11962F] border-[4px] ${selected ? " " : "hidden"} `}>

        </div>
    </div>
}

export default Checker;
