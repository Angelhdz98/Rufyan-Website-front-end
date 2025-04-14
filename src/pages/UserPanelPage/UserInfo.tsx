import { FaEdit } from "react-icons/fa";
import Button from "../../components/Button";
import { Fragment } from "react/jsx-runtime";
import FormInput from "../../components/FormInput";
import { useState } from "react";
import { User} from "../../types/typesIndex";
import IDInfo from "./IDInfo";

        //this component will change between showing the info and editing the info

      

        function UserInfo(){ 
              
            const [userDataForm, setUserDataForm]= useState<User>({id:1, username:"", email:"", password:"", role:"", products:[],
             firstName:"", lastName:"", birthDate:""});

             const [isEditing, setIsEditing] = useState(false);
             
              
             const changeInputHandler = (e: React.ChangeEvent<HTMLInputElement>)=>{
                const {value, name} = e.target;
          
                setUserDataForm({...userDataForm, [name]:value});
              }
              

    
    const editingContent= <Fragment>   <span className={" font-bold text-md  text-orange-700"}>
    Personal Info
    </span> 
    <div className="flex flex-col">
          <div className=" 1st-row flex flex-row gap-4">
    <div className="flex flex-col">
    <FormInput type="text" name="firstName" onChange={changeInputHandler} value={userDataForm.firstName} className="flex flex-col" labelClassname="text-blue-400 text-sm font-bold ">Name

</FormInput>
    </div>
    
            <div className="flex flex-col ">
            <FormInput type="text" name="lastName" onChange={changeInputHandler} value={userDataForm.lastName} className=" flex flex-col" labelClassname={`text-blue-400 text-sm font-bold `}>Last name</FormInput>
            </div>
    
  
    <div className="flex flex-col ">
    <FormInput type="text" name="birthDate" onChange={changeInputHandler} value={userDataForm.birthDate} className=" flex flex-col" labelClassname={`text-blue-400 text-sm font-bold `}>Birth date</FormInput>       
    </div>

    <div className="edit-icon-div  ">
    <Button rounded success 
    className="flex items-center justify-center border my-2 pl-2 pr-2 translate-x-  " onClick={()=>setIsEditing(false)}
>
        <FaEdit className="text-xl" />
         </Button>
    
    </div>
    </div>
    <div className="2nd-row flex flex-row gap-4">
    <div className="flex flex-col">
    <FormInput type="text" name="email" onChange={changeInputHandler} value={userDataForm.email} className="flex flex-col" labelClassname="text-blue-400 text-sm font-bold ">Email

</FormInput>
    </div>
    
            <div className="flex flex-col ">
            <FormInput type="text" name="username" onChange={changeInputHandler} value={userDataForm.username} className=" flex flex-col" labelClassname={`text-blue-400 text-sm font-bold `}>Username</FormInput>
            </div>
    
  
    

 
    </div> 
    </div>
 
    <div className="w-full border-b-2"></div>

    </Fragment>
    

    const viewContent =<Fragment>   <span className={" font-bold text-md  text-orange-700"}>
    Personal Info
    </span> 
    <div className="flex flex-row gap-4">
    <div className="flex flex-col ">
        <span  className="text-blue-400 text-sm">Nombre</span>
        <span> Julio Homero  </span>
    </div>
    
    <div className="flex flex-col ">
        <span className="text-blue-400 text-sm">Apellido materno</span>
        <span> Gomez</span>
    </div>
    <div className="flex flex-col ">
        <span className="text-blue-400 text-sm">Fecha de nacimiento</span>
        <span> 14 de junio de 1998 </span>
    </div>
    <div className="edit-icon-div  ">
    <Button rounded success 
    className="flex items-center justify-center border my-2 pl-2 pr-2 translate-x-  "
    onClick={()=>setIsEditing(true)}
>
        <FaEdit className="text-xl" />
         </Button>
    
    </div>
    </div>
    <div className="w-full border-b-2"></div></Fragment>; 
    let content = isEditing? editingContent:viewContent;

    




    return <div className="flex flex-col ">
      {content}
      <IDInfo/>
    </div>
};


export default UserInfo; 

