import { UserAddress } from "../types/typesIndex";
import Button from "./Button";

export interface AddressButtonsProps{
    onAddAddress: ()=>void;
    onEditAddress: ()=>void;//probably will return the updated UserAddres or the array
    onSelectAddress:(address:UserAddress)=>void;
    isEditing:boolean;
    className: string;


}


function AddressButtons({onAddAddress,onEditAddress,onSelectAddress, isEditing, className}:AddressButtonsProps){

    const addressNumber = 2;
    
    const addAddressButton= addressNumber<3 ? 
       <Button rounded warning> Add</Button>: 
    <span>Limit reached</span>

    const allButtons= isEditing? <div className={"flex flex-row justify-between w-full px-6 p-2"+className}>
   
    <Button rounded primary onClick={onEditAddress} >Edit </Button>
    
    <div>
{addAddressButton}
         </div>
    </div> :   
    <Button rounded primary  onClick={onEditAddress} className="w-fit" /*onClick={addAddressHandler}*/ > Edit </Button>;
    
    return allButtons;    
}

export default AddressButtons