import { useState } from "react"
import Button from "../../components/Button";
import { FaEdit } from "react-icons/fa";
import FormInput from "../../components/FormInput";

// this component should ask an api if the username it is available


function EmailHandler() {
    const [isEditing, setIsEditing] = useState(false);

    const [usernameCheck, setUsernameCheck] = useState("");





    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setUsernameCheck(value);
        console.log(`userName: ${usernameCheck}`);

    }


    const editingContent = <div className="flex flex-col ">
        <div className="flex flex-row gap-6  items-center w-full justify-between pr-4">
            <div className="flex flex-col">
                <span className=" text-blue-400"> Change email</span>
                <FormInput type="text" name="email" onChange={onChangeHandler} value={usernameCheck} className="flex flex-col" labelClassname="text-blue-300 text-sm font-bold ">Email

                </FormInput>
            </div>
            {/*disponibilidad*/}
        </div>
        <div className="flex flex-row w-full justify-between my-2">

            <Button danger rounded onClick={() => setIsEditing(false)}  >Cancel </Button>
            <Button success rounded >Ok </Button>
        </div>

    </div>

    const viewingContent = <div className=" flex flex-row  gap-8">
        <div className="flex flex-col">
            <span className="text-blue-400 text-sm"> email</span>
            <span> emailValido@gmail.com</span>
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