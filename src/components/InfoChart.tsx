import { useState } from "react";
import { CartItemInterface, Cup, Hat, Painting, PaintingPricing, SinglePricing } from "../types/typesIndex";
import AddressChart from "./AddressChart";
import Button from "./Button";

export interface InfoChartProps {
  items: (CartItemInterface<Painting> | CartItemInterface<Hat> | CartItemInterface<Cup>)[]
}


function InfoChart({ items }: InfoChartProps) {

  const [isInForm, setIsInForm] = useState(false);
  const changeIsInForm = (value: boolean) => {
    setIsInForm(value);
  }
  let precio: number = 0;
  items.forEach((item) => {
    // aun falta el precio no esta correcto 

    switch (item.product.productPricing.pricingType) {
      case "ORIGINAL": {
        const paintingPrice = item.product.productPricing as PaintingPricing;
        if (item.isCopy) {
          precio = precio + paintingPrice.pricePerCopy;
        }
        else {
          precio = precio + paintingPrice.pricePerOriginal
        }
        break;
      }

      case "SIMPLE": {
        const singlePricing = item.product.productPricing as SinglePricing;
        precio = precio + singlePricing.price;
        break;
      }

    }


  });
  const shipmentPrice = 250;

  return <div className=" flex flex-row ">
    <div className=" flex flex-col ">
      <span className="font-bold px-2"> Address</span>
      <AddressChart isInForm={isInForm} changeIsInForm={changeIsInForm} />
      <div className={isInForm ? " hidden" : " "}>
        <div className=" flex flex-col ">
          <div className="flex flex-row justify-between mx-2 ">
            <span className="font-medium">Products price: </span> <span> {precio} 00MXN</span>
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
            <span className="font-semibold ">Total: {shipmentPrice + precio}.00MXN</span>
          </div>
        </div>
      </div>



    </div>

  </div>
}

export default InfoChart;