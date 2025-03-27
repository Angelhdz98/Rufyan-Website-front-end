import { useState } from "react";
import AddressChart from "./AddressChart";
import Button from "./Button";


function InfoChart(){
    
  const [isEditing, setIsEditing] = useState(false);
  const [isInForm, setIsInForm] = useState(false);

  const changeIsEditing = (value:boolean) =>{
    setIsEditing(value);
  }
  const changeIsInForm = (value: boolean) =>{
    setIsInForm(value);
  }
    return <div className=" flex flex-row "> 
                <div className=" flex flex-col ">
                   <span className="font-bold px-2"> Address</span>
                 <AddressChart isEditing={isEditing}  isInForm={isInForm} changeIsEditing={changeIsEditing}
                 changeIsInForm={changeIsInForm} />
                  <div className={isInForm? " hidden": " "}>
                     <div className=" flex flex-col ">
                        <div className="flex flex-row justify-between mx-2 "> 
                                <span className="font-medium">Products price: </span> <span> 1750.00MXN</span>
                        </div>
                        <div className="flex flex-row justify-between mx-2 "> 
                                <span className="font-medium">Shipment price: </span> <span> 250.00MXN</span>
                        </div>
                    </div>

                <div className="subtotal-price flex flex-row justify-end my-4 px-4 gap-12">
              <Button primary rounded className="text-sm w-1/3">
                Proceed to payment
              </Button>
              <div>
                <span className="font-semibold ">Total: 2000.00MXN</span>
              </div>
            </div>
                  </div>
                   
                

                </div>
                
           </div>
}

export default InfoChart;