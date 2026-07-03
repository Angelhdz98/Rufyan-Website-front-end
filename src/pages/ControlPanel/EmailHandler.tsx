import { useContext, useState } from "react"
import Button from "../../components/Button";
import { FaEdit } from "react-icons/fa";
import FormInput from "../../components/FormInput";
import { userInfoContext } from "./useUserInfoContext";
import { updateEmail } from "../UserPanelPage/personalUserRequest";

// this component should ask an api if the username it is available


function EmailHandler() {
    const userContext = useContext(userInfoContext);
    const userEmail: string = userContext ? userContext.userInfo.email : "";
    const [isEditing, setIsEditing] = useState(false);

    const [password, setPassword] = useState("");

    const hashedPassword = password.replace(/./g, "*");



    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        userContext?.setUserInfo((prev) => {
            return { ...prev, email: value }
        })
    }

    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {

        const { value } = e.target;
        setPassword(value);

    }

    const updateEmailHandler = () => {
        updateEmail(userEmail, password).then(() => {
            alert("Email actualizado correctamente")
        }).catch((error) => {
            alert("No se pudo actulizar el email " + JSON.stringify(error))
        });

    }



    const editingContent = <div className="flex flex-col ">
        <div className="flex flex-row gap-6  items-center w-full justify-between pr-4">
            <div className="flex flex-col">
                <span className=" text-blue-400"> Change email</span>
                <FormInput type="text" name="email" onChange={onChangeHandler} value={userEmail} className="flex flex-col" labelClassname="text-blue-300 text-sm font-bold ">Email

                </FormInput>
            </div>
            <div>
                <FormInput name="password" type="text" value={hashedPassword} onChange={onChangePassword}   >Password </FormInput>
            </div>
            {/*disponibilidad*/}
        </div>
        <div className="flex flex-row w-full justify-between my-2">

            <Button danger rounded onClick={() => setIsEditing(false)}  >Cancel </Button>
            <Button success rounded onClick={updateEmailHandler} >Ok </Button>
        </div>

    </div>

    const viewingContent = <div className=" flex flex-row  gap-8">
        <div className="flex flex-col">
            <span className="text-blue-400 text-sm"> email</span>
            <span> {userEmail}</span>
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

export default EmailHandler;