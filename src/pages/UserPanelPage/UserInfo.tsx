import { FaEdit } from "react-icons/fa";
import { MdCancelPresentation } from "react-icons/md";
import Button from "../../components/Button";
import { Fragment } from "react/jsx-runtime";
import FormInput from "../../components/FormInput";
import { useEffect, useState } from "react";
import { UpdateUserDTO, UserEntityDTO2State } from "../../types/typesIndex";
import IDInfo from "./IDInfo"
import { personalUserRequest } from "./personalUserRequest";
import { useUserUpdate } from "../../components/useUserRegister";

import { userInfoContext } from "../ControlPanel/useUserInfoContext";

//this component will change between showing the info and editing the info




function UserInfo() {

    const [userDataForm, setUserDataForm] = useState<UserEntityDTO2State>
        ({
            id: 1,
            username: "",
            email: "",
            firstName: "",
            secondName: "",
            firstLastname: "",
            secondLastname: "",
            birthDate: new Date()
        });

    const [isEditing, setIsEditing] = useState(false);
    useEffect(() => {

        personalUserRequest().then((user) => {
            setUserDataForm((prev) => {
                return {
                    ...prev, email: user.email,
                    firstName: user.fullName.firstName,

                    secondName: user.fullName.secondName ? user.fullName.secondName : "",

                    firstLastname: user.fullName.firstLastname,
                    secondLastname: user.fullName.secondLastname,
                    birthDate: new Date(formattedDate),
                    username:user.username

                };
            })
        }).catch((error: Error) => {
            alert("Fallo al solitar info del usuario: " + error.message);
        })

    }, []);

    //let updatedUser: UserEntityDTO2State | undefined;

    const changeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name, type } = e.target;
        let parsedValue: number | boolean | Date | string = value;
        if (type === "number") {
            parsedValue = parseInt(value);
        } else if (type === "date") {
            //const paintingDetails = props.productDetails as PaintingDomainDetails;
            const possibleDate = new Date(value);
            // Validar si la fecha es válida
            if (!isNaN(possibleDate.getTime())) {
                parsedValue = possibleDate;
            } else {
                // Si la fecha no es válida, mantener la fecha anterior
                parsedValue = userDataForm.birthDate;
            }
        } else if (type === "checkbox") {
            parsedValue = (e.target as HTMLInputElement).checked;
        }


        setUserDataForm({ ...userDataForm, [name]: parsedValue });
    }

    const formattedDate = userDataForm.birthDate instanceof Date ?
        userDataForm.birthDate.toISOString().split("T")[0] :
        "";
    console.log("La fecha en formato es: " + formattedDate);
    const handleUserInfoUpdate = () => {
        const infoToSend: UpdateUserDTO = { id: userDataForm.id, birthDate: userDataForm.birthDate, fullName: { firstName: userDataForm.firstName, secondName: userDataForm.secondName, firstLastname: userDataForm.firstLastname, secondLastname: userDataForm.secondLastname } }
        useUserUpdate(infoToSend).then((response) => {
            setUserDataForm((prev) => {
                return {
                    ...prev, firstName: response.fullname.firstName,

                };
            })
        });
    }

    const editingContent = <Fragment>
        <span className={" font-bold text-md  text-orange-700"}>
            Personal Info
        </span>
        <div className="flex flex-col">
            <div className="flex flex-row"><div className=" 1st-row flex flex-row flex-wrap gap-4">
                <div className="flex flex-col">
                    <FormInput type="text" name="firstName" onChange={changeInputHandler} value={userDataForm.firstName} className="flex flex-col" labelClassname="text-blue-400 text-sm font-bold ">Name

                    </FormInput>
                </div>
                <div className="flex flex-col">
                    <FormInput type="text" name="secondName" onChange={changeInputHandler} value={userDataForm.secondName ? userDataForm.secondName : ""} className="flex flex-col" labelClassname="text-blue-400 text-sm font-bold ">Second name

                    </FormInput>
                </div>

                <div className="flex flex-col ">
                    <FormInput type="text" name="firstLastname" onChange={changeInputHandler} value={userDataForm.firstLastname} className=" flex flex-col" labelClassname={`text-blue-400 text-sm font-bold `}>
                        Last name
                    </FormInput>
                </div>

                <div className="flex flex-col">
                    <FormInput type="text" name="secondLastname" onChange={changeInputHandler} value={userDataForm.secondLastname} className="flex flex-col" labelClassname="text-blue-400 text-sm font-bold ">Second last name

                    </FormInput>
                </div>


                <div className="flex flex-col ">
                    <FormInput type="date" name="birthDate" onChange={changeInputHandler} value={formattedDate} className=" flex flex-col" labelClassname={`text-blue-400 text-sm font-bold `}>Birth date</FormInput>
                </div>

                <div className="edit-icon-div  ">


                </div>






            </div>

                <Button rounded primary
                    className="flex items-center justify-center border my-2 pl-2 pr-2 translate-x-  " onClick={() => setIsEditing(false)}
                >
                    <MdCancelPresentation className="text-xl" />
                </Button>

            </div>

            <Button rounded success className="w-fit p-1 m-4"
                onClick={handleUserInfoUpdate}
            >Ok</Button>

        </div>

        <div className="w-full border-b-2"></div>

    </Fragment>


    const viewContent = <Fragment>   <span className={" font-bold text-md  text-orange-700"}>
        Personal Info
    </span>
        <div className="flex flex-row gap-4">
            <div className="flex flex-col ">
                <span className="text-blue-400 text-sm">Nombre(s)</span>
                <span> {userDataForm.firstName} {userDataForm.secondName ? userDataForm.secondName : ""} </span>
            </div>

            <div className="flex flex-col ">
                <span className="text-blue-400 text-sm">Apellido(s)</span>
                <span> {userDataForm.firstLastname} {userDataForm.secondLastname ? userDataForm.secondLastname : ""}</span>
            </div>
            <div className="flex flex-col ">
                <span className="text-blue-400 text-sm">Fecha de nacimiento</span>
                <span> {formattedDate} </span>
            </div>
            <div className="edit-icon-div  ">
                <Button rounded primary
                    className="flex items-center justify-center border my-2 pl-2 pr-2 translate-x-  "
                    onClick={() => setIsEditing(true)}
                >
                    <FaEdit className="text-xl" />
                </Button>

            </div>
        </div>
        <div className="w-full border-b-2"></div></Fragment>;
    let content = isEditing ? editingContent : viewContent;






    return <div className="flex flex-col ">
        <userInfoContext.Provider value={{ userInfo: userDataForm, setUserInfo: setUserDataForm }}>{content}
       
        <IDInfo />
         </userInfoContext.Provider>
    </div>
};


export default UserInfo;

