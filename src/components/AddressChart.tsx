import { HtmlHTMLAttributes, useState } from "react";
import AddressEdit from "./AddressEdit";
import AddressInfo from "./AddressInfo";
import AddressButtons from "./AddressButtons";
import AddressForm from "./AddressForm";
import AddresSelector from "./AddressSelector";
import { UserAddress } from "../types/typesIndex";
import { info } from "console";


function AddressChart ({isEditing, isInForm,changeIsEditing, changeIsInForm}:{isEditing:boolean, changeIsEditing:(value: boolean)=>void, isInForm:boolean,changeIsInForm:(value: boolean)=>void   }){

    //define HTML structures
    
    // addresses will be filled by a HTTP request limit of 3
  const addresses:UserAddress[]= [{addressLine1: "paseo de la loma bonita",
                          city:"Guadalajara",
                          state:  "Jalisco",
                          postalCode:"45180",
                          country:"México",
                           neighborhood: "Lomas de tabachines"},
                          {addressLine1: "Paseo de los alamos sur 17"
                          ,state:  "Jalisco",
                          city:"Guadalajara",
                          postalCode:"45180",
                          country:"México",
                          neighborhood: "Constitución"},
                          {addressLine1: "Robles 1428"
                            , state:  "Jalisco",
                            city:"Guadalajara",
                          postalCode:"45180",
                        country:"México",
                      neighborhood:"Tabachines"}];
    
    const [addressForm, setAddressForm] = useState<UserAddress>({addressLine1: ""
      , state:  "",
    postalCode:"",
  country:"", 
  neighborhood: ""});
    
    const [addressComponent, setAddressComponent] = useState("info");
    const [selectedAddress, setSelectedAddress] = useState(addresses[1]);
    
    

    const addressFormChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
      const {name, value}= e.target;
      setAddressForm({...addressForm, [name]:value});
    };

    const onAddressEdit= (e: React.FormEvent) =>{
      e.preventDefault();
      console.log("edit Request done");
      
    }

    const addAddressHandler = () =>{
        setAddressComponent("add");
        console.log("component: "+ addressComponent);
          };

  const onEditAddressHandler = () =>{
    if (isEditing){
      setAddressForm(selectedAddress);
      changeIsInForm(true),
      setAddressComponent("form");
      
    }else{
      setAddressComponent("edit");
      changeIsEditing(true);
   console.log("component: "+ addressComponent);
    }
     };
  

  const selectedAddressHandler = (address:UserAddress) =>{
    setSelectedAddress(address);

  }
  const confirmAddress= () =>{
    setAddressComponent("info");
    changeIsEditing(false);
    console.log("petición para que la direcciónde entrega sea: "+ selectedAddress);
  };

  const cancelledHandler =()=>{
    setAddressComponent("info");
    changeIsInForm(false);
    changeIsEditing(false);
    setAddressForm({addressLine1: ""
      , state:  "",
    postalCode:"",
  country:"", 
  neighborhood: ""});
  }
  /*
  const addressSelectHandler = () =>{
    
    console.log("component: "+ addressComponent);
  }*/


  
  let content = <AddressInfo address={selectedAddress}  />; 

  if (addressComponent =="info"){
    content= <AddressInfo address={selectedAddress}/>
  } else if (addressComponent == "edit"){
    content= <AddresSelector onSelectAddress={selectedAddressHandler}
    userAddresses={addresses} 
    selectedAddress={selectedAddress}
    confirmAddress={confirmAddress} />
    //
  } else if (addressComponent == "form" ){
    content= <AddressForm addressForm={addressForm} handleChange={addressFormChange} handleSubmit={onAddressEdit}
    handleCancel={cancelledHandler} />
  }
  else if (addressComponent == "change" ){
    content= <AddresSelector    
    onSelectAddress={selectedAddressHandler}
    userAddresses={addresses} 
                                selectedAddress={selectedAddress} 
                                confirmAddress={confirmAddress} 
                                />
  }

  else {content= <AddressInfo address={selectedAddress}/>}
   

  return <div className="flex flex-col">
    {content}
   <AddressButtons              onAddAddress={addAddressHandler} 
                                onSelectAddress={ selectedAddressHandler} 
                                onEditAddress={onEditAddressHandler}
                                className={isInForm? "hidden" :"" }
                                isEditing={isEditing}/>
                                
  </div>


}

export default AddressChart