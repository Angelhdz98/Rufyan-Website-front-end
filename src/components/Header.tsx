
import { IoLogoInstagram } from "react-icons/io";
import { BsFacebook } from "react-icons/bs";
import { MdShoppingCart } from "react-icons/md";
import { FcLike } from "react-icons/fc";
import { FaUserAlt } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import CustomLink from "./CustomLink";
import BurguerMenu from "./BurguerMenu";
import classNames from 'classnames';
import Modal from "./Modal";
import LogInForm from "./LogInForm";
import RegisterForm from "./RegisterForm";
import Logo from "./Logo";
function Header(){
    const [activeMenu, setActiveMenu]= useState<boolean>(false);
    const navList=useRef<HTMLDivElement>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [hasAccount, setHasaccount] = useState<boolean>(false);
    const closeModal= ()=>{
        setIsModalOpen(false);
    }
    
    const openModal=() =>{
        setIsModalOpen(true);
    }
    const logInClick= () =>{
        openModal();
        setHasaccount(true);
    }

    const registerClick= () =>{
        openModal();
        setHasaccount(false);
    }
    const changeForm= () =>{
        setHasaccount(!hasAccount)
    }
    const changeMenuState= ()=>{
                setActiveMenu(!activeMenu);

    }   

     useEffect(()=>{
        const handler = (event: MouseEvent) =>{
            
        if( activeMenu && !navList.current?.contains(event.target as Node)){
            
            event.stopPropagation();
            setActiveMenu(!activeMenu);
        }
    };

    document.addEventListener("click", handler, true);
    return ()=>{
        document.removeEventListener("click", handler);
    }
    },[activeMenu])
    return <div className="flex flex-row   items-end 2xl:gap-32 xl:gap-16 lg:gap-8     relative h-full min-h-24">
        <div className="w-1/12 h-full min-w-64 min-h-24"  >
         <Logo to="/"  />
                 </div>
            <div  className={classNames("",{"absolute navBoxShadow md:hidden flex flex-col md top-0 right-0 pl-5 pr-3 pt-10 gap-1 items-end    bg-blue-400 flex h-dvh z-10":activeMenu,
                ' flex flex-row max-md:hidden gap-4  max-md:top-1 max-md:right-2  ': !activeMenu,
             })}>

            <CustomLink  to="/">Home</CustomLink>
            <CustomLink  to= "/aboutRufyan">About me</CustomLink>            
            <CustomLink   to ="/store">Store</CustomLink>
            <CustomLink  to="/projects">Projects </CustomLink>
            <CustomLink   to= "/shipment">Shipment</CustomLink>    
            
            </div>
           {/** Se va a tener que agregar un isActive para que el Link que esté activo cambié */}
           <div ref={navList} onClick={changeMenuState} className="menuBurguerContenedor hidden max-md:block absolute z-20 " >
            <BurguerMenu   activeMenu={activeMenu} />
            </div>
            <div className="absolute top-8 right-[7%]  sm:right-12">
                <span className="hover:text-blue-900 hover:underline hover:cursor-pointer"
                 onClick={logInClick}>Log in
                 </span>/
                <span 
                className="hover:text-blue-900 hover:underline hover:cursor-pointer" 
                 onClick={registerClick}>
                    register
                 </span>
                </div>
        <div className="flex flex-row items-center absolute max-md:left-72 top-2 right-64   gap-2  ">
            <a target="_blank" 
            href="https://www.instagram.com/rufyan_silva?igsh=MTBxc3BtazAxc2dwdg==">
              <IoLogoInstagram size={24} /></a>
    <a target="_blank" href="https://www.facebook.com/rufyan.silva?mibextid=ZbWKwL">
    <BsFacebook size={19}  /> </a>
        </div>

    <div className="flex flex-row items-center gap-2 absolute bottom-2 2xl:right-32 md:right-4 right-12"> 
    <FaUserAlt size={16}/>
    <span className=" lg:max-2xl:block max-md:hidden ">Welcome name</span>
    <FcLike size={22}/>
    <MdShoppingCart size={20}/> 

    </div>
    <Modal isOpen={isModalOpen} onClose={closeModal} >
       {hasAccount?<LogInForm onClick={changeForm}/>:<RegisterForm onClick={changeForm}/>}
        </Modal>
    </div>;
    }
    export default Header;
  

