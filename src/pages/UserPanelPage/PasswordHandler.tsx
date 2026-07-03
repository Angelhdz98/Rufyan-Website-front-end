import { useState } from "react";
import Button from "../../components/Button";
import { FaEdit } from "react-icons/fa";
import FormInput from "../../components/FormInput";
import { updateUserPasswordRequest } from "./personalUserRequest";

export interface PasswordRequest {
    oldPassword: string,
    newPassword: string,
    newPasswordChek: string;
}




function PasswordHandler() {

    const [isEditing, setIsEditing] = useState(false);

    const [passwordRequest, setPasswordRequest] = useState<PasswordRequest>({
        oldPassword: "",
        newPassword: "",
        newPasswordChek: "",
    });

    const oldPasswordHash = passwordRequest.oldPassword.replace(/./g, "*");
    const newPasswordHash = passwordRequest.newPassword.replace(/./g, "*");
    const newPasswordCheckHash = passwordRequest.newPasswordChek.replace(/./g, "*");

    const changeValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPasswordRequest({ ...passwordRequest, [name]: value });
    }

    const updatePasswordRequestHandler = ()=>{
        updateUserPasswordRequest({oldPassword: passwordRequest.oldPassword, newPassword: passwordRequest.newPassword, userId: 1, newPasswordConfirmation:passwordRequest.newPasswordChek })

    }


    const viewContent = <div className=" flex flex-row  gap-8">
        <div className="flex flex-col">
            <span className="text-blue-400 text-sm"> Password</span>
            <span> ************</span>
        </div>
        <Button rounded primary
            className="flex items-center justify-center border my-2 pl-2 pr-2 translate-x-  "
            onClick={() => setIsEditing(true)}
        >
            <FaEdit className="text-xl" />
        </Button>
    </div>;
    const editContent = <div className="flex flex-col m-4 ">
        <div className="flex flex-col  w-1/2 "> <span className="text-blue-400">Change password
        </span>    <div className="flex flex-col ">
                <FormInput type="text" name="oldPassword" onChange={changeValueHandler} value={oldPasswordHash}  >Old password </FormInput>
            </div>
            <div className="flex flex-col  ">
                <FormInput type="text" name="newPassword" onChange={changeValueHandler} value={newPasswordHash}  >New password </FormInput>
            </div>
            <div className="flex flex-col  ">
                <FormInput type="text" name="newPasswordChek" onChange={changeValueHandler} value={newPasswordCheckHash}  >Confirm new password </FormInput>
            </div>

        </div>
        <div className="flex flex-row w-full justify-between mt-4">
            <Button danger rounded onClick={() => setIsEditing(false)}> Cancel </Button>
            <Button onClick={updatePasswordRequestHandler} success rounded  >Done </Button>
        </div>
    </div>

    let content = isEditing ? editContent : viewContent
    return <div>
        {content}
    </div>
}

export default PasswordHandler;