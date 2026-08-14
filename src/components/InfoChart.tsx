import {  useState } from "react";

import AddressChart from "./AddressChart";
import Button from "./Button";

export interface InfoChartProps {
  totalPrice: string;
}


function InfoChart({ totalPrice }: InfoChartProps) {

  const [isInForm, setIsInForm] = useState(false);
  const changeIsInForm = (value: boolean) => {
    setIsInForm(value);
  }




  const shipmentPrice = 250;

  return <div className=" flex flex-row ">
    <div className=" flex flex-col ">
      <span className="font-bold px-2"> Address</span>
      <AddressChart isInForm={isInForm} changeIsInForm={changeIsInForm} />
      <div className={isInForm ? " hidden" : " "}>
        <div className=" flex flex-col ">
          <div className="flex flex-row justify-between mx-2 ">
            <span className="font-medium">Products price: </span> <span> {totalPrice} 00MXN</span>
          </div>
          <div className="flex flex-row justify-between mx-2 ">
            <span className="font-medium">Shipment price: </span> <span> {shipmentPrice}.00MXN</span>
          </div>
        </div>

        <div className="subtotal-price flex flex-row justify-end my-4 px-4 gap-12">
          <Button primary rounded className="text-sm w-1/3">
            Proceed to payment
          </Button>
          <div>
            <span className="font-semibold ">Total: {shipmentPrice + parseInt(totalPrice)}.00MXN</span>
          </div>
        </div>
      </div>



    </div>

  </div>
}

export default InfoChart;