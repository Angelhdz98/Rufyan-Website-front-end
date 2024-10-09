import { useState } from "react";
import AddToCartButton from "../../components/AddToCartButton";
import Button from "../../components/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { isPainting } from "../../hooks/isPainting";
import { Painting } from "../../types/typesIndex";


function OriginalSelecetor() {
    const [originalSelected, setOriginalSelected] = useState(true);
    const {data, isLoading, error}= useSelector((state: RootState) =>state.singleProduct);

    const selectOriginalHandler = () => {
        setOriginalSelected(true);
    }
    const selectCopyHandler = () => {
        setOriginalSelected(false);
    }
    if(isPainting(data[0])){
        const painting = data[0] as Painting;
        return <div className="flex flex-col p-3">
        <div className="w-full flex justify-center p-1 text-[#c25f40] ">
           {originalSelected? <span className="font-semibold">Original price </span>: <span className="font-semibold">Copy price</span>  }
            {originalSelected?
             <span> {": "+painting.price}MXN </span> :
              <span> {": "+painting.price_copy}MXN
                </span>}
                <hr className="border-t-2 border-[#D67254]" />
        </div>
        <div className="flex flex-row w-full gap-3">

          {
          originalSelected ? <Button className="w-1/2 flex flex-row justify-center items-center" onClick={selectOriginalHandler} secondary rounded >
            Original
        </Button> : 
        <Button no_Bg rounded onClick={selectOriginalHandler} 
                className="bg-none text-[#D67254] w-1/2 flex flex-row justify-center items-center">
            Original
        </Button>
        }


{  !originalSelected?      <Button className="w-1/2 flex flex-row justify-center items-center " onClick={selectCopyHandler} secondary rounded >
            Copy
        </Button>:
        <Button onClick={selectCopyHandler} no_Bg rounded 
                className="bg-none text-[#D67254] w-1/2 flex flex-row justify-center items-center ">
        Copy
    </Button>
    }
   
        </div>
       

        <div className=" flex flex-row py-1  justify-center gap-16">
            <Button secondary rounded className="w-1/4 flex flex-row justify-center items-center">
                Buy now
            </Button>
            {/**className="bg-none text-[#D67254] w-1/4 flex flex-row justify-center items-center" */}
            <Button primary  rounded
                  >
                Add to cart
            </Button>
        </div>

    </div>
    }
    return <div className="flex flex-col p-1">
        <div>
            <span>Price: </span> 
            {originalSelected? <span>{data[0].price} </span>: <span></span>}
        </div>
        <div className="flex flex-row w-full gap-3">
          {originalSelected ? <Button className="w-1/2" onClick={selectOriginalHandler} secondary rounded >
            Original
        </Button> : 
        <Button no_Bg rounded onClick={selectOriginalHandler} 
                className="bg-none text-[#D67254] w-1/2">
            Original
        </Button>}

{  !originalSelected?      <Button className="w-1/2" onClick={selectCopyHandler} secondary rounded >
            Copy
        </Button>:
        <Button onClick={selectCopyHandler} no_Bg rounded 
                className="bg-none text-[#D67254] w-1/2 ">
        Copy
    </Button>
    }
   
        </div>
       

        <div className=" flex flex-row p-2 justify-between">
            <Button secondary rounded>
                Buy now
            </Button>
            {/** bg-none text-[#D67254] */}
            <Button    
                >
                Add to carrito
            </Button>
        </div>

    </div>
}

export default OriginalSelecetor;