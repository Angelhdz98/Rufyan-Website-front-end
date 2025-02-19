import { Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { addOption, AppDispatch, fetchOptions, RootState } from "../store";
import { useDispatch } from "react-redux";
import Button from "./Button";
import { TiPlus } from "react-icons/ti";
import { OptionSelect } from "../types/typesIndex";
import React from "react";
import { fetchEndpoint } from "../store/thunks/fetchEndpoint";

export interface FormApiSelectProps extends React.HTMLAttributes<HTMLSelectElement>{
    field: string;
    label: string;
    apiEndpoint: string;
    value: string
    onOptionSelect: (e: React.ChangeEvent<HTMLSelectElement>)=>void; // Función para llevar a cabo el cambio
    
}

function FormApiSelect
({ field,
    label,
    apiEndpoint,
    value,
    ...rest}:FormApiSelectProps){
    
  //const options = ["mango", "piña", "sandia"];
  const [options, setOptions] = useState<OptionSelect[]>([{id:1,name:"opcion1", label:"1era opción" },
    {id:2,name:"opcion2", label:"2da opción" },
    {id:3,name:"opcion3", label:"3era opción" }]);

  const [showOptionForm, setShowOptionForm] = useState(false);
  const [showAddButton, setShowAddButton] = useState(false);

  //const [selectedOption, setSelectedOption] = useState<OptionSelect>({name:"", id:-1, label:""});
  const dispatch = useDispatch<AppDispatch>();

  useEffect(()=>{
    
    const fetchData = async () =>{
      try{
        const response:OptionSelect[]  = await fetchEndpoint(apiEndpoint);
        //const data =  response.data;
        
        setOptions(response);
        
        console.log(response);
      } catch( error){
        console.error("Error fetching data: ",error);
      }

    };

    fetchData();

       

},[]);

  
  

  
  const optionsSlice = useSelector((state:RootState)=>{
    return state.selectOption.data;
  })

  
  
  

  //First step  a functional select with coded values
/**
 * const [selectedOption, setSelectedOption] = useState<string>("Selecciona una opción");

 *    
*/const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) =>{

    
  /*
  const selection = options.find((option)=> option.name == event.target.value || {name:"error", label:"Not found", id:0 });
  
    if(selection){
      //setSelectedOption(selection);
    } else {
      console.warn("Hubo un error con el valor seleccionado");
    }
    */

      
    rest.onChange?.(event);

  };

// Second step a functional select with state mgmt using redux

 

  const [newOption, setNewOption] = useState({
    name:"",
    label:"",
  })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>{

    const {name, value} = event.target;

    setNewOption((prev)=>({
      ...prev,
      [name]:value,
    }))

    // console.log(selectedOption);

  }

  const handleAddOption = (event: React.FormEvent) =>{
    event.preventDefault();
    if(newOption.name && newOption.label){
       dispatch(addOption(newOption));
    }
  }




  const addOptionHandler = ()=>{

    setShowOptionForm(true);
    console.log("valor de showOptionForm ", showOptionForm )
  };

  
  const renderedOptions = options.map((option)=>{

    return <option key={option.name} value={option.name}  >{option.label}</option>

  });

    const optionAddOption = <option onClick={()=>setShowOptionForm(true)} key={0} value={"addOption"}>Agregar otra opción</option>
    
    const addOptionForm = <form
    onSubmit={handleAddOption}
    className="mt-4 border border-gray-300 p-4 rounded-md shadow-sm"
  >
    <div className="mb-4">
      <label
        htmlFor="name"
        className="block text-sm font-medium text-gray-700"
      >
        Nombre (la manera en la que la verás tú )
      </label>
      <input
        type="text"
        id="name"
        name="name"
        
        value={newOption.name}
        //onChange={handleInputChange}
        
        required
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
      />
    </div>

    <div className="mb-4">
      <label
        htmlFor="label"
        className="block text-sm font-medium text-gray-700"
      >
        Etiqueta, (Es la manera en la que veran los usuarios)
      </label>
      <input
        type="text"
        id="label"
        name="label"
        value={newOption.label}
        //onChange={handleInputChange}
        required
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
      />
    </div>

    <button
      type="submit"
      className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600"
    >
      Agregar
    </button>
  </form>

    renderedOptions.push(optionAddOption);
  



    return <Fragment >
        <label htmlFor="">
            {label}
        </label>
<select onChange={handleChange} 
        className="rounded-md mt-1 p-1" 
        name={field} value={value} >

  {renderedOptions}
</select>

      <Button onClick={()=>setShowOptionForm(!showOptionForm)} rounded warning className="w-fit h-fit my-3  place-self-end flex flex-row gap-2"  ><TiPlus />Add option</Button>
      { showOptionForm && (addOptionForm)}
  </Fragment> 
}

export default FormApiSelect;


/**
 *     <label className={classNames("block text-gray-700", props.labelClassname,{})}>{props.children}</label>
    <input
      type={props.type}
      name={props.name} 
      value={props.value}
      onChange={props.onChange}
      className={classNames("w-full max p-2 border  border-gray-300 rounded mt-1 h-8", props.className,{})}
    />
 */