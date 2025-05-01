import userImage from '../../../public/assets/Images/imgPruebas/userImage.jpeg'
import { FaEdit } from "react-icons/fa";
import UserInfo from './UserInfo';
import AddresSelector from '../../components/AddressSelector';
import AddressChart, { addressesSample } from '../../components/AddressChart';
import { useState } from 'react';
import ProfilePictureHandler from './ProfilePictureHandler';
import FotoPerfil from './Recomendation';
import UserLikes from '../LikedPage/UserLikes';

function UserPanel(){
    const [isInForm, setIsInForm] = useState(false);
 const changeIsInForm = (value: boolean) =>{
    setIsInForm(value);
  }
  
  const [isWatchingLikes, setIsWatchingLikes]= useState(true);

  const controlPanel = <div className=" w-full h-full ">
  Panel de control de usuario
  <div className="flex flex-col md:flex-row h-full border-2 gap-2 p-1 m-2 rounded-md  justify-center  ">
      {<ProfilePictureHandler  userImage={userImage}/>
      }
      <div className='2nd-row flex flex-col'>
          
          
          <UserInfo/>
          <span className={" font-bold text-md  text-orange-700"}> Default address</span>
         <AddressChart isInForm={isInForm} changeIsInForm={changeIsInForm} />


          
      </div>
  </div>
</div>



let content = isWatchingLikes? <UserLikes/>: controlPanel ; 

    return <div>
    <div className=' flex flex-row gap-4'> 
        <span 
        className={` hover:text-lg cursor-pointer hover:text hover:underline underline-offset-1 p-2 h-8 ${isWatchingLikes ? "text-sky-500":""}`   } 
        onClick={()=>{setIsWatchingLikes(true)}}>
            Likes</span> 
        <span onClick={()=>{setIsWatchingLikes(false)}} className={` hover:text-lg cursor-pointer hover:text hover:underline underline-offset-1 p-2  h-10  ${!isWatchingLikes ? "text-sky-500":""}`   } >User panel</span>
        </div>
    {content}    </div>;
}

export default UserPanel;