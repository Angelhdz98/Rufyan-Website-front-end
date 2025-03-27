import { UserAddress } from "../types/typesIndex";

export interface AddressButtonsProps{
    onAddAddress: ()=>void;
    onEditAddress: ()=>void;//probably will return the updated UserAddres or the array
    onSelectAddress:(address:UserAddress)=>void;
    isEditing:boolean;
    className: string;


}


function AddressButtons({onAddAddress,onEditAddress,onSelectAddress, isEditing, className}:AddressButtonsProps){

    const addressNumber = 3;
    
    const addAddressButton= addressNumber<3 ? 
        <span className=" hover:cursor-pointer hover:text-[#C04D2A]"
                onClick={onAddAddress}>
                Add 
        </span>: 
    <span>Limit reached</span>

    const allButtons= isEditing? <div className={"flex flex-row justify-between w-full px-6 "+className}>
    <div> <span /*onClick={addAddressHandler}*/ className="hover:text-blue-700 hover:cursor-pointer"
    onClick={onEditAddress}> 
    Edit  
    </span></div> 
    
    <div>
{addAddressButton}
         </div>
    </div> :  <div> <span /*onClick={addAddressHandler}*/ className="hover:text-blue-700 hover:cursor-pointer"
    onClick={onEditAddress}> 
    Edit  
    </span></div>;
    
    return allButtons;    
}

export default AddressButtons