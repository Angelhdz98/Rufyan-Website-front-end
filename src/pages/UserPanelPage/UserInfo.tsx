import { FaEdit } from "react-icons/fa";
import { MdCancelPresentation } from "react-icons/md";
import Button from "../../components/Button";
import { Fragment } from "react/jsx-runtime";
import FormInput from "../../components/FormInput";
import { useContext, useEffect, useState } from "react";
import { UpdateUserDTO } from "../../types/typesIndex";
import IDInfo from "./IDInfo";
import { personalUserRequest } from "./personalUserRequest";
import { useUserUpdate } from "../../components/useUserRegister";
import { userInfoContext } from "../ControlPanel/useUserInfoContext";

function UserInfo() {
    const userContext = useContext(userInfoContext);


    const [isEditing, setIsEditing] = useState(false);

    const formattedDate = userContext?.userInfo.birthDate instanceof Date
        ? userContext.userInfo.birthDate.toISOString().split("T")[0]
        : "";

    useEffect(() => {
        if (!userContext) return;

        personalUserRequest()
            .then((user) => {
                userContext.setUserInfo((prev) => ({
                    ...prev,
                    email: user.email,
                    firstName: user.fullName.firstName,
                    secondName: user.fullName.secondName ?? "",
                    firstLastname: user.fullName.firstLastname,
                    secondLastname: user.fullName.secondLastname,
                    birthDate: user.birthDate?.birthdate ? new Date(user.birthDate.birthdate) : prev.birthDate,
                    username: user.username,
                }));
            })
            .catch((error: Error) => {
                alert("Fallo al solicitar info del usuario: " + error.message);
            });
    }, []);

    const changeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name, type } = e.target;
        let parsedValue: number | boolean | Date | string = value;

        if (type === "number") {
            parsedValue = parseInt(value, 10);
        } else if (type === "date") {
            const possibleDate = new Date(value);
            parsedValue = !Number.isNaN(possibleDate.getTime()) ? possibleDate : userContext?.userInfo.birthDate ?? new Date();
        } else if (type === "checkbox") {
            parsedValue = (e.target as HTMLInputElement).checked;
        }

        if (!userContext) return;

        userContext.setUserInfo({
            ...userContext.userInfo,
            [name]: parsedValue,
        } as typeof userContext.userInfo);
    };

    const handleUserInfoUpdate = () => {
        if (!userContext) return;

        const infoToSend: UpdateUserDTO = {
            id: userContext.userInfo.id,
            birthDate: userContext.userInfo.birthDate,
            fullName: {
                firstName: userContext.userInfo.firstName,
                secondName: userContext.userInfo.secondName,
                firstLastname: userContext.userInfo.firstLastname,
                secondLastname: userContext.userInfo.secondLastname,
            },
        };

        void useUserUpdate(infoToSend).then((response) => {
            userContext.setUserInfo((prev) => ({
                ...prev,
                firstName: response.fullname.firstName,
            }));
        });
    };

    if (!userContext) {
        return <div className="flex flex-col">No hay información de usuario disponible.</div>;
    }

    const editingContent = (
        <Fragment>
            <span className="font-bold text-md text-orange-700">Personal Info</span>
            <div className="flex flex-col">
                <div className="flex flex-row">
                    <div className="1st-row flex flex-row flex-wrap gap-4">
                        <div className="flex flex-col">
                            <FormInput
                                type="text"
                                name="firstName"
                                onChange={changeInputHandler}
                                value={userContext.userInfo.firstName}
                                className="flex flex-col"
                                labelClassname="text-blue-400 text-sm font-bold"
                            >
                                Name
                            </FormInput>
                        </div>
                        <div className="flex flex-col">
                            <FormInput
                                type="text"
                                name="secondName"
                                onChange={changeInputHandler}
                                value={userContext.userInfo.secondName ? userContext.userInfo.secondName : ""}
                                className="flex flex-col"
                                labelClassname="text-blue-400 text-sm font-bold"
                            >
                                Second name
                            </FormInput>
                        </div>

                        <div className="flex flex-col">
                            <FormInput
                                type="text"
                                name="firstLastname"
                                onChange={changeInputHandler}
                                value={userContext.userInfo.firstLastname}
                                className="flex flex-col"
                                labelClassname="text-blue-400 text-sm font-bold"
                            >
                                Last name
                            </FormInput>
                        </div>

                        <div className="flex flex-col">
                            <FormInput
                                type="text"
                                name="secondLastname"
                                onChange={changeInputHandler}
                                value={userContext.userInfo.secondLastname}
                                className="flex flex-col"
                                labelClassname="text-blue-400 text-sm font-bold"
                            >
                                Second last name
                            </FormInput>
                        </div>

                        <div className="flex flex-col">
                            <FormInput
                                type="date"
                                name="birthDate"
                                onChange={changeInputHandler}
                                value={formattedDate}
                                className="flex flex-col"
                                labelClassname="text-blue-400 text-sm font-bold"
                            >
                                Birth date
                            </FormInput>
                        </div>
                    </div>

                    <Button
                        rounded
                        primary
                        className="flex items-center justify-center border my-2 pl-2 pr-2"
                        onClick={() => setIsEditing(false)}
                    >
                        <MdCancelPresentation className="text-xl" />
                    </Button>
                </div>

                <Button rounded success className="w-fit p-1 m-4" onClick={handleUserInfoUpdate}>
                    Ok
                </Button>
            </div>

            <div className="w-full border-b-2"></div>
        </Fragment>
    );

    const viewContent = (
        <Fragment>
            <span className="font-bold text-md text-orange-700">Personal Info</span>
            <div className="flex flex-row gap-4">
                <div className="flex flex-col">
                    <span className="text-blue-400 text-sm">Nombre(s)</span>
                    <span>
                        {userContext.userInfo.firstName} {userContext.userInfo.secondName ? userContext.userInfo.secondName : ""}
                    </span>
                </div>

                <div className="flex flex-col">
                    <span className="text-blue-400 text-sm">Apellido(s)</span>
                    <span>
                        {userContext.userInfo.firstLastname} {userContext.userInfo.secondLastname ? userContext.userInfo.secondLastname : ""}
                    </span>
                </div>
                <div className="flex flex-col">
                    <span className="text-blue-400 text-sm">Fecha de nacimiento</span>
                    <span>{formattedDate}</span>
                </div>
                <div className="edit-icon-div">
                    <Button
                        rounded
                        primary
                        className="flex items-center justify-center border my-2 pl-2 pr-2"
                        onClick={() => setIsEditing(true)}
                    >
                        <FaEdit className="text-xl" />
                    </Button>
                </div>
            </div>
            <div className="w-full border-b-2"></div>
        </Fragment>
    );

    const content = isEditing ? editingContent : viewContent;

    return <div className="flex flex-col">{content}<IDInfo /></div>;
}

export default UserInfo;

