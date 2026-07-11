
import { AddressDomain } from "../types/typesIndex";
import AddressCheck from "./AddressCheck"
import Button from "./Button";


interface AddressSelectorProps  {
  userAddresses: AddressDomain[];
  selectedAddress:AddressDomain;
  onSelectAddress: (address:AddressDomain)=>void;
  confirmAddress:() => void
  //onAddAddress:() => void;  
  
}

function AddresSelector( addressSelectorProps:AddressSelectorProps){

    //const addressNumber=2;
    
    const addressChecks =addressSelectorProps.userAddresses.map((address)=>{
      return  <AddressCheck address={address} onClick={()=> addressSelectorProps.onSelectAddress(address)} key={address.street } 
      selected={addressSelectorProps.selectedAddress.street == address.street &&
        addressSelectorProps.selectedAddress.city == address.city &&
        addressSelectorProps.selectedAddress.country == address.country
      } />
    }) 

    return <div className="flex flex-col mx-4  gap-2  " >
        <span className="font-semibold m-1 px-[59px]"> Shipment info</span>
         <div className=" flex flex-col border-2 border-black divide-y-2 divide-black rounded-lg">
{/*         <AddressCheck selected={false}/>
         <AddressCheck selected={false}/>
         <AddressCheck selected={true}/>*/}
        {addressChecks} 
         </div>
         <div className="flex flex-col justify-between">
            {/* <span className="hover:cursor-pointer hover:text-[#C04D2A]">Edit an address </span>
           
            <AddressButtons onAddAddress={addressSelectorProps.onAddAddress} onEditAddress={addressSelectorProps.onEditAddress} onSelectAddress={addressSelectorProps.onSelectAddress} isEditing={addressSelectorProps.isEditing} />*/}
         </div>

         <div className=" shipmment-cost flex flex-row justify-between">
                <span className=" font-semibold">Shipmment cost: </span>
                <span className="">250.00MXN </span>
         </div>
    <Button rounded secondary className={"w-fit"} onClick={()=>addressSelectorProps.confirmAddress()} > Ok</Button>
         </div>
}

export default AddresSelector