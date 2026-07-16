import { useEffect, useState } from "react";
import AddressInfo from "./AddressInfo";
import AddressForm from "./AddressForm";
import AddresSelector from "./AddressSelector";
import { AddAddressCommand, AddressDomain } from "../types/typesIndex";
import { addUserAddressdResquest, getUserAddressdResquest } from "../pages/UserPanelPage/personalUserRequest";
import { UserAddresInfoContext } from "./useUserAddresInfoContext";

/*
export const addressesSample: UserAddress[] = [{
  addressLine1: "paseo de la loma bonita",
  city: "Guadalajara",
  state: "Jalisco",
  postalCode: "45180",
  country: "México",
  neighborhood: "Lomas de tabachines"
},
{
  addressLine1: "Paseo del paseado"
  , state: "Hungaria ",
  city: "Guadalajara",
  postalCode: "45180",
  country: "México",
  neighborhood: "Constitución"
},
{
  addressLine1: "Robles 1428"
  , state: "Jalisco",
  city: "Guadalajara",
  postalCode: "45180",
  country: "México",
  neighborhood: "Tabachines"
}];*/



//{isEditing, isInForm,changeIsEditing, changeIsInForm}:{isEditing:boolean, changeIsEditing:(value: boolean)=>void, isInForm:boolean,changeIsInForm:(value: boolean)=>void   }

function AddressChart({ changeIsInForm }: { isInForm: boolean, changeIsInForm: (value: boolean) => void }) {
  const [_, setIsEditing] = useState(false);
  const [userAddresses, setUserAddresses] = useState<AddressDomain[]>([]);
  useEffect(() => {
    getUserAddressdResquest().then((response) => {

      if (response.length == 0) {
        alert("el usuario no ha regitrado un domicilio");
      }
      setUserAddresses(response);
      if (response.length > 0) {
        setSelectedAddress(response[0])
      }

    }).catch((error) => {
      alert("no se pudieron obtener los domicilios:  " + error);
    })
  }, []);

  const changeIsEditing = (value: boolean) => {
    setIsEditing(value);
  }


  //define HTML structures

  // addresses will be filled by a HTTP request limit of 

  const [addressForm, setAddressForm] = useState<AddAddressCommand>({
    userId: 0,
    streetName: "",
    extNumber: 0,
    intNumber: 0,
    neighborhood: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    isDefault: true,

  });


  const [addressComponent, setAddressComponent] = useState("info");
  const [selectedAddress, setSelectedAddress] = useState<AddressDomain>({
    id: 0,
    userId: 0,
    street: "",
    city: "",
    country: "",
    zipCode: "",
    isDefault: false
  });



  const addressFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddressForm({ ...addressForm, [name]: value });
  };
  /*
    const onAddressEdit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log("edit Request done");
  
  
    }
      */

  const addAddressHandler = (e: React.FormEvent) => {
    e.preventDefault();
    //setAddressComponent("add");

    addUserAddressdResquest(addressForm).then((response) => {
      alert("respuesta recibida: " + JSON.stringify(response));
    });
    console.log("component: " + addressComponent);
  };

  const onEditAddressHandler = () => {
    /*if (isEditing) {
      //Click on delete
      deleteUserAddressdResquest(selectedAddress.id)
      changeIsInForm(true),
        setAddressComponent("form");

    } else {*/
    if (userAddresses.length == 0) {
      setAddressComponent("form");
    } else {
      setAddressComponent("edit");
      console.log("component: " + addressComponent);
    }

    // }
  };



  const selectedAddressHandler = (address: AddressDomain) => {
    setSelectedAddress(address);

  }
  const confirmAddress = () => {
    setAddressComponent("info");
    changeIsEditing(false);
    console.log("petición para que la direcciónde entrega sea: " + selectedAddress);
  };

  const cancelledHandler = () => {
    setAddressComponent("info");
    changeIsInForm(false);
    changeIsEditing(false);

  }
  /*
  const addressSelectHandler = () =>{
    
    console.log("component: "+ addressComponent);
  }*/



  let content = <AddressInfo  address={selectedAddress} changeToEdit={onEditAddressHandler} />;

  if (addressComponent == "info") {
    content = <AddressInfo address={selectedAddress} changeToEdit={onEditAddressHandler} />
  } else if (addressComponent == "edit") {
    content = <AddresSelector  onChangeAddresComponent={setAddressComponent} onSelectAddress={selectedAddressHandler}
      userAddresses={userAddresses}
      selectedAddress={selectedAddress}
      confirmAddress={confirmAddress} />
    //
  } else if (addressComponent == "form") {
    content = <AddressForm addressForm={addressForm} handleChange={addressFormChange} handleSubmit={addAddressHandler}
      handleCancel={cancelledHandler} />
  }
  else if (addressComponent == "change") {
    content = <AddresSelector onChangeAddresComponent={setAddressComponent}
      onSelectAddress={selectedAddressHandler}
      userAddresses={userAddresses}
      selectedAddress={selectedAddress}
      confirmAddress={confirmAddress}
    />
  }

  else { content = <AddressInfo address={selectedAddress} changeToEdit={onEditAddressHandler} /> }


  return <div className="flex flex-col">
    <UserAddresInfoContext.Provider value={{
      userAddresses: {
        addresses: userAddresses,
        setUserAddrreses: setUserAddresses
      },
      userAddressForm: {
        addressForm: addressForm,
        setAddressForm: setAddressForm
      }
    }}>
      {content}

    </UserAddresInfoContext.Provider>
  </div>


}

export default AddressChart
