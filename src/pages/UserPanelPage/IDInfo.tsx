import PasswordHandler from "./PasswordHandler"
import UsernameHandler from "./UsernameHandler"


function IDInfo(){
 return <div className=" flex flex-col p-2 px-4">
    <div className=" ID-info">
 <span className="font-bold text-md  text-orange-700">
 Identification info
 </span>
</div>

<UsernameHandler/>
<PasswordHandler/>


<div className="w-full border-b-2"></div></div> 
}


export default IDInfo