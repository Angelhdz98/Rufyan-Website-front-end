
import { AddAddressCommand } from "../types/typesIndex";
import Button from "./Button";
import FormInput from "./FormInput";

export interface AddresFormProps {
  addressForm: AddAddressCommand;
  handleSubmit: (e: React.FormEvent) => void;
  handleCancel: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

}

function AddressForm({ addressForm, handleSubmit, handleChange, handleCancel }: AddresFormProps) {

  return <form className="p-2 flex flex-col items-end w-full max-w-full overflow-hidden gap-2" onSubmit={handleSubmit} >
    <div className="w-full">
      <FormInput type={"text"} name={"streetName"}
        value={addressForm.streetName}
        onChange={handleChange}>
        Street name
      </FormInput>
    </div>
    <div className="flex flex-row gap-2 w-full flex-wrap">


      <div className="min-w-0 flex-1">
        <FormInput type={"number"} name={"extNumber"}
          value={addressForm.extNumber.toString()}
          onChange={handleChange}>
          Ext number
        </FormInput>
      </div>
      <div className="min-w-0 flex-1">
        <FormInput type={"number"} name={"intNumber"}
          value={addressForm.intNumber.toString()}
          onChange={handleChange}>
          Int number
        </FormInput>
      </div>
      <div className="min-w-0 flex-1">
        <FormInput type={"text"} name={"neighborhood"}
          value={addressForm.neighborhood}
          onChange={handleChange}>
          Neighborhood
        </FormInput>
      </div>

      <div className="min-w-0 flex-1">
        <FormInput type={"text"} name={"city"}
          value={addressForm.city}
          onChange={handleChange}>
          City
        </FormInput>
      </div>

    </div>
          <div className="w-full flex  gap-4 ">
        <div className="min-w-0">
          <FormInput type={"text"} name={"state"}
            value={addressForm.state}
            onChange={handleChange}>
            State
          </FormInput>
        </div>



        <FormInput type={"number"} name={"zipCode"}
          value={addressForm.zipCode}
          onChange={handleChange}>
          Postal code / Zip code
        </FormInput>
      </div>


    <div className="flex flex-row gap-2 w-full flex-wrap">
      <div className="min-w-0 flex-1">
        <FormInput type={"text"} name={"country"}
          value={addressForm.country}
          onChange={handleChange}>
          Country
        </FormInput>
      </div>
    </div>





    <div className="flex flex-row w-full justify-between flex-wrap gap-2">
      <Button rounded danger className="mt-2 w-fit" onClick={handleCancel} >Cancel </Button>
      <Button rounded success className="mt-2 w-fit" type="submit">Done </Button>
    </div>
  </form>
}

export default AddressForm;
