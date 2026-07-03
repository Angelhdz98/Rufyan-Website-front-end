import { useContext, useEffect, useState } from "react"
import Button from "../../components/Button";
import { FaCheck, FaEdit } from "react-icons/fa";
import FormInput from "../../components/FormInput";
import { GiCancel } from "react-icons/gi";
import { userInfoContext } from "../ControlPanel/useUserInfoContext";
import { isUsernameAvailableRequest, updateUsername } from "./personalUserRequest";
// this component should ask an api if the username it is available


function UsernameHandler() {
    const [isEditing, setIsEditing] = useState(false);
    const userContext = useContext(userInfoContext);
    const username = userContext ? userContext.userInfo.username : "";
    const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);

    const [password, setPassword] = useState("");

    const hashedPassword = password.replace(/./g, "*");

    useEffect(() => {
        if (!username) return;
        const timeoutId = window.setTimeout(() => {
            isUsernameAvailableRequest(username)
                .then((isAvailable) => {
                    setIsUsernameAvailable(isAvailable);
                })
                .catch(() => {
                    alert("Hubo un error buscando el username");
                });
            isUsernameAvailableRequest(username)
                .then((isAvailable) => {
                    setIsUsernameAvailable(isAvailable);
                })
                .catch(() => {
                    alert("Hubo un error buscando el username");
                });
        }, 250);

        return () => window.clearTimeout(timeoutId);

    }, [username]);




    let disponibilidad = isUsernameAvailable ? <div className="flex flex-col items-center w-10"><FaCheck className="text-white bg-[#1D6720] rounded-full p-[2px]" /><span>Available</span></div> : <div className="flex flex-col items-center "><GiCancel className="text-white bg-red-600 rounded-full w-min" /><span className="w-min text-center">Not available</span></div>;

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;


        userContext?.setUserInfo((prev) => {
            return { ...prev, username: value }
        });

    };

    const onChangePasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        setPassword(value);

    }

    const changeUsernameRequestHandler = () => {
        if (userContext) {
            updateUsername(userContext.userInfo.username, password).then(() => {
                alert("Se actualizó correctamente el nombre de usuario")
            }).catch((error) => {
                alert("Fallo al actualizar el nombre de usuario:  " + error);
            });
        }

    }


    const editingContent = <div className="flex flex-col ">
        <div className="flex flex-row gap-6  items-center w-full justify-between pr-4">
            <div className="flex flex-col">
                <span className=" text-blue-400"> Change username</span>
                <div className="flex flex-col gap-4">
                    <FormInput type="text" name="email" onChange={onChangeHandler} value={username} className="flex flex-col" labelClassname="text-blue-300 text-sm font-bold ">Username

                    </FormInput>
                    <FormInput type="text" name="password" onChange={onChangePasswordHandler} value={hashedPassword} className="flex flex-col" labelClassname="text-blue-300 text-sm font-bold ">password

                    </FormInput>
                </div>

            </div>
            {disponibilidad}
        </div>
        <div className="flex flex-row w-full justify-between my-2">

            <Button danger rounded onClick={() => setIsEditing(false)}  >Cancel </Button>
            <Button success rounded onClick={changeUsernameRequestHandler} >Ok </Button>
        </div>

    </div>

    const viewingContent = <div className=" flex flex-row  gap-8">
        <div className="flex flex-col">
            <span className="text-blue-400 text-sm"> Username</span>
            <span> {username} </span>
        </div>
        <Button rounded primary
            className="flex items-center justify-center border my-2 pl-2 pr-2 translate-x-  "
            onClick={() => setIsEditing(true)}
        >
            <FaEdit className="text-xl" />
        </Button>
    </div>;


    let content = isEditing ? editingContent : viewingContent;

    return <div className="flex flex-col p-4 ">
        {content}
    </div>
}

export default UsernameHandler;