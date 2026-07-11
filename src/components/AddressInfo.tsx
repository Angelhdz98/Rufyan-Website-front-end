import { useContext } from "react";
import { userInfoContext } from "../pages/ControlPanel/useUserInfoContext";
import { AddressDomain, UserEntityDTO2State } from "../types/typesIndex";
import Button from "./Button";

export interface AddressInfoProps {
     address: AddressDomain;
     changeToEdit: ()=>void
}

function AddressInfo({ address, changeToEdit }: AddressInfoProps) {

     const userContext = useContext(userInfoContext);

     const userInfo = userContext ? userContext.userInfo :
          {
               id: 0,
               birthDate: new Date(),
               email: "",
               firstName: "",
               secondName: "",
               firstLastname: "",
               secondLastname: "",
               username: ""

          } as UserEntityDTO2State;

     return <div className="flex flex-col items-end mb-4   ">
          <div className=" address-&-cost flex flex-col items-end  mx-2 mt-2 px-4 border border-[#C04D2A] rounded-lg  ">
               <div className=" flex flex-col border-b-2 ">
                    <div>
                         <span className=" font-semibold"> to: </span> <span>{userInfo.firstName + " " + userInfo.secondName + " " + userInfo.firstLastname + " " + userInfo.secondLastname} </span>
                    </div>
                    <div className="address-chart flex flex-col ">
                         <span className="font-semibold "> Address:</span>
                         <span >
                              {address.street ? address.street : ""} - {address.city ? address.city : " " + " ," + address.country ? address.country : " "}
                         </span>
                    </div>

               </div>
               <span className="text-[#C04D2A] font-semibold w-fit"> Shipment cost: 250.00MXN</span>

          </div>
          <div >
               <Button rounded primary onClick={changeToEdit} className="mt-3" >Change</Button>
          </div>
     </div>;
}

export default AddressInfo;