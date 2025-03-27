import AddresSelector from "./AddressSelector";

import { FaEdit } from "react-icons/fa";
import ItemAddressEdit from "./ItemAddressEdit";

function AddressEdit (){

    return <div className="address-edit-chart w-full flex flex-col">

            <ItemAddressEdit/>
            <ItemAddressEdit/>
                
          
         </div>
}

export default AddressEdit;