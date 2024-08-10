import { Fragment } from "react/jsx-runtime";
import { FormInputProps } from "./RegisterForm";
import classNames from "classnames";
function FormInput({type, name, value, className, children, labelClassname, onChange}:FormInputProps){
    return <Fragment >
    <label className={classNames("block text-gray-700", labelClassname,{})}>{children}</label>
    <input
      type={type}
      name={name} 
      value={value}
      onChange={onChange}
      className={classNames("w-full max p-2 border  border-gray-300 rounded mt-1 h-8", className,{})}
    />
  </Fragment> 
}


export default FormInput;