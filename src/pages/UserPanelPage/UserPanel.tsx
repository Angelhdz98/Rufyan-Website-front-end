import userImage from '../../../public/assets/Images/imgPruebas/userImage.jpeg'
import { FaEdit } from "react-icons/fa";
import UserInfo from './UserInfo';
import AddresSelector from '../../components/AddressSelector';
import AddressChart, { addressesSample } from '../../components/AddressChart';
import { useState } from 'react';
import ProfilePictureHandler from './ProfilePictureHandler';
import FotoPerfil from './Recomendation';

function UserPanel(){
    const [isInForm, setIsInForm] = useState(false);
 const changeIsInForm = (value: boolean) =>{
    setIsInForm(value);
  }
    return <div className=" w-full h-full ">
        Panel de control de usuario
        <div className="flex flex-row h-full border-2 gap-2 p-1 m-2 rounded-md  ">
            {<ProfilePictureHandler  userImage={userImage}/>
            }
            <div className='2nd-row flex flex-col'>
                
                
                <UserInfo/>
                <span className={" font-bold text-md  text-orange-700"}> Default address</span>
               <AddressChart isInForm={isInForm} changeIsInForm={changeIsInForm} />


                
            </div>
        </div>
    </div>
}

export default UserPanel;