import { UserAddress } from "../types/typesIndex";
import Button from "./Button";
import FormInput from "./FormInput";

export interface AddresFormProps{
    addressForm: UserAddress;
    handleSubmit: (e: React.FormEvent)=>void;
    handleCancel: ()=>void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) =>void;

    }

function AddressForm({addressForm, handleSubmit, handleChange, handleCancel}:AddresFormProps){

    return <form className="p-2 flex flex-col items-end" >
    <div className="w-full">
      <FormInput type={"text"} name={"addressLine1"}
        value={addressForm.addressLine1}
        onChange={handleChange}>
        Address Line 1
      </FormInput>
    </div>
    <div className="flex flex-row gap-2">

        <div>
    <FormInput type={"text"} name={"neighborhood"}
        value={addressForm.neighborhood}
        onChange={handleChange}>
        Neighborhood
      </FormInput>    
      </div>
<div>
    <FormInput type={"number"} name={"postalCode"}
        value={addressForm.postalCode}
        onChange={handleChange}>
        Postal code / Zip 
      </FormInput>
    </div>
    </div>


    <div className="flex flex-row gap-2">
    <div>
    <FormInput type={"text"} name={"country"}
        value={addressForm.country}
        onChange={handleChange}>
        Country
      </FormInput>
    </div>
    <div>
    <FormInput type={"text"} name={"state"}
        value={addressForm.state}
        onChange={handleChange}>
        State
      </FormInput>
      </div>
    </div>

    



    <div className=" flex flex-row w-full justify-between">    
        <Button rounded danger  className="mt-2 w-fit" onClick={handleCancel} >Cancel </Button>
        <Button rounded success className="mt-2 w-fit" onSubmit={handleSubmit}>Done </Button>
    </div>
  </form>
}

export default AddressForm;
