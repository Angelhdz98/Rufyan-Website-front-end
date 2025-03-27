import { UserAddress } from "../types/typesIndex";
import AddressButtons from "./AddressButtons";

function AddressInfo({address}:{address:UserAddress}){

    
    
    
    
    return     <div className="flex flex-col items-end mb-4   ">
    <div className=" address-&-cost flex flex-col items-end  mx-2 mt-2 px-4 border border-[#C04D2A] rounded-lg  ">
        <div className=" flex flex-col border-b-2 ">  
            <div>
                 <span className=" font-semibold"> to: </span> <span>Juan Perez </span>
                 </div>
         <div className="address-chart flex flex-col "> 
                 <span className="font-semibold "> Address:</span>
                 <span >
                {address.addressLine1} - {address.neighborhood + " ," + address.state} 
                </span>
         </div>
    
    </div>  
         <span className="text-[#C04D2A] font-semibold w-fit"> Shipment cost: 250.00MXN</span>
         
    </div>
   
     </div>;
}

export default AddressInfo;